import { EmployeeEntity } from "@domain/employee/entities/employee";
import { EmployeeRepository } from "@domain/employee/repositories/employee-repository";
import { ErrorClass } from "@presentation/error-handling/api-error";
import { Either } from "monet";

export interface GetAllEmployeesUsecase {
  execute: () => Promise<Either<ErrorClass,EmployeeEntity[]>>;
}

export class GetAllEmployees implements GetAllEmployeesUsecase {
  private readonly employeeRepository: EmployeeRepository;

  constructor(employeeRepository: EmployeeRepository) {
    this.employeeRepository = employeeRepository;
  }

  async execute(): Promise<Either<ErrorClass, EmployeeEntity[]>> {
    return await this.employeeRepository.getEmployees();
  }
}
