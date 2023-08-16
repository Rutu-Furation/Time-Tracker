import { AttendanceEntity, AttendanceModel } from "../entities/attendence";
import { AttendanceRepository } from "../repositories/attendence-repository";

export interface UpdateAdminUsecase {
  execute: (
    adminId: string,
    adminData: Partial<AttendanceModel>
  ) => Promise<AttendanceEntity>;
}

export class UpdateAdmin implements UpdateAdminUsecase {
  private readonly AttendanceRepository: AttendanceRepository;

  constructor(AttendanceRepository: AttendanceRepository) {
    this.AttendanceRepository = AttendanceRepository;
  }

  async execute(
    adminId: string,
    adminData: Partial<AttendanceModel>
  ): Promise<AttendanceEntity> {
    const existingAdmin: AttendanceEntity | null =
      await this.AttendanceRepository.getAttendanceById(adminId);

    // Perform the partial update by merging adminData with existingAdmin
    const updatedAdminData: AttendanceEntity | any = {
      ...existingAdmin,
      ...adminData,
    };

    // Save the updatedAdminData to the repository
    await this.AttendanceRepository.updateAttendance(adminId, updatedAdminData);

    // Fetch the updated admin entity from the repository
    const updatedAttendanceEntity: AttendanceEntity | null =
      await this.AttendanceRepository.getAttendanceById(adminId);

    if (!updatedAttendanceEntity) {
      throw new Error("Admin not found after update.");
    }

    return updatedAttendanceEntity;
  }
}
