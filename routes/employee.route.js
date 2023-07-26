const router = require("express").Router();
const verifyJwt = require("../jwt/verifyJwt");
const { verify } = require("jsonwebtoken");
const {
  idParamValidator,
  createRequestBodyValidator,
  updateRequestBodyValidator,
  loginValidator,
} = require("../validators/employee.validator");
const { param } = require("express-validator");

const {
  getAll,
  getByID,
  Create,
  Update,
  Delete,
  login,
} = require("../controllers/employee.controller");

router.use(verifyJwt);

router.get("/", getAll);

router.get("/:id", idParamValidator, getByID);

router.post("/", createRequestBodyValidator, Create);

router.put("/:id", idParamValidator, updateRequestBodyValidator, Update);

router.delete("/:id", idParamValidator, Delete);

module.exports = router;
