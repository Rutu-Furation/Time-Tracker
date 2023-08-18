export class AttendanceModel {
  constructor(
    public checkIn: string = "",
    public checkOut: string = "",
    public date:  string = "",
    public duration: string = "",
    public status: boolean = false,
    public remarks: string = "",
    public userId: string = ""
  ) {}
}

export class AttendanceEntity {
  constructor(
    public id: string | undefined = undefined,
    public userId: string,
    public checkIn: string,
    public checkOut: string,
    public date: string,
    public duration: string,
    public status: boolean,
    public remarks: string
  ) {}
}

export class AttendanceMapper {
  static toEntity(
    attendanceData: any,
    includeId?: boolean,
    existingAttendance?: AttendanceEntity | null
  ): AttendanceEntity {
    if (existingAttendance != null) {
      return {
        ...existingAttendance,
        userId:
          attendanceData.userId !== undefined
            ? attendanceData.userId
            : existingAttendance.userId,
        checkIn:
          attendanceData.checkIn !== undefined
            ? attendanceData.checkIn
            : existingAttendance.checkIn,
        checkOut:
          attendanceData.checkOut !== undefined
            ? attendanceData.checkOut
            : existingAttendance.checkOut,
        date:
          attendanceData.date !== undefined
            ? attendanceData.date
            : existingAttendance.date,
        duration:
          attendanceData.duration !== undefined
            ? attendanceData.duration
            : existingAttendance.duration,
        status:
          attendanceData.status !== undefined
            ? attendanceData.status
            : existingAttendance.status,
        remarks:
          attendanceData.remarks !== undefined
            ? attendanceData.remarks
            : existingAttendance.remarks,
      };
    } else {
      const attendanceEntity: AttendanceEntity = {
        id: includeId ? attendanceData._id?.toString() : undefined,
        userId: attendanceData.userId,
        checkIn: attendanceData.checkIn,
      checkOut: attendanceData.checkOut,
        date: attendanceData.date,
        duration: attendanceData.duration,
        status: attendanceData.status,
        remarks: attendanceData.remarks,
      };
      return attendanceEntity;
    }
  }

  static toModel(attendance: AttendanceEntity): AttendanceModel {
    return {
      checkIn: attendance.checkIn,
      checkOut: attendance.checkOut,
      userId: attendance.userId,
      date: attendance.date,
      duration: attendance.duration,
      status: attendance.status,
      remarks: attendance.remarks,
    };
  }
}
