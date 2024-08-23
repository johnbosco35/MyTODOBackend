import express, { Request, Response } from "express";
import TaskModel from "../Model/TaskModel";
import UserModel from "../Model/UserModel";
import mongoose from "mongoose";
import Notify from "../Model/Notify";
import { Mailer } from "../config/mailer";

export const CreateTask = async (req: Request, res: Response) => {
  try {
    const { Title, priority, Des } = req.body;
    const user = await UserModel.findById(req.params.id);
    if (!user) {
      return res.status(400).json({
        message: "User not found",
      });
    }
    const Task = await TaskModel.create({
      Title,
      priority,
      Des,
    });
    user?.Task?.push(new mongoose.Types.ObjectId(Task?._id));
    user.save();
    return res.status(200).json({
      message: "User successfully created a task",
      data: Task,
    });
  } catch (error: any) {
    res.status(404).json({
      message: "Error occur when try to createtask",
      data: error.message,
    });
  }
};

export const UpdateTask = async (req: Request, res: Response) => {
  try {
    const { Title, priority, Des } = req.body;
    const user = await UserModel.findById(req.params.id);
    if (!user) {
      return res.status(400).json({
        message: "Unable to updatetask",
      });
    }
    const Task = await TaskModel.findByIdAndUpdate(
      req.params.id,
      {
        Title,
        Des,
        priority,
      },
      { new: true }
    );
    return res.status(400).json({
      message: "User successfully update task",
      data: Task,
    });
    // user?.Task?.push(new mongoose.Types.ObjectId(Task?._id))
    // user.save
  } catch (error) {
    res.status(404).json({
      message: "Error when trying to updatetask",
    });
  }
};

export const DeleteTask = async (req: Request, res: Response) => {
  try {
    const {} = req.body;
    const deletes = await UserModel.findByIdAndDelete(req.params.id);
  } catch (error) {
    res.status(404).json({
      message: "Error occur when trying to deletetask",
    });
  }
};

export const AssignTask = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const { senderID } = req.params;
    const { taskID } = req.params;

    const Task = await TaskModel.findById(taskID);
    const sender = await UserModel.findById(senderID);
    const receiver = await UserModel.findOne({ email });

    const subject = "Task assignment from Todo App";
    const text = `A task has been assigned to you by <strong>${sender?.email}</strong>`;

    if (!email) {
      return res.send("User not Found");
    }

    Mailer(receiver?.email, text, subject);

    sender?.assignedTask?.push(new mongoose.Types.ObjectId(Task?._id));
    sender?.Task?.pull!(new mongoose.Types.ObjectId(Task?._id));
    receiver?.receivedTask?.push(new mongoose.Types.ObjectId(Task?._id));

    await sender?.save();
    await receiver?.save();

    const senderNotify = await Notify.create({
      message: `Task sent successfully to ${receiver?.name}`,
    });
    const receiverNotify = await Notify.create({
      message: `A task has been sent to you by ${sender?.name}`,
    });

    sender?.notification?.push(new mongoose.Types.ObjectId(senderNotify?._id));
    receiver?.notification?.push(
      new mongoose.Types.ObjectId(receiverNotify?._id)
    );
    await sender?.save();
    await receiver?.save();

    res.status(200).json({
      message: "Task assigning successful",
      data: {
        sender,
        receiver,
      },
    });
  } catch (error) {
    res.status(404).json({
      message: "Error occur when trying to assigning task",
    });
  }
};

// export const Filter = async (req:Request, res:Response) =>{
//   try {
    
//     const {query} = req.query

//     if(!query) {
//       return res.status(400).json({message: "Please provide a query to filter tasks"})
//     }

// const 

//     // const filteredTasks = tasks.filter(task => 
//     //   task.toLowerCase().includes(query.toLowerCase())
//     // );
    
//     res.status(200).json({ 
//       message:"query task Successfully",
//       data:filteredTasks,
//      });
  

//   } catch (error) {
//     res.status(404).json({
//       message: "Error occur when trying to filter task",
//       data: error.message
//     })
//   }
// }
