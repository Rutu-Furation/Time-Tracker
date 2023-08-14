import { EmployeeEntity } from "@domain/employee/entities/employee";
import { EmployeeRepository } from "@domain/employee/repositories/employee-repository";
import { ErrorClass } from "@presentation/error-handling/api-error";
import { Either } from "monet";

export interface GetEmployeeByIdUsecase {
  execute: (employeeId: string) => Promise<Either<ErrorClass, EmployeeEntity | null>>;
}

export class GetEmployeeById implements GetEmployeeByIdUsecase {
  private readonly employeeRepository:EmployeeRepository;

  constructor(employeeRepository: EmployeeRepository) {
    this.employeeRepository = employeeRepository;
  }

  async execute(employeeId: string): Promise<Either<ErrorClass, EmployeeEntity | null>> {
    return await this.employeeRepository.getEmployeeById(employeeId);
  }
}