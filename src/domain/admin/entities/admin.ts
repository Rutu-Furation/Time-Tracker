// // Now let's integrate the mapper classes with the Admin schema

export class AdminModel {
  constructor(
    public fullName: string = "",
    public email: string = "",
    public phoneNo: number = 0,
    public address: any = {},
    public role: string = "",
    public active: boolean = false,
    public profilePicture: string = ""
  ) {}
}

export class AdminEntity {
  constructor(
    public id: string | undefined = undefined,
    public fullName: string,
    public email: string,
    public phoneNo: number,
    public address: any,
    public role: string,
    public active: boolean,
    public profilePicture: string
  ) {}
}

export class AdminMapper {
  static toEntity(
    adminData: any,
    includeId?: boolean,
    existingAdmin?: AdminEntity | null
  ): AdminEntity {
     if (existingAdmin != null) {
      return {
        ...existingAdmin,
        fullName:
          adminData.fullName !== undefined
            ? adminData.fullName
            : existingAdmin.fullName,
        email:
          adminData.email !== undefined ? adminData.email : existingAdmin.email,
        phoneNo:
          adminData.phoneNo !== undefined
            ? adminData.phoneNo
            : existingAdmin.phoneNo,
        address:
          adminData.address !== undefined
            ? adminData.address
            : existingAdmin.address,
        role:
          adminData.role !== undefined ? adminData.role : existingAdmin.role,
        active:
          adminData.active !== undefined
            ? adminData.active
            : existingAdmin.active,
        profilePicture:
          adminData.profile_picture !== undefined
            ? adminData.profile_picture
            : existingAdmin.profilePicture,
      };
    } else {
      const adminEntity: AdminEntity = {
        id: includeId ? adminData._id?.toString() : undefined,
        fullName: adminData.fullName,
        email: adminData.email,
        phoneNo: adminData.phoneNo,
        address: adminData.address,
        role: adminData.role,
        active: adminData.active,
        profilePicture: adminData.profile_picture,
      };
      return adminEntity;
    }
  }
  static toModel(admin: AdminEntity): AdminModel {
    return {
      fullName: admin.fullName,
      email: admin.email,
      phoneNo: admin.phoneNo,
      address: admin.address,
      role: admin.role,
      active: admin.active,
      profilePicture: admin.profilePicture,
    };
  }
}