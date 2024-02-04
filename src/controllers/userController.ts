import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import prismaInstance from '../../prisma/instance';
import { SECRET_KEY } from '../utilities/envs';

const secretKey = SECRET_KEY || "";

const login = async (req: Request, res: Response) => {
  const { password, email } = req.body;
  console.log(password, email)

  // Implement user login logic here
  const user = await prismaInstance.user.findUnique({
    where: { email },
  });

  if (!user || user.password !== password) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign({ userId: user.id }, secretKey, { expiresIn: '1h' });

  res.status(200).json({ message: 'Login successful', token });
}

const register = async (req: Request, res: Response) => {
  console.log("entered register function")
  const { name, password, email } = req.body;
  console.log(name, password, email)
  // Implement user registration logic here
  const existingUser = await prismaInstance.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    return res.status(409).json({ message: 'Username already exists' });
  }

  const newUser = await prismaInstance.user.create({
    data: {
      password,
      email,
      name,
    },
  });

  // const token = jwt.sign({ userId: newUser.id }, secretKey, { expiresIn: '1h' });

  // res.cookie('token', token, { httpOnly: true });
  // console.log("sent cokkie and the cookie is ," , token);
  res.status(201).json({ message: 'User registered successfully' });
}

const addDescription = async (req: any, res: Response) => {
  const { description } = req.body;
  const userId = req.userId;
  console.log("reqid", req.userId)
  const create = await prismaInstance.description.create({
    data: {
      description: description,
      userId: userId,
    },
  });

  console.log("post created", create)
  res.send(create)
}

const findAll = async (req: Request, res: Response) => {
  const allUsers = await prismaInstance.user.findMany();
  console.log(allUsers);
  res.send(allUsers);
}
const getDescriptions = async (req: any, res: Response) => {
  console.log("entered get description")
  const userId = req.userId || "";
  const descriptions = await prismaInstance.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      Description: true,
    },
  });
  console.log(descriptions);
  res.send(descriptions);
}
export { findAll, login, register, addDescription, getDescriptions }
