<<<<<<< HEAD
import {EmployeeModel,EmployeeEntity,EmployeeMapper,LoginModel } from "@domain/employee/entities/employee";
=======
import {EmployeeModel,EmployeeEntity,EmployeeMapper, } from "@domain/employee/entities/employee";
>>>>>>> f977db7bf512e096c3c263f60c00f1a89c864548
  import { EmployeeRepository } from "@domain/employee/repositories/employee-repository";
  import {EmployeeDataSource,EmployeeDataSourceImpl, } from "@data/employee/datasources/employee-data-source";
  import ApiError, { ErrorClass } from "@presentation/error-handling/api-error";
  import { Either, Right, Left } from "monet";
  import { Employee } from "../models/employee-models";
  //import { employeeRouter } from "@presentation/middlewares/employee/validation-middleware";
  
  export class EmployeeRepositoryImpl implements EmployeeRepository {
    private readonly dataSource: EmployeeDataSource;
  
    constructor(dataSource: EmployeeDataSource) {
      this.dataSource = dataSource;
    }
  
    async createEmployee(
<<<<<<< HEAD
      employee: EmployeeModel
    ): Promise<Either<ErrorClass, EmployeeEntity>> {
      try {
        let i = await this.dataSource.create(employee);
=======
      kitchen: EmployeeModel
    ): Promise<Either<ErrorClass, EmployeeEntity>> {
      try {
        let i = await this.dataSource.create(kitchen);
>>>>>>> f977db7bf512e096c3c263f60c00f1a89c864548
        return Right<ErrorClass, EmployeeEntity>(i);
      } catch (e) {
        if (e instanceof ApiError && e.name === "conflict") {
          return Left<ErrorClass, EmployeeEntity>(ApiError.emailExist());
        }
        return Left<ErrorClass, EmployeeEntity>(ApiError.badRequest());
      }
    }
  
<<<<<<< HEAD
    async deleteEmployee(employee: string): Promise<Either<ErrorClass, void>> {
      try {
        let i = await this.dataSource.delete(employee);
=======
    async deleteEmployee(kitchen: string): Promise<Either<ErrorClass, void>> {
      try {
        let i = await this.dataSource.delete(kitchen);
>>>>>>> f977db7bf512e096c3c263f60c00f1a89c864548
        return Right<ErrorClass, void>(i);
      } catch {
        return Left<ErrorClass, void>(ApiError.badRequest());
      }
    }
  
    async updateEmployee(
      id: string,
      data: EmployeeModel
    ): Promise<Either<ErrorClass, EmployeeEntity>> {
      try {
        let i = await this.dataSource.update(id, data);
        return Right<ErrorClass, EmployeeEntity>(i);
      } catch (e) {
        if (e instanceof ApiError && e.name === "conflict") {
          return Left<ErrorClass, EmployeeEntity>(ApiError.emailExist());
        }
        return Left<ErrorClass, EmployeeEntity>(ApiError.badRequest());
      }
    }
  
    async getEmployees(): Promise<Either<ErrorClass, EmployeeEntity[]>> {
      try {
        let i = await this.dataSource.getAllemployees();
        return Right<ErrorClass, EmployeeEntity[]>(i);
      } catch {
        return Left<ErrorClass, EmployeeEntity[]>(ApiError.badRequest());
      }
    }
  
    async getEmployeeById(
      id: string
    ): Promise<Either<ErrorClass, EmployeeEntity | null>> {
      try {
        let i = await this.dataSource.read(id);
        return Right<ErrorClass, EmployeeEntity | null>(i);
      } catch (error) {
        return Left<ErrorClass, EmployeeEntity | null>(ApiError.badRequest());
      }
    }
<<<<<<< HEAD

    async login(email:string, password:string): Promise<any> {
      try {
        const res = await this.dataSource.login(email, password);
       
        
        return Right<ErrorClass, any>(Employee);
      } catch (error) {
        if (error instanceof ApiError && error.status === 404) {
          return Left<ErrorClass, EmployeeEntity>(ApiError.notFound());
        }
        return Left<ErrorClass, EmployeeEntity>(ApiError.badRequest());
      }
      }
=======
>>>>>>> f977db7bf512e096c3c263f60c00f1a89c864548
  }
  