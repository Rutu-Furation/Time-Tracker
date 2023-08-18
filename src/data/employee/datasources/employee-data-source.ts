import { EmployeeModel, EmployeeEntity,EmployeeMapper,LoginModel } from "@domain/employee/entities/employee";
import { Employee } from "../models/employee-models";
import mongoose from "mongoose";
import ApiError from "@presentation/error-handling/api-error";


import nodemailer from 'nodemailer';
import bodyParser from 'body-parser';
import express from 'express';
export class InvitationApp {
  private app: express.Application;
  private transporter: nodemailer.Transporter;
  constructor() {
    this.app = express();
    this.app.use(bodyParser.json());
    // Nodemailer configuration
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      // rutuja.dhekolkar@furation.tech  , mkfregktqnmykao
      auth: {
        user: 'rutuja.dhekolkar@furation.tech',
        pass: 'svopfskoqniqnlwj'
      }
    });
    // this.app.post('/send-invitation', this.sendInvitation.bind(this));
  }
  public sendInvitation(email: string, companyName: string, fullName: string, password:string): Promise<void> {
    const mailOptions: nodemailer.SendMailOptions = {
      from: 'rutuja.dhekolkar@furation.tech',
      to: email,
      subject: 'Invitation to Join Furation Tech Solutions WorkSpace',
      headers: {
        'Content-Type': 'text/html',
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
`
    };
    return new Promise((resolve, reject) => {
      this.transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error('Error sending invitation email:', error);
          reject(error);
        } else {
          console.log('Invitation email sent:', info.response);
          resolve();
        }
      });
    });
  }
}

export interface EmployeeDataSource {
  create(employee: EmployeeModel): Promise<any>; // Return type should be Promise of EmployeeEntity
  update(id: string, employee: EmployeeModel): Promise<any>; // Return type should be Promise of EmployeeEntity
  delete(id: string): Promise<void>;
  read(id: string): Promise<any | null>; // Return type should be Promise of EmployeeEntity or null
  getAllemployees(): Promise<any[]>; // Return type should be Promise of an array of EmployeeEntity
  login(email: string, password: string): Promise<any>;
  logout(): Promise<any>;
  resetPassword(email: any):Promise<any>;
}

export class EmployeeDataSourceImpl implements EmployeeDataSource {
  constructor(
    private db: mongoose.Connection,
    private invitationApp: InvitationApp
  ) {}

  async create(employee: EmployeeModel): Promise<any> {
    const existingEmployee = await Employee.findOne({ email: employee.email });
    if (existingEmployee) {
      throw ApiError.emailExist();
    }

    const employeeData = new Employee(employee);
    const createEmployee = await employeeData.save();
    await this.invitationApp.sendInvitation(
      employee.email,
      "Furation Tech Solutions",
      employee.fullName,
      employee.password
    );

    return createEmployee.toObject();
  }

  async update(id: string, employee: EmployeeModel): Promise<any> {
    const updatedEmployee = await Employee.findByIdAndUpdate(id, employee, {
      new: true,
    }); // No need for conversion here
    return updatedEmployee ? updatedEmployee.toObject() : null; // Convert to plain JavaScript object before returning
  }

  async delete(id: string): Promise<void> {
    await Employee.findByIdAndDelete(id);
  }

  async read(id: string): Promise<any | null> {
    const employee = await Employee.findById(id);
    return employee ? employee.toObject() : null; // Convert to plain JavaScript object before returning
  }

  async getAllemployees(): Promise<any[]> {
    const employees = await Employee.find();
    return employees.map((employee) => employee.toObject()); // Convert to plain JavaScript objects before returning
  }

  async login(email: string, password: string): Promise<any> {
    const employee = await Employee.findOne({ email }).select("+password");

    if (!employee) {
      throw ApiError.employeeNotFound();
    }
    return employee;
  }


  logout(): Promise<void> {
    throw new Error("Logout Failed");
  }

  async resetPassword(email: any): Promise<any> {
    const matchedEmailObject = await Employee.findOne({email:email.email})

    if (!matchedEmailObject) {
      throw ApiError.employeeNotFound();
    }
    return matchedEmailObject;
  }
}


