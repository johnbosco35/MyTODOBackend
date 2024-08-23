import { Router } from "express";
import {
  AssignTask,
  CreateTask,
  DeleteTask,
  UpdateTask,
} from "../Controller/TaskController";

const router = Router();

router.route("/createTask/:id").post(CreateTask);
router.route("/updateTask").patch(UpdateTask);
router.route("/deleteTask").delete(DeleteTask);
router.route("/assignTask/:taskID/:senderID").patch(AssignTask);

export default router;
