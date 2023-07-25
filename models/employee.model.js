class Employee {
  constructor(id, name, age, salary, email, password) {
    (this.id = id),
      (this.name = name),
      (this.age = age),
      (this.salary = salary),
      (this.email = email),
      (this.password = password);
  }
}

module.exports = { Employee: Employee };
