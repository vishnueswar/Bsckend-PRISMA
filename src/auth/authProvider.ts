import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { SECRET_KEY } from '../utilities/envs';

interface AuthenticatedRequest extends Request {
    userId?: number;
}
const secretKey = SECRET_KEY || "";


// Middleware to check JWT for authentication
 const authenticateToken = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    console.log("entered authenticateToken")
  const token = (req.headers.authorization || "").replace("Bearer ","");
    // console.log(token);
    console.log("auth token",token)
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    console.log("secrete",secretKey);
    const decoded = jwt.verify(token, secretKey) as { userId: number };
    console.log("decoded" ,decoded)
    req.userId = decoded.userId; // Attach userId to request for further use
    console.log("authenticated")
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};


export {authenticateToken}