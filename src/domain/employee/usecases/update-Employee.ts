import { EmployeeEntity, EmployeeModel } from "@domain/employee/entities/employee";
import { EmployeeRepository } from "@domain/employee/repositories/employee-repository";
import { ErrorClass } from "@presentation/error-handling/api-error";
import { Either } from "monet";

export interface UpdateEmployeeUsecase {
  execute: (employeeId: string,
    employeeData: EmployeeModel
  ) => Promise<Either<ErrorClass, EmployeeEntity>>;
}

export class UpdateEmployee implements UpdateEmployeeUsecase {
  private readonly employeeRepository: EmployeeRepository;

  constructor(employeeRepository: EmployeeRepository) {
    this.employeeRepository = employeeRepository;
  }

   async execute(employeeId: string, employeeData: EmployeeModel): Promise<Either<ErrorClass, EmployeeEntity>> {
    return await this.employeeRepository.updateEmployee(employeeId, employeeData);
  }
}
