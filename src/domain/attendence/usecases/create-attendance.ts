
import { AttendanceEntity,AttendanceModel } from "../entities/attendence";
import { AttendanceRepository } from "../repositories/attendence-repository";

export interface CreateAdminUsecase {
  execute: (adminData: AttendanceModel) => Promise<AttendanceEntity>;
}

export class CreateAdmin implements CreateAdminUsecase {
  private readonly AttendanceRepository: AttendanceRepository;

  constructor(AttendanceRepository: AttendanceRepository) {
    this.AttendanceRepository = AttendanceRepository;
  }

  async execute(adminData: AttendanceModel): Promise<AttendanceEntity> {
    return await this.AttendanceRepository.createAttendance(adminData);
  }
}
