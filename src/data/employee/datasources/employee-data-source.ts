<<<<<<< HEAD
import { EmployeeModel, EmployeeEntity,EmployeeMapper,LoginModel } from "@domain/employee/entities/employee";
import { Employee } from "../models/employee-models";
import mongoose from "mongoose";
import ApiError from "@presentation/error-handling/api-error";

=======
import { EmployeeModel, EmployeeEntity } from "@domain/employee/entities/employee";
import { Employee } from "../models/employee-models";
import mongoose from "mongoose";
import ApiError from "@presentation/error-handling/api-error";
>>>>>>> f977db7bf512e096c3c263f60c00f1a89c864548
export interface EmployeeDataSource {
  create(employee: EmployeeModel): Promise<any>; // Return type should be Promise of EmployeeEntity
  update(id: string, employee: EmployeeModel): Promise<any>; // Return type should be Promise of EmployeeEntity
  delete(id: string): Promise<void>;
  read(id: string): Promise<any | null>; // Return type should be Promise of EmployeeEntity or null
  getAllemployees(): Promise<any[]>; // Return type should be Promise of an array of EmployeeEntity
<<<<<<< HEAD
  login(email:string, password:string): Promise<any>;

=======
>>>>>>> f977db7bf512e096c3c263f60c00f1a89c864548
}

export class EmployeeDataSourceImpl implements EmployeeDataSource {
  constructor(private db: mongoose.Connection) {}

  async create(employee: EmployeeModel): Promise<any> {
    const existingEmployee = await Employee.findOne({email: employee.email});
    if (existingEmployee) {
      throw ApiError.emailExist();
    }

    const employeeData = new Employee(employee);

    const createEmployee = await employeeData.save();
    
    return createEmployee.toObject();
  }

  async update(id: string, employee: EmployeeModel): Promise<any> {
    const updatedEmployee = await Employee.findByIdAndUpdate(id, employee, {
      new: true,
    }); // No need for conversion here
    return updatedEmployee ? updatedEmployee.toObject() :null; // Convert to plain JavaScript object before returning
  }

  async delete(id: string): Promise<void> {
    await Employee.findByIdAndDelete(id);
  }

  async read(id: string): Promise<any | null> {
    const employee = await Employee.findById(id);
    return employee ? employee.toObject() : null; // Convert to plain JavaScript object before returning
  }

  async getAllemployees(): Promise<any[]> {
    const employees = await Employee.find();
    return employees.map((employee) => employee.toObject()); // Convert to plain JavaScript objects before returning
  }
<<<<<<< HEAD

  async login(email: string, password: string): Promise<any> {
    // const existingEmployee = await Employee.findOne({ email: employee.email });
    const employee = await Employee.findOne({ email }).select("+password");
    if (employee) {
      throw ApiError.notFound();
    }
    return employee;
  }
=======
>>>>>>> f977db7bf512e096c3c263f60c00f1a89c864548
}
