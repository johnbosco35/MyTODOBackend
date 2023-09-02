/** @format */

export interface user {
  name: string;
  email: string;
  password: string;
  Confirmpassword: string;
  UserImage: string;
  UserImageID: string;
  googleId: string;
  Task: any;
  assignedTask: {}[];
  receivedTask: {}[];
  notification: {}[];
}

export interface notify {
  message: string;
  Date: Date;
}

export interface Task {
  Title: string;
  priority: string;
  Des: string;
  TimeCreated: Date;
}
