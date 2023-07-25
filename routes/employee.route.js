const router = require("express").Router();
const {
  idParamValidator,
  createRequestBodyValidator,
  updateRequestBodyValidator,
} = require("../validators/employee.validator");
const { param } = require("express-validator");

const {
  getAll,
  getByID,
  Create,
  Update,
  Delete,
} = require("../controllers/employee.controller");

router.get("/", getAll);

router.get("/:id", idParamValidator, getByID);

router.post("/", createRequestBodyValidator, Create);

router.put("/:id", idParamValidator, updateRequestBodyValidator, Update);

router.delete("/:id", idParamValidator, Delete);

module.exports = router;
