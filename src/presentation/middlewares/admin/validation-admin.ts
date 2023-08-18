import Joi from "joi";
import ApiError from "@presentation/error-handling/api-error";
import { Request, Response, NextFunction } from "express";

interface AdminInput {
  fullName: string;
  email: string;
  password: string;
  phoneNo: number;
  address: {
    streetName: string;
    landMark: string;
    city: string;
    pinCode: Number;
    state: string;
    country: string;
  };
  role: string;
  active?: boolean;
  profilePicture?: string;
}

const adminValidator= function (input: AdminInput): AdminInput {
  const adminSchema = Joi.object<AdminInput>({
    fullName: Joi.string().required().max(53).trim().messages({
      "string.base": "Name must be a string",
      "string.empty": "Name is required",
      "string.max": "Name should be under 53 characters",
      "any.required": "Name is required",
    }),
    email: Joi.string().email().required().trim().lowercase().messages({
      "string.base": "Email must be a string",
      "string.empty": "Email is required",
      "string.email": "Invalid email format",
      "any.required": "Email is required",
    }),
    password: Joi.string().required().min(5),
    phoneNo: Joi.number().required().integer().max(9999999999999).messages({
      "number.base": "Phone number must be a number",
      "number.empty": "Phone number is required",
      "number.integer": "Phone number must be an integer",
      "number.max": "Phone number should be under 13 digits",
      "any.required": "Phone number is required",
    }),
    address: Joi.object({
      streetName: Joi.string().required(),
      landMark: Joi.string().required(),
      city: Joi.string().required(),
      pinCode: Joi.number().required(),
      state: Joi.string().required(),
      country: Joi.string().required(),
    }).required(),
    role: Joi.string().required().max(50).messages({
      "string.base": "Role must be a string",
      "string.empty": "Role is required",
      "string.max": "Role should be under 50 Characters",
      "any.required": "Role is required",
    }),
    active: Joi.boolean().default(true),
    profilePicture: Joi.string(),
  });

  const { error, value } = adminSchema.validate(input, { abortEarly: false });

  if (error) {
    const validationErrors = error.details.map((value) => value.message);
    throw new ApiError(
      ApiError.badRequest().status,
      validationErrors.join(", "),
      "ValidationError"
    );
  }

  return value;
};
export const validateAdminInputMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Extract the request body
    const { body } = req;

    // Validate the admin input using the adminValidator
    const validatedInput: AdminInput = adminValidator(body);

    // Continue to the next middleware or route handler
    next();
  } catch (error) {
    if (error instanceof ApiError) {
      return res.status(error.status).json(error.message);
    }

    // Respond with the custom error
    const err = ApiError.badRequest();
    return res.status(err.status).json(err.message);
  }
};

export default adminValidator;

