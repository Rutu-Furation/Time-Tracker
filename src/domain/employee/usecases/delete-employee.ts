import { type EmployeeRepository } from "@domain/employee/repositories/employee-repository";
import { ErrorClass } from "@presentation/error-handling/api-error";
import { Either } from "monet";

export interface DeleteEmployeeUsecase {
  execute: (employeeId: string) => Promise<Either<ErrorClass, void>>;
}

export class DeleteEmployee implements DeleteEmployeeUsecase {
  private readonly employeeRepository: EmployeeRepository;

  constructor(employeeRepository: EmployeeRepository) {
    this.employeeRepository = employeeRepository;
  }

  async execute(employeeId: string): Promise<Either<ErrorClass, void>> {
   return await this.employeeRepository.deleteEmployee(employeeId);
  }
}
