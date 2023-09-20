/** @format */
import express, { Request, Response } from "express";
import UserModel from "../Model/UserModel";
import bcrypt from "bcrypt";
import { user } from "../util/Interfaces";
import cloudinary from "../config/cloudinary";

export const CreateUser = async (req: any, res: Response) => {
  try {
    const { name, email, password } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    // if (password !== Confirmpassword) {
    //   return res.status(404).json({
    //     message: "Confrim password must be password",
    //   });
    // }

    const create = await UserModel.create({
      name,
      email,
      password: hash,
      // Confirmpassword: hash,
    });
    return res.status(200).json({
      message: "Created User Successfully",
      data: create,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

export const updateUserImage = async (req: any, res: Response) => {
  try {
    const { userID } = req.params;
    const { secure_url, public_id } = await cloudinary.uploader.upload(
      req.file?.path
    );

    const user = await UserModel.findByIdAndUpdate(
      userID,
      {
        Image: secure_url,
        ImageID: public_id,
      },
      { new: true }
    );

    return res.status(200).json({
      message: "user Successfully Updated his profile",
      data: user,
    });
  } catch (error) {
    return res.status(404).json({
      message: "An error occured",
      data: error,
    });
  }
};

export const RemoveUserImage = async (req: any, res: Response) => {
  try {
    const { userID } = req.params;
    const user: any = await UserModel.findById(userID);

    user!.Image = user!.Name.charAt(0);

    return res.status(200).json({
      message: "user Successfully Delete his profile",
      data: user,
    });
  } catch (error) {
    return res.status(404).json({
      message: "An error occured",
      data: error,
    });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { Name, Email } = req.body;
    const { userID } = req.params;

    const user = await UserModel.findByIdAndUpdate(
      userID,
      {
        Name,
        Email,
        Number,
      },
      { new: true }
    );

    return res.status(200).json({
      message: "user Updated Successfully",
      data: user,
    });
  } catch (error) {
    return res.status(404).json({
      message: "An error occured",
      data: error,
    });
  }
};

export const SignInUser = async (req: Request<{}, {}, user>, res: Response) => {
  try {
    const { email, password } = req.body;
    const Sign = await UserModel.findOne({ email });
    if (!Sign) {
      return res.status(404).json({
        message: "Incorrect Information",
      });
    }
    const change = await bcrypt.compare(password, Sign?.password!);

    if (!change) {
      return res.status(404).json({
        message: "Incorrect Information",
      });
    }

    return res.status(200).json({
      message: "Successfully SignIn",
      data: Sign,
    });
  } catch (error) {
    res.status(400).json({
      message: "Error occured in ur SignIn",
    });
  }
};

export const findOneUser = async (req: Request, res: Response) => {
  try {
    const { userID } = req.params;

    const user = await UserModel.findById(userID)
      .populate("Task")
      .populate("receivedTask")
      .populate("assignedTask")
      .populate("notification");

    return res.status(200).json({
      message: "Found successfully",
      data: user,
    });
  } catch (error) {
    res.status(400).json({
      message: "Error occured",
    });
  }
};

export const findAllUsers = async (req: Request, res: Response) => {
  try {
    const allUsers = await UserModel.find();

    res.status(400).json({
      message: "Successful",
      data: allUsers,
    });
  } catch (error) {
    res.status(400).json({
      message: "Error occured",
    });
  }
};
