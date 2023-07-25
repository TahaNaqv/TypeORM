const { Employee } = require("../models/employee.model");
const EntitySchema = require("typeorm").EntitySchema;

module.exports = new EntitySchema({
  name: "Employee",
  tableName: "employees",
  target: Employee,
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    name: {
      type: "varchar",
    },
    age: {
      type: "int",
    },
    salary: {
      type: "float",
    },
    email: {
      type: "varchar",
      unique: true,
    },
    password: {
      type: "varchar",
    },
  },
});
