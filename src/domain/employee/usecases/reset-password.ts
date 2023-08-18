import { EmployeeEntity, EmployeeModel, LoginModel } from "@domain/employee/entities/employee";
import { EmployeeRepository } from "@domain/employee/repositories/employee-repository";
import { ErrorClass } from "@presentation/error-handling/api-error";
import { Either } from "monet";

export interface ResetPasswordUsecase {
  execute: (email: any) => Promise<any>;
}

export class ResetPassword implements ResetPasswordUsecase {
  private readonly employeeRepository: EmployeeRepository;

  constructor(employeeRepository: EmployeeRepository) {
    this.employeeRepository = employeeRepository;
  }

  async execute(
    email:string,
  ): Promise<any> {
    
    return await this.employeeRepository.resetPassword(email);
  }
}
