import Joi from 'joi';
import { EmployeeModel } from "@domain/employee/entities/employee";
import { Request, Response, NextFunction } from 'express';

// Define a custom type that extends the Express Request type
interface CustomRequest extends Request {
    validatedEmployeeData?: EmployeeModel; // Assuming EmployeeModel is the type for the validated Employee data
  }

  const addressSchema = Joi.object({
    streetName: Joi.string().required(),
    landMark: Joi.string().required(),
    city: Joi.string().required(),
    pinCode: Joi.string().required(),
    state: Joi.string().required(),
    country: Joi.string().required(),
  });
  
  const employeeValidationSchema = Joi.object({
    full_name: Joi.string().min(3).max(50).required(),
    email: Joi.string().min(5).max(50).required().email(),
    password: Joi.string().min(5).max(50).required(),
    contact_number: Joi.number().max(9999999999999).required(),
    address: addressSchema,
    department: Joi.string().min(3).max(50).required(),
    designation: Joi.string().min(3).max(50).required(),
    joining_date: Joi.date().required(),
    profile_picture: Joi.string().allow('').optional(),
    attendance_id: Joi.string().required(),
    project_id: Joi.string().required(),
    del_status: Joi.string().valid('Live', 'Deleted').default('Live'),
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

