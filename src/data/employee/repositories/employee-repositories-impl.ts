import {EmployeeModel,EmployeeEntity,EmployeeMapper, } from "@domain/employee/entities/employee";
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
      kitchen: EmployeeModel
    ): Promise<Either<ErrorClass, EmployeeEntity>> {
      try {
        let i = await this.dataSource.create(kitchen);
        return Right<ErrorClass, EmployeeEntity>(i);
      } catch (e) {
        if (e instanceof ApiError && e.name === "conflict") {
          return Left<ErrorClass, EmployeeEntity>(ApiError.emailExist());
        }
        return Left<ErrorClass, EmployeeEntity>(ApiError.badRequest());
      }
    }
  
    async deleteEmployee(kitchen: string): Promise<Either<ErrorClass, void>> {
      try {
        let i = await this.dataSource.delete(kitchen);
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
  }
  