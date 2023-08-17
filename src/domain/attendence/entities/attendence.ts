export class AttendanceModel {
  constructor(
    public Check_in: string = "",
    public Check_out: string = "",
    public Date:  string = "",
    public Duration: string = "",
    public Status: boolean = false,
    public Remarks: string = "",
    public User_id: string = ""
  ) {}
}

export class AttendanceEntity {
  constructor(
    public id: string | undefined = undefined,
    public User_id: string,
    public Check_in: string,
    public Check_out: string,
    public Date: string,
    public Duration: string,
    public Status: boolean,
    public Remarks: string
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
        User_id:
          attendanceData.User_id !== undefined
            ? attendanceData.User_id
            : existingAttendance.User_id,
        Check_in:
          attendanceData.Check_in !== undefined
            ? attendanceData.Check_in
            : existingAttendance.Check_in,
        Check_out:
          attendanceData.Check_out !== undefined
            ? attendanceData.Check_out
            : existingAttendance.Check_out,
        Date:
          attendanceData.Date !== undefined
            ? attendanceData.Date
            : existingAttendance.Date,
        Duration:
          attendanceData.Duration !== undefined
            ? attendanceData.Duration
            : existingAttendance.Duration,
        Status:
          attendanceData.Status !== undefined
            ? attendanceData.Status
            : existingAttendance.Status,
        Remarks:
          attendanceData.Remarks !== undefined
            ? attendanceData.Remarks
            : existingAttendance.Remarks,
      };
    } else {
      const attendanceEntity: AttendanceEntity = {
        id: includeId ? attendanceData._id?.toString() : undefined,
        User_id: attendanceData.User_id,
        Check_in: attendanceData.Check_in,
        Check_out: attendanceData.Check_out,
        Date: attendanceData.Date,
        Duration: attendanceData.Duration,
        Status: attendanceData.Status,
        Remarks: attendanceData.Remarks,
      };
      return attendanceEntity;
    }
  }

  static toModel(attendance: AttendanceEntity): AttendanceModel {
    return {
      Check_in: attendance.Check_in,
      Check_out: attendance.Check_out,
      User_id: attendance.User_id,
      Date: attendance.Date,
      Duration: attendance.Duration,
      Status: attendance.Status,
      Remarks: attendance.Remarks,
    };
  }
}
