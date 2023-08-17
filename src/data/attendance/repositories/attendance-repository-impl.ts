import { AttendanceModel,AttendanceEntity } from "@domain/attendence/entities/attendence";
import { AttendanceRepository } from "@domain/attendence/repositories/attendence-repository";
import { AttendanceSource } from "../datasources/attendance-datasource";

export class AttendanceRepositoryImpl implements AttendanceRepository {
  private readonly dataSource: AttendanceSource;

  constructor(dataSource: AttendanceSource) {
    this.dataSource = dataSource;
  }

  async createAttendance(admin: AttendanceModel): Promise<AttendanceEntity> {
    return await this.dataSource.create(admin);
  }

  async updateAttendance(id: string, data: AttendanceModel): Promise<AttendanceEntity> {
    return await this.dataSource.update(id, data);
  }

  async getAttendanceById(id: string): Promise<AttendanceEntity | null> {
    return await this.dataSource.read(id);
  }
  
  async getAttendances(): Promise<AttendanceEntity[]> {
    return await this.dataSource.getAllAttendance();
  }
}
