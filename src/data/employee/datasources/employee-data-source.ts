import { EmployeeModel, EmployeeEntity } from "@domain/employee/entities/employee";
import { Employee } from "../models/employee-models";
import mongoose from "mongoose";
import ApiError from "@presentation/error-handling/api-error";
export interface EmployeeDataSource {
  create(employee: EmployeeModel): Promise<any>; // Return type should be Promise of EmployeeEntity
  update(id: string, employee: EmployeeModel): Promise<any>; // Return type should be Promise of EmployeeEntity
  delete(id: string): Promise<void>;
  read(id: string): Promise<any | null>; // Return type should be Promise of EmployeeEntity or null
  getAllemployees(): Promise<any[]>; // Return type should be Promise of an array of EmployeeEntity
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
}
