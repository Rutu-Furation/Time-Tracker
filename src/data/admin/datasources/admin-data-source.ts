import mongoose from "mongoose";
import ApiError from "@presentation/error-handling/api-error";
import { Admin } from "@data/admin/models/admin-model";
import {
  AdminEntity,
  AdminModel,
  AdminMapper,
  LoginModel,
} from "@domain/admin/entities/admin"; // Import the entity and mapper

import nodemailer from "nodemailer";
import bodyParser from "body-parser";
import express from "express";
export class InvitationApp {
  private app: express.Application;
  private transporter: nodemailer.Transporter;
  constructor() {
    this.app = express();
    this.app.use(bodyParser.json());
    // Nodemailer configuration
    this.transporter = nodemailer.createTransport({
      service: "gmail",
      // rutuja.dhekolkar@furation.tech  , mkfregktqnmykao
      auth: {
        user: "rutuja.dhekolkar@furation.tech",
        pass: "svopfskoqniqnlwj",
      },
    });
    // this.app.post('/send-invitation', this.sendInvitation.bind(this));
  }
  public sendInvitation(
    email: string,
    companyName: string,
    fullName: string,
    password: string
  ): Promise<void> {
    const mailOptions: nodemailer.SendMailOptions = {
      from: "rutuja.dhekolkar@furation.tech",
      to: email,
      subject: "Invitation to Join Furation Tech Solutions WorkSpace",
      headers: {
        "Content-Type": "text/html",
      },
      // text: `You have been invited to join the group ${companyName}. Click the link to join: https://example.com/groups/${companyName}`
      html: `
  <p>Dear ${fullName},</p>
  <p>We are thrilled to extend to you an invitation to join our esteemed community at Furation Tech Solutions. Your expertise and contributions are highly valued, and we believe your presence will further enrich our team.</p>
  <p><strong>Invitation Details:</strong></p>
  <p><strong>Company:</strong> Furation Tech Solutions<br>Invitation Link: <a href="https://time-tracker-frontend-eight.vercel.app/">Click Here</a></p>
  <p>By clicking the link above, you will be directed to the platform where you can seamlessly join our organization and begin collaborating with like-minded professionals.</p>
  <p><strong>Login Credentials:</strong> <br> <strong>Email :</strong> ${email} <br> <strong>Password:</strong>${password} </p>
  <p>Should you have any questions or require assistance during the registration process, please don't hesitate to contact our support team at <a href="mailto:hello@furation.tech">hello@furation.tech</a>.</p>
  <p>We eagerly await your participation and look forward to welcoming you aboard.</p>
  <p><strong>Best regards,</strong><br>Furation Tech Solutions</p>
`,
    };
    return new Promise((resolve, reject) => {
      this.transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error("Error sending invitation email:", error);
          reject(error);
        } else {
          console.log("Invitation email sent:", info.response);
          resolve();
        }
      });
    });
  }
}

export interface AdminDataSource {
  create(admin: AdminModel): Promise<any>;
  getById(id: string): Promise<AdminEntity>;
  getAllAdmins(): Promise<AdminEntity[]>;
  update(id: string, admin: AdminModel): Promise<any>; // Return type should be Promise of AdminEntity
  delete(id: string): Promise<void>;
  login(email: string, password: string): Promise<any>;
  logout(): Promise<any>;
}

export class AdminDataSourceImpl implements AdminDataSource {
  constructor(
    private db: mongoose.Connection,
    private invitationApp: InvitationApp
  ) {}

  async create(admin: AdminModel): Promise<any> {
    const existingAdmin = await Admin.findOne({ email: admin.email });
    if (existingAdmin) {
      throw ApiError.emailExist();
    }

    const adminData = new Admin(admin);

    const createdAdmin = await adminData.save();

        await this.invitationApp.sendInvitation(
          admin.email,
          "Furation Tech Solutions",
          admin.fullName,
          admin.password
        );


    return createdAdmin.toObject();
  }

  async getById(id: string): Promise<AdminEntity> {
    try {
      const admin = await Admin.findById(id);
      if (!admin) {
        throw ApiError.notFound();
      }
      return admin && admin.toObject();
    } catch (error) {
      throw ApiError.badRequest();
    }
  }

  async getAllAdmins(): Promise<any[]> {
    try {
      const admins = await Admin.find();
      return admins.map((admin) => admin.toObject());
    } catch (error) {
      throw ApiError.notFound();
    }
  }

  async update(id: string, admin: AdminModel): Promise<any> {
    try {
      const updatedAdmin = await Admin.findByIdAndUpdate(id, admin, {
        new: true,
      }); // No need for conversion here
      return updatedAdmin ? updatedAdmin.toObject() : null; // Convert to plain JavaScript object before returning
    } catch (error) {
      throw ApiError.badRequest();
    }
  }

  async delete(id: string): Promise<void> {
    await Admin.findByIdAndDelete(id);
  }

  async login(email: string, password: string): Promise<any> {
    // const existingAdmin = await Admin.findOne({ email: admin.email });
    const admin = await Admin.findOne({ email }).select("+password");

    if (!admin) {
      throw ApiError.adminNotFound();
    }
    return admin;
  }

  logout(): Promise<void> {
    throw new Error("Logout Failed");
  }
}
