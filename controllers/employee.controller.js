const empSchema = require("../entities/employee.entity");
const empModel = require("../models/employee.model").Employee;
const db = require("../config/db");
const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const { request } = require("express");
const saltRounds = 10;

exports.getAll = async (req, res) => {
  const result = await validationResult(req);
  if (!result.isEmpty()) {
    await res.json({ Error: result.array() });
  } else {
    const allEmployee = await db.manager.find(empSchema);
    await res.send(allEmployee);
  }
};

exports.getByID = async (req, res) => {
  const result = await validationResult(req);
  if (!result.isEmpty()) {
    await res.json({ Error: result.array() });
  } else {
    const employee = await db.manager.findOne(empSchema, {
      where: { id: req.params.id },
    });
    await res.json(employee);
  }
};

exports.login = async (req, res) => {
  const result = await validationResult(req);
  if (!result.isEmpty()) {
    await res.json({ Error: result.array() });
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
            await res.json(employee);
          } else {
            await res.json({ message: "Login Failed" });
          }
        }
      );
    } else {
      res.status(404).json({ message: "Employee not found " });
    }
  }
};

exports.Create = async (req, res) => {
  try {
    const result = await validationResult(req);
    if (!result.isEmpty()) {
      await res.json({ Error: result.array() });
    } else {
      if (!req.body) {
        await res.status(400).json({ message: "Request body empty" });
      }
      const dupliactEmail = await db.manager.findOne(empSchema, {
        where: { email: req.body.email },
      });
      if (dupliactEmail) {
        await res.status(500).json({ message: "Email already registered" });
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
    res.status(500).json({ message: "ERROR" });
  }
};

exports.Update = async (req, res) => {
  try {
    const result = await validationResult(req);
    if (!result.isEmpty()) {
      await res.json({ Error: result.array() });
    } else {
      if (req.body.email) {
        const dupliactEmail = await db.manager.findOne(empSchema, {
          where: { email: req.body.email },
        });
        if (dupliactEmail) {
          await res.status(500).json({ message: "Email already registered" });
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
          await res.status(200).json(employee);
        }
      }
    }
  } catch (err) {
    res.status(404).json(err);
  }
};

exports.Delete = async (req, res) => {
  try {
    const result = await validationResult(req);
    if (!result.isEmpty()) {
      await res.json({ Error: result.array() });
    } else {
      await db.manager.delete(empSchema, req.params.id);
      await res.status(200).json({ message: "deleted succesfully" });
    }
  } catch (err) {
    await res.status(404).json(err);
  }
};
