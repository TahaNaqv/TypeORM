const { Employee } = require("../models/employee.model");
const EntitySchema = require("typeorm").EntitySchema;

module.exports = new EntitySchema({
  name: "Employee",
  tableName: "employee",
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
    },
    password: {
      type: "varchar",
    },
  },
});
