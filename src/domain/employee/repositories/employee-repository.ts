<<<<<<< HEAD
import {EmployeeModel,EmployeeEntity,LoginModel } from "@domain/employee/entities/employee";
=======
import {EmployeeModel,EmployeeEntity } from "@domain/employee/entities/employee";
>>>>>>> f977db7bf512e096c3c263f60c00f1a89c864548
import { Either } from "monet";
import  ErrorClass from "@presentation/error-handling/api-error";

export interface EmployeeRepository {
  createEmployee(employee: EmployeeModel): Promise<Either<ErrorClass, EmployeeEntity>>;
  deleteEmployee(id: string): Promise<Either<ErrorClass, void>>;
  updateEmployee(id: string, data: EmployeeModel): Promise<Either<ErrorClass, EmployeeEntity>>;
  getEmployees(): Promise<Either<ErrorClass, EmployeeEntity[]>>;
  getEmployeeById(id: string): Promise<Either<ErrorClass, EmployeeEntity | null>>;
<<<<<<< HEAD
  login(email:string, password:string): Promise<any>;
=======
>>>>>>> f977db7bf512e096c3c263f60c00f1a89c864548
}