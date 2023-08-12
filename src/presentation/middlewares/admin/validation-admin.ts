// import Joi, { ValidationError, ValidationErrorItem } from "joi";
// import ApiError from "@presentation/error-handling/api-error";
// import { Request, Response, NextFunction } from "express";

// interface AdminInput {
//   fullName: string;
//   email: string;
//   phoneNo: number;
  
//   active?: boolean;
// }

// const adminValidator = function (input: AdminInput): AdminInput {
//   // Define the adminSchema for input validation
//   const adminSchema = Joi.object<AdminInput>({
//     fullName: Joi.string().required().max(53).trim().messages({
//       "string.base": "Name must be a string",
//       "string.empty": "Name is required",
//       "string.max": "Name should be under 53 characters",
//       "any.required": "Name is required",
//     }),
//     email: Joi.string().email().required().trim().lowercase().messages({
//       "string.base": "Email must be a string",
//       "string.empty": "Email is required",
//       "string.email": "Invalid email format",
//       "any.required": "Email is required",
//     }),
//     phoneNo: Joi.number().required().integer().max(9999999999999).messages({
//       "number.base": "Phone number must be a number",
//       "number.empty": "Phone number is required",
//       "number.integer": "Phone number must be an integer",
//       "number.max": "Phone number should be under 13 digits",
//       "any.required": "Phone number is required",
//     }),
    

//   // Validate the request body against the adminSchema
//   const { error, value } = adminSchema.validate(input, { abortEarly: false });

//   if (error) {
//     // Create an array of validation error messages
//     const validationErrors = error.details.map(
//       (value: ValidationErrorItem) => value.message
//     );

//     throw new ApiError(
//       ApiError.badRequest().status,
//       validationErrors.join(", "),
//       "ValidationError"
//     );
//   }

//   return value;
// };

// export const validateAdminInputMiddleware = (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     // Extract the request body
//     const { body } = req;

//     // Validate the admin input using the adminValidator
//     const validatedInput: AdminInput = adminValidator(body);

//     // Continue to the next middleware or route handler
//     next();
//   } catch (error) {
//     if (error instanceof ApiError) {
//       return res.status(error.status).json(error.message);
//     }

//     // Respond with the custom error
//     const err = ApiError.badRequest();
//     return res.status(err.status).json(err.message);
//   }
// };

// export default adminValidator;
