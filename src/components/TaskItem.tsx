import { Trash } from "phosphor-react";

import { TaskItemModel } from "../models/TaskItemModel";

import style from "./TaskItem.module.css";

export function TaskItem({
  task,
  onCheckUncheckTask,
  onDeleteTask,
}: TaskItemModel) {
  function taskCheckUncheck() {
    onCheckUncheckTask(task.id);
  }

  function deleteTask() {
    onDeleteTask(task.id);
  }

  return (
    <div className={style.taskItem} key={task.id}>
      <label className={task.isCompleted ? style.throughText : ""}>
        <input
          type="checkbox"
          defaultChecked={task.isCompleted}
          onChange={taskCheckUncheck}
        />
        {task.content}
      </label>
      <button onClick={deleteTask}>
        <Trash size={24} />
      </button>
    </div>
  );
}
