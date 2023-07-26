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
      nullable: true,
    },
    salary: {
      type: "float",
      nullable: true,
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
