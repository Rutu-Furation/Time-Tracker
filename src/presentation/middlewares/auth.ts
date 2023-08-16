import { Request, Response, NextFunction } from "express";
import jwt, { JsonWebTokenError } from "jsonwebtoken"; // Import JsonWebTokenError
import { Admin } from "@data/admin/models/admin-model";

export const isAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { token } = req.cookies;
    console.log(token);
    
    if (!token) {
      res.status(401).json({
        message: "Please login first",
      });
    } else {
      const decoded: any = await jwt.verify(
        token,
        process.env.JWT_SECRET as string
      );

      // Cast error to JsonWebTokenError type
      req.user = await Admin.findById(decoded._id);
      next();
    }
  } catch (error) {
    const jwtError = error as JsonWebTokenError; // Cast error to JsonWebTokenError type
    res.status(500).json({
      message: jwtError.message,
    });
  }
};

// import { Request, Response, NextFunction } from "express";
// import jwt from "jsonwebtoken";
// import {Admin} from "@data/admin/models/admin-model";
// export const isAuthenticated = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ): Promise<void> => {
//   try {
//     const { token } = req.cookies;
//     if (!token) {
//       res.status(401).json({
//         message: "Please login first",
//       });
//     } else {
//       const decoded: any = await jwt.verify(
//         token,
//         process.env.JWT_SECRET as string
//       );

//       // const decoded: any = await jwt.verify(token, process.env.JWT_SECRET:string);
//       req.user = await Admin.findById(decoded._id);
//       next();
//     }
//   } catch (error) {
//     res.status(500).json({
//       message: error.message,
//     });
//   }
// };

// // export const isAuthenticated = async (
// //   req: Request,
// //   res: Response,
// //   next: NextFunction
// // ): Promise<void> => {
// //   try {
// //     const { token } = req.cookies;
// //     if (!token) {
// //       return res.status(401).json({
// //         message: "Please login first",
// //       });
// //     }

// //     const decoded: any = await jwt.verify(token, process.env.JWT_SECRET);

// //     req.admin = await Admin.findById(decoded._id);

// //     next();
// //   } catch (error) {
// //     res.status(500).json({
// //       message: error.message,
// //     });
// //   }
// // };
