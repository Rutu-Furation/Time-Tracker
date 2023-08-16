import {EmployeeModel,EmployeeEntity } from "@domain/employee/entities/employee";
import { Either } from "monet";
import  ErrorClass from "@presentation/error-handling/api-error";

export interface EmployeeRepository {
  createEmployee(employee: EmployeeModel): Promise<Either<ErrorClass, EmployeeEntity>>;
  deleteEmployee(id: string): Promise<Either<ErrorClass, void>>;
  updateEmployee(id: string, data: EmployeeModel): Promise<Either<ErrorClass, EmployeeEntity>>;
  getEmployees(): Promise<Either<ErrorClass, EmployeeEntity[]>>;
  getEmployeeById(id: string): Promise<Either<ErrorClass, EmployeeEntity | null>>;
}