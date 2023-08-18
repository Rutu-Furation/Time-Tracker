import Joi from 'joi';
import { EmployeeModel } from "@domain/employee/entities/employee";
import { Request, Response, NextFunction } from 'express';

// Define a custom type that extends the Express Request type
interface CustomRequest extends Request {
    validatedEmployeeData?: EmployeeModel; // Assuming EmployeeModel is the type for the validated Employee data
  }

  const addressSchema = Joi.object({
  streetName: Joi.string(),
  landMark: Joi.string(),
  city: Joi.string(),
  pinCode: Joi.string(),
  state: Joi.string(),
  country: Joi.string(),
});
  
  const employeeValidationSchema = Joi.object({
    employeeId: Joi.string().min(3).max(50).required(),
    fullName: Joi.string().min(3).max(50).required(),
    email: Joi.string().email().min(5).max(50).required(),
    password: Joi.string().min(5).max(50).required(),
    contactNumber: Joi.number().max(9999999999999),
    address: addressSchema,
    department: Joi.string().min(3).max(50).required(),
    designation: Joi.string().min(3).max(50).required(),
    role: Joi.string().min(3).max(50).required(),
    joiningDate: Joi.date().iso().required(),
    profilePicture: Joi.string(),
    attendanceId: Joi.string(),
    projectId: Joi.string(),
    delStatus: Joi.string().valid("Live", "Deleted").default("Live"),
  });
  
function validateEmployeeMiddleware(req: CustomRequest, res: Response, next: NextFunction) {
  const employeeData: EmployeeModel = req.body; // Assuming the table data is sent in the request body

  const { error, value } = employeeValidationSchema.validate(employeeData);

  if (error) {
    // Return a 400 Bad Request response with validation error details
    return res.status(400).json({ error: error.message });
  }

  // If validation succeeds, attach the validated table data to the request object for further processing in the route handler
  req.validatedEmployeeData = value;
  next();
}

export default validateEmployeeMiddleware;

