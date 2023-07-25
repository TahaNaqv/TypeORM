const router = require("express").Router();
const {id_param_validator, create_request_body_validator, update_request_body_validator} = require("../validators/employee.validator")
const {param} = require('express-validator');

const {
  getAll,
  getByID,
  Create,
  Update,
  Delete,
} = require("../controllers/employee.controller");

router.get("/", getAll);

router.get("/:id", id_param_validator, getByID);

router.post("/", create_request_body_validator, Create);

router.put("/:id", id_param_validator, update_request_body_validator, Update);

router.delete("/:id", id_param_validator, Delete);

module.exports = router;
