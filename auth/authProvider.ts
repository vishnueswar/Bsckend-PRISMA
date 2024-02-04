import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';


interface AuthenticatedRequest extends Request {
    userId?: number;
}

// JWT Secret Key
const secretKey =  process.env.SECRET_KEY || "";


// Middleware to check JWT for authentication
 const authenticateToken = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    console.log("entered authenticateToken")
  const token = req.cookies.token;
    console.log(token);
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, secretKey) as { userId: number };
    req.userId = decoded.userId; // Attach userId to request for further use
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};


export {authenticateToken}