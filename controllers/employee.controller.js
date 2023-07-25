const empSchema = require("../entities/employee.entity");
const empModel = require("../models/employee.model").Employee;
const db = require("../config/db");
const {validationResult} = require('express-validator');

exports.getAll = async (req, res) => {
  const result = await validationResult(req);
    if(!result.isEmpty()){
      await res.json({"Error":result.array()})
    } else {
      const allEmployee = await db.manager.find(empSchema);
      await res.send(allEmployee);
    }
};

exports.getByID = async (req, res) => {
    const result = await validationResult(req);
    if(!result.isEmpty()){
      await res.json({"Error":result.array()})
    } else {
      const employee = await db.manager.findOne(empSchema, {
        where: { id: req.params.id },
      });
      await res.json(employee);
    }
};

exports.Create = async (req, res) => {
  try {
  const result = await validationResult(req);
    if(!result.isEmpty()){
      await res.json({"Error":result.array()})
    } else {
    if (!req.body) {
      res.status(400).json({ message: "Request body empty" });
    }
    const emp = new empModel();
    emp.name = req.body.name;
    emp.salary = req.body.salary;
    emp.age = req.body.age;
    emp.email = req.body.email;
    emp.password = req.body.password;
    await db.manager.save(emp);
    await res.json({ message: "Employee Registered" });
  }
  } catch (err) {
    console.log("Error: ", err);
    res.status(500).json({ message: "ERROR" });
  }
};

exports.Update = async (req, res) => {
  try {
  const result = await validationResult(req);
    if(!result.isEmpty()){
      await res.json({"Error":result.array()})
    } else {
    await db.manager.update(empSchema, req.params.id, req.body);
    const employee = await db.manager.findOne(empSchema, {
      where: { id: req.params.id },
    });
    await res.status(200).json(employee);
  }
  } catch (err) {
    res.status(404).json(err);
  }
};

exports.Delete = async (req, res) => {
  try {
  const result = await validationResult(req);
    if(!result.isEmpty()){
      await res.json({"Error":result.array()})
    } else {
    await db.manager.delete(empSchema, req.params.id);
    await res.status(200).json({ message: "deleted succesfully" });
    }
  } catch (err) {
    await res.status(404).json(err);
  }
};
