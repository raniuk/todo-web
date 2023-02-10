import { TaskModel } from "./TaskModel";

export interface TaskItemModel {
  task: TaskModel;
  onCheckUncheckTask: (id: string) => void;
  onDeleteTask: (id: string) => void;
}
