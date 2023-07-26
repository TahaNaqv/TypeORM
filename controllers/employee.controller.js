const empSchema = require("../entities/employee.entity");
const empModel = require("../models/employee.model").Employee;
const db = require("../config/db");
const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const { request } = require("express");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const saltRounds = 10;

exports.getAll = async (req, res) => {
  const result = await validationResult(req);
  if (!result.isEmpty()) {
    await res.status(400).json({
      status: 400,
      message: "Bad Request!",
      Error: result.array(),
    });
  } else {
    const allEmployee = await db.manager.find(empSchema);
    await res.json({ status: 200, message: "Success", data: allEmployee });
  }
};

exports.getByID = async (req, res) => {
  const result = await validationResult(req);
  if (!result.isEmpty()) {
    await res.status(400).json({
      status: 400,
      message: "Bad Request!",
      Error: result.array(),
    });
  } else {
    const employee = await db.manager.findOne(empSchema, {
      where: { id: req.params.id },
    });
    await res.json({ status: 200, message: "Success", data: employee });
  }
};

exports.login = async (req, res) => {
  const result = await validationResult(req);
  if (!result.isEmpty()) {
    await res.status(400).json({
      status: 400,
      message: "Bad Request!",
      Error: result.array(),
    });
  } else {
    const employee = await db.manager.findOne(empSchema, {
      where: { email: req.body.email },
    });
    console.log(employee);
    if (employee) {
      bcrypt.compare(
        req.body.password,
        employee.password,
        async (err, result) => {
          if (result == true) {
            jwt.sign(
              { employee },
              process.env.JWT_SECRET,
              { expiresIn: "1h" },
              async (err, token) => {
                await res.json({
                  status: 200,
                  message: "Authentication Successful",
                  token,
                  employee,
                });
              }
            );
          } else {
            await res
              .status(401)
              .json({ status: 401, message: "Login Failed" });
          }
        }
      );
    } else {
      res.status(404).json({ status: 404, message: "Employee not found " });
    }
  }
};

exports.Create = async (req, res) => {
  try {
    const result = await validationResult(req);
    if (!result.isEmpty()) {
      await res.status(400).json({
        status: 400,
        message: "Bad Request!",
        Error: result.array(),
      });
    } else {
      const dupliactEmail = await db.manager.findOne(empSchema, {
        where: { email: req.body.email },
      });
      if (dupliactEmail) {
        await res
          .status(400)
          .json({ status: 400, message: "Email already registered" });
      } else {
        const emp = new empModel();
        await bcrypt.hash(req.body.password, saltRounds, async (err, hash) => {
          emp.password = hash.toString();
          emp.name = req.body.name;
          emp.salary = req.body.salary;
          emp.age = req.body.age;
          emp.email = req.body.email;
          await db.manager.save(emp);
          await res.json({ message: "Employee Registered" });
        });
      }
    }
  } catch (err) {
    console.log("Error: ", err);
    res.status(500).json({ status: 500, message: "Internal Server Error" });
  }
};

exports.Update = async (req, res) => {
  try {
    const result = await validationResult(req);
    if (!result.isEmpty()) {
      await res.status(400).json({
        status: 400,
        message: "Bad Request!",
        Error: result.array(),
      });
    } else {
      if (req.body.email) {
        const dupliactEmail = await db.manager.findOne(empSchema, {
          where: { email: req.body.email },
        });
        if (dupliactEmail) {
          await res
            .status(400)
            .json({ status: 400, message: "Email already registered" });
        } else {
          if (req.body.password) {
            await bcrypt.hash(
              req.body.password,
              saltRounds,
              async (err, hash) => {
                var request = {
                  id: req.body.id,
                  name: req.body.name,
                  age: req.body.age,
                  salary: req.body.salary,
                  email: req.body.email,
                  password: hash,
                };
                console.log(request);
                await db.manager.update(empSchema, req.params.id, request);
              }
            );
          } else {
            await db.manager.update(empSchema, req.params.id, req.body);
          }
          const employee = await db.manager.findOne(empSchema, {
            where: { id: req.params.id },
          });
          await res.status(200).json({
            status: 200,
            message: "Update Succesfull",
            data: employee,
          });
        }
      }
    }
  } catch (err) {
    res.status(500).json({ status: 500, message: "Internal Server Error" });
  }
};

exports.Delete = async (req, res) => {
  try {
    const result = await validationResult(req);
    if (!result.isEmpty()) {
      await res.status(400).json({
        status: 400,
        message: "Bad Request!",
        Error: result.array(),
      });
    } else {
      await db.manager.delete(empSchema, req.params.id);
      await res.status(200).json({ status: 200, message: "Delete Succesfull" });
    }
  } catch (err) {
    res.status(500).json({ status: 500, message: "Internal Server Error" });
  }
};
