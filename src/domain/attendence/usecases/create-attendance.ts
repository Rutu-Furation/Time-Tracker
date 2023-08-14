
import { AttendanceEntity,AttendanceModel } from "../entities/attendence";
import { AttendanceRepository } from "../repositories/attendence-repository";

export interface CreateAttendanceUsecase {
  execute: (adminData: AttendanceModel) => Promise<AttendanceEntity>;
}

export class CreateAttendance implements CreateAttendanceUsecase {
  private readonly AttendanceRepository: AttendanceRepository;

  constructor(AttendanceRepository: AttendanceRepository) {
    this.AttendanceRepository = AttendanceRepository;
  }

  async execute(adminData: AttendanceModel): Promise<AttendanceEntity> {
    return await this.AttendanceRepository.createAttendance(adminData);
  }
}
