const express = require('express');
const Employee = require('models/Employee');
const router = express.Router();

// Get all employees
router.get('/employees', async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json(employees);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Create new employee
router.post('/employees', async (req, res) => {
  const { first_name, last_name, email, position, salary, date_of_joining, department } = req.body;
  try {
    const employee = new Employee({ first_name, last_name, email, position, salary, date_of_joining, department });
    await employee.save();
    res.status(201).json({ message: 'Employee created successfully', employee_id: employee._id });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get employee by ID
router.get('/employees/:eid', async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.eid);
    if (!employee) return res.status(404).json({ message: 'Employee not found' });
    res.status(200).json(employee);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update employee
router.put('/employees/:eid', async (req, res) => {
  try {
    const employee = await Employee.findByIdAndUpdate(req.params.eid, req.body, { new: true });
    if (!employee) return res.status(404).json({ message: 'Employee not found' });
    res.status(200).json({ message: 'Employee details updated successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete employee
router.delete('/employees', async (req, res) => {
  const { eid } = req.query;
  try {
    await Employee.findByIdAndDelete(eid);
    res.status(204).json({ message: 'Employee deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
