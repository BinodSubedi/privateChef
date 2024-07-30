import "express";

declare global {
  namespace Express {
    interface Request {
      user?: any; // Customize the type as needed
    }
  }
}
