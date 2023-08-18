import { EmployeeRepository } from "../repositories/employee-repository";

export interface LogoutEmployeeUsecase{
  execute: () => Promise<any>;
}

export class LogoutEmployee implements LogoutEmployeeUsecase {
  private readonly employeeRepository: EmployeeRepository;

  constructor(employeeRepository: EmployeeRepository) {
    this.employeeRepository = employeeRepository;
  }

  async execute(): Promise<void> {
    return await this.employeeRepository.logout();
  }
}
