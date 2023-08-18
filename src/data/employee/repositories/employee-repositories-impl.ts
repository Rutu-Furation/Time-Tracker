import {EmployeeModel,EmployeeEntity,EmployeeMapper,LoginModel } from "@domain/employee/entities/employee";
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
      employee: EmployeeModel
    ): Promise<Either<ErrorClass, EmployeeEntity>> {
      try {
        let i = await this.dataSource.create(employee);
        return Right<ErrorClass, EmployeeEntity>(i);
      } catch (e) {
        if (e instanceof ApiError && e.name === "conflict") {
          return Left<ErrorClass, EmployeeEntity>(ApiError.emailExist());
        }
        return Left<ErrorClass, EmployeeEntity>(ApiError.badRequest());
      }
    }

    async deleteEmployee(employee: string): Promise<Either<ErrorClass, void>> {
      try {
        let i = await this.dataSource.delete(employee);
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

    async login(
      email: string,
      password: string
    ): Promise<Either<ErrorClass, EmployeeEntity>> {
      try {
        const res = await this.dataSource.login(email, password);

        return Right<ErrorClass, EmployeeEntity>(res);
      } catch (error) {
        if (error instanceof ApiError && error.status === 404) {
          return Left<ErrorClass, EmployeeEntity>(ApiError.notFound());
        }
        return Left<ErrorClass, EmployeeEntity>(ApiError.badRequest());
      }
    }

    async logout(): Promise<Either<ErrorClass, string>> {
      try {
        const res = await this.dataSource.logout();
        return Right<ErrorClass, string>("Logged Out");
      } catch (error) {
        if (error instanceof ApiError) {
          return Left<ErrorClass, string>(error);
        }
        return Left<ErrorClass, string>(
          ApiError.customError(500, "Logout Failed")
        );
      }
    }

    async resetPassword(email: any): Promise<any> {
      try {
        const resetPass = await this.dataSource.resetPassword(email)
  
        return Right<ErrorClass, any>(resetPass);
      } catch (error) {
        if (error instanceof ApiError) {
          return Left<ErrorClass, string>(error);
        }
        return Left<ErrorClass, string>(
          ApiError.customError(500, "no matched result with provied email")
        );
      }
    }
  }
  
