// Import necessary classes, interfaces, and dependencies
import mongoose from "mongoose";
import { Router } from "express"; // Correctly import Request and Response
import { EmployeeService } from "@presentation/services/employee-services";
import { EmployeeDataSourceImpl } from "@data/employee/datasources/employee-data-source";
import { EmployeeRepositoryImpl } from "@data/employee/repositories/employee-repositories-impl";
import { CreateEmployee } from "@domain/employee/usecases/create-employee";
import { DeleteEmployee } from "@domain/employee/usecases/delete-employee";
import { GetEmployeeById } from "@domain/employee/usecases/get-employee-by-id";
import { GetAllEmployees } from "@domain/employee/usecases/get-all-employee";
import { UpdateEmployee } from "@domain/employee/usecases/update-Employee";
import { LoginEmployee } from "@domain/employee/usecases/login-employee";
import validateEmployeeMiddleware from "@presentation/middlewares/employee/validation-middleware";
import { isAuthenticated } from "@presentation/middlewares/auth";
// import { ForgotPassword } from "@domain/employee/usecases/forgot-Password";

import { InvitationApp } from "@data/employee/datasources/employee-data-source";


// const dbURL =
//   "mongodb+srv://mongodb+srv://satansharma:satansharma@cluster0.ncc9mtu.mongodb.net/?retryWrites=true&w=majority"; // Replace with your actual MongoDB connection URL


const mongooseconnection = mongoose.Connection;

const invitationApp = new InvitationApp()
// Create an instance of the EmployeeDataSourceImpl and pass the mongoose connection
const employeeDataSource = new EmployeeDataSourceImpl(mongoose.connection,invitationApp);

// Create an instance of the EmployeeRepositoryImpl and pass the EmployeeDataSourceImpl
const employeeRepository = new EmployeeRepositoryImpl(employeeDataSource);

// Create instances of the required use cases and pass the EmployeeRepositoryImpl
const createEmployeeUsecase = new CreateEmployee(employeeRepository);
const deleteEmployeeUsecase = new DeleteEmployee(employeeRepository);
const getEmployeeByIdUsecase = new GetEmployeeById(employeeRepository);
const updateEmployeeUsecase = new UpdateEmployee(employeeRepository);
const getAllEmployeesUsecase = new GetAllEmployees(employeeRepository);
const LoginEmployeeUsecase = new LoginEmployee(employeeRepository);
// const forgotPasswordUsecase = new ForgotPassword(employeeRepository)
// Initialize employeeService and inject required dependencies
const employeeService = new EmployeeService(
  createEmployeeUsecase,
  deleteEmployeeUsecase,
  getEmployeeByIdUsecase,
  updateEmployeeUsecase,
  getAllEmployeesUsecase,
  LoginEmployeeUsecase,
  // forgotPasswordUsecase
);

// Create an Express router
export const employeeRouter = Router();

// Route handling for creating a new Employee
employeeRouter.post("/new", validateEmployeeMiddleware,employeeService.createEmployee.bind(employeeService));

// Route handling for getting an Employee by ID
employeeRouter.get("/:employeeId", employeeService.getEmployeeById.bind(employeeService));

// Route handling for updating an Employee by ID
employeeRouter.put("/:employeeId", employeeService.updateEmployee.bind(employeeService));

// Route handling for deleting an Employee by ID
employeeRouter.delete("/:employeeId", employeeService.deleteEmployee.bind(employeeService));

// Route handling for getting all Employees
employeeRouter.get("/", employeeService.getAllEmployees.bind(employeeService));

// Route handling for login Employees
employeeRouter.post("/login", employeeService.loginEmployee.bind(employeeService));

// employeeRouter.post("/forgotPassword", employeeService.forgotPasswordForEmp.bind(employeeService));
// employeeRouter.post("/resetPass", employeeService.resetPassword.bind(employeeService));
