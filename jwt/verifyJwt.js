const jwt = require("jsonwebtoken");
const {
  EventListenerTypes,
} = require("typeorm/metadata/types/EventListenerTypes");

const verifyJwt = async (req, res, next) => {
  await console.log(req.headers);
  const bearerHeader = await req.headers["authorization"];
  if (!bearerHeader) {
    await res
      .status(401)
      .json({ status: 401, message: "Unauthorized: Token not present!" });
  } else {
    const bearer = await bearerHeader.split(" ")[1];
    await console.log(bearer);
    req.token = bearer;
    jwt.verify(req.token, process.env.JWT_SECRET, async (err, result) => {
      if (err) {
        await res
          .status(401)
          .json({ status: 401, message: "Unauthorized: Invalid token!" });
      } else {
        await next();
      }
    });
  }
};

module.exports = verifyJwt;
