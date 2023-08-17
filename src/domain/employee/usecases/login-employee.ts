import { EmployeeEntity, EmployeeModel, LoginModel } from "@domain/employee/entities/employee";
import { EmployeeRepository } from "@domain/employee/repositories/employee-repository";
import { ErrorClass } from "@presentation/error-handling/api-error";
import { Either } from "monet";

export interface LoginEmployeeUsecase {
  execute: (email: string, password: string) => Promise<any>;
}

export class LoginEmployee implements LoginEmployeeUsecase {
  private readonly employeeRepository: EmployeeRepository;

  constructor(employeeRepository: EmployeeRepository) {
    this.employeeRepository = employeeRepository;
  }

  async execute(
    email:string,
    password:string
  ): Promise<any> {
    
    return await this.employeeRepository.login(email, password);
  }
}
