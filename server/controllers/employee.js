const Employee = require("../models/employee");
const { validateInput } = require("../services/validateInput");

exports.getEmployees = async (req, resp) => {
  try {
    const employees = await Employee.findAll();
    resp.status(200).json({ employees });
  } catch (error) {
    resp.status(500).json({ message: "Internal server error!" });
  }
};
exports.getEmployee = async (req, resp) => {
  try {
    const employees = await Employee.findOne({ where: { id: req.params.id } });
    resp.status(200).json({ employees });
  } catch (error) {
    resp.status(500).json({ message: "Internal server error!" });
  }
};

exports.createEmployee = async (req, resp) => {
  console.log(Object.values(req.body));
  const missingFields = validateInput(...Object.values(req.body));
  if (missingFields !== true) {
    return resp
      .status(400)
      .json({ message: `${missingFields.join(", ")} missing` });
  }
  console.log("starting to do so ");

  try {
    // Get the image URL from the uploaded file object
    const imageUrl = req.file.location;

    // Create a new employee with the image URL
    await Employee.create({ ...req.body, image: imageUrl });

    resp.status(201).json({ message: "Employee created!" });
  } catch (error) {
    console.log(error);
    resp.status(400).json({ message: "Request failed!" });
  }
};

exports.updateEmployee = async (req, resp) => {
  const missingFields = validateInput(...Object.values(req.body));
  if (missingFields !== true) {
    return resp
      .status(400)
      .json({ message: `${missingFields.join(", ")} missing` });
  }

  try {
    // Get the image URL from the uploaded file object
    const imageUrl = req.file ? req.file.location : undefined;

    // Update the employee with the new data and image URL
    await Employee.update(
      { ...req.body, image: imageUrl },
      { where: { id: req.params.emp_id } }
    );
    resp.status(200).json({ message: "Employee updated!" });
  } catch (error) {
    resp.status(400).json({ message: "Error updating employee!" });
  }
};

exports.deleteEmployee = async (req, resp) => {
  const { emp_id } = req.params;
  try {
    const emp = await Employee.findOne({ where: { id: emp_id } });
    await emp.destroy();
    resp.status(200).json({ message: "Employee deleted!" });
  } catch (error) {
    console.log(error);
    resp.status(404).json({ message: "Employee not found" });
  }
};
