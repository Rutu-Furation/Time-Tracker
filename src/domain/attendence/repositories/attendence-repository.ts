
import { AttendanceEntity, AttendanceModel } from "../entities/attendence";
export interface AttendanceRepository {
  createAttendance(Attendance: AttendanceModel): Promise<AttendanceEntity>;
  // deleteAttendance(id: string): Promise<void>;
  updateAttendance(id: string, data: AttendanceModel): Promise<AttendanceEntity>;
  getAttendanceById(id: string): Promise<AttendanceEntity | null>;
  getAttendances(): Promise<AttendanceEntity[]>;
}
