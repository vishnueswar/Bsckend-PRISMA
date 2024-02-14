import { Request, Response } from 'express';

import jwt from 'jsonwebtoken';

import prismaInstance from '../../prisma/instance';
import { SECRET_KEY } from '../utilities/envs';

const secretKey = SECRET_KEY || "";

const login = async (req: Request, res: Response) => {
  const { password, email } = req.body;
  console.log(password, email)

  const user = await prismaInstance.user.findUnique({
    where: { email },
  });

  if (!user || user.password !== password) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  if ( user.status !== false) {
    return res.status(401).json({ message: 'contact admin ' });
  }
  const token = jwt.sign({ userId: user.id }, secretKey, { expiresIn: '1h' });

  res.status(200).json({ message: 'Login successful', token });
}


const register = async (req: Request, res: Response) => {
  console.log("entered register function")
  const { name, password, email } = req.body;
  console.log(name, password, email)
  
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
      role:"USER",
    },
  });
  res.status(201).json({ message: 'User registered successfully' });
}

const addDescription = async (req: any, res: Response) => {
  const { description, patient,fees,dueDate,gender,patientPlace} = req.body;
  const userId = req.userId;
  console.log("reqid", req.userId)
  if (!patient) {
    return res.status(400).json({ message: 'Patient field is required' });
  }
  const create = await prismaInstance.description.create({
    data: {
      description: description,
      patient  : patient,
      userId: userId,
      fees:fees,
      dueDate:dueDate,
      gender:gender,
      patientPlace:patientPlace,


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
  console.log(userId)
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

const blockUser = async (req: any, res: Response) => {
  console.log("entered Blocking section")
  const userId = req.body.userId || "";
  console.log(userId)

  try {
    const user = await prismaInstance.user.findUnique({
      where: { id: userId },
    });
console.log(user)
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const updatedStatus = !user.status;

    await prismaInstance.user.update({
      where: { id: userId },
      data: { status: updatedStatus },
    });

    return res.status(200).json({ message: 'User status updated successfully' });
  } catch (error) {
    console.error('Error blocking user:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}



const deleteDescription = async (req: any, res: Response) => {
  const { id,userId } = req.body;
  console.log("reqid", req.userId)
  const deleteData = await prismaInstance.description.delete({
   where:{id:id,userId:userId}
  });

  console.log("post deleted", deleteData)
  res.send(deleteData)
}
const updateDescription  = async (req: any, res: Response) => {
  const { id,userId,comment,fees,gender,dueDate,patientPlace} = req.body;
  const deleteData = await prismaInstance.description.update({
   where:{id:id,userId:userId},
   data:{description:comment,fees:fees,gender:gender,dueDate:dueDate,patientPlace:patientPlace}
  });

  console.log("post deleted", deleteData)
  res.send(deleteData)
}

export { findAll, login, register, addDescription, getDescriptions,deleteDescription,updateDescription,blockUser }
