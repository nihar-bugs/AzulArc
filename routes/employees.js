const router = require("express").Router();
const Employee = require("../models/EmployeeModel");

//FETCH ALL EMPLOYEES

router.get("/", async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json(employees);
  } catch (err) {
    res.status(400).json(err);
    console.log("Error while fetching all employees:", err);
  }
});

// CREATE NEW EMPLOYEE

router.post("/create", async (req, res) => {
  const {
    name: empName,
    age: empAge,
    email: empEmail,
    date_of_birth: empDob,
    address: empAddress,
    photo: empPhoto,
  } = req.body;

  if (!empName) {
    return res.json({
      error: "Name is required",
    });
  }

  if (!empEmail) {
    return res.json({
      error: "Email is required",
    });
  }

  const newEmployee = new Employee({
    name: empName,
    age: empAge,
    email: empEmail,
    date_of_birth: empDob,
    address: empAddress,
    photo: empPhoto,
  });
  try {
    const savedEmployee = await newEmployee.save();
    return res.status(200).json(savedEmployee);
  } catch (err) {
    res.status(400).json(err);
    console.log("Error while creating new employee:", err);
  }
});

// UPDATE EXISTING EMPLOYEE

router.patch("/update", async (req, res) => {
  const { id } = req.body;
  const data = req.body;
  delete data.id;
  try {
    var updatedEmployee = await Employee.findByIdAndUpdate(
      id,
      {
        $set: data,
      },
      { new: true }
    );
    res.status(200).json(updatedEmployee);
  } catch (err) {
    res.status(400).json(err);
    console.log("Error while updating employee:", err);
  }
});

//DELETE EMPLOYEE

router.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  console.log(id);
  try {
    await Employee.findByIdAndDelete(id);
    res.status(200).json("Employee Deleted");
  } catch (err) {
    res.status(400).json(err);
    console.log("Error while deleting employee:", err);
  }
});

module.exports = router;
