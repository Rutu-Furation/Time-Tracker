import { EmployeeEntity, EmployeeModel } from "@domain/employee/entities/employee";
import { EmployeeRepository } from "@domain/employee/repositories/employee-repository";
import { ErrorClass } from "@presentation/error-handling/api-error";
import { Either } from "monet";

export interface CreateEmployeeUsecase {
  execute: (employeeData: EmployeeModel) => Promise<Either<ErrorClass,EmployeeEntity>>;
}

export class CreateEmployee implements CreateEmployeeUsecase {
  private readonly employeeRepository: EmployeeRepository;

  constructor(employeeRepository: EmployeeRepository) {
    this.employeeRepository = employeeRepository;
  }

  async execute(employeeData: EmployeeModel): Promise<Either<ErrorClass,EmployeeEntity>> {
    return await this.employeeRepository.createEmployee(employeeData);
  }
}