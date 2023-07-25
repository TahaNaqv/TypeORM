const Employee = require("../entities/employee.entity");
var typeorm = require("typeorm");

var dataSource = new typeorm.DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "admin",
  database: "test",
  synchronize: true,
  entities: [Employee],
});

dataSource
  .initialize()
  .then(() => {
    console.log("DB Connected!");
  })
  .catch((err) => {
    console.log(err);
  });

module.exports = dataSource;
