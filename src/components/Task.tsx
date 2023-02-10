import { ChangeEvent, FormEvent, useState } from "react";

import { ClipboardText, Key, PlusCircle, Trash } from "phosphor-react";
import uuid from "react-uuid";

import { TaskModel } from "../models/TaskModel";

import style from "./Task.module.css";
import { TaskItem } from "./TaskItem";

export function Task() {
  const taskEmpty: TaskModel = {
    id: "",
    content: "",
    isCompleted: false,
  };

  const myTasks = Array<TaskModel>;

  const [tasks, setTasks] = useState(myTasks);

  const [newTask, setNewTask] = useState(taskEmpty);

  const [taskCompleted, setTaskCompleted] = useState(0);

  const taskCount = tasks.length;

  function createNewTask(event: FormEvent) {
    event.preventDefault();

    setTasks([...tasks, newTask]);
    setNewTask(taskEmpty);
  }

  function newTaskChange(event: ChangeEvent<HTMLInputElement>) {
    let task: TaskModel = {
      id: uuid(),
      content: event.target.value,
      isCompleted: false,
    };
    setNewTask(task);
  }

  function checkUncheckTask(id: string) {
    const newTasks = tasks.map((task) => {
      if (task.id === id) {
        return { ...task, isCompleted: !task.isCompleted };
      }

      return task;
    });

    countTaskCompleted(newTasks);

    setTasks(newTasks);
  }

  function deleteTask(id: string) {
    const tasksWithoutDelete = tasks.filter((task) => task.id !== id);

    countTaskCompleted(tasksWithoutDelete);

    setTasks(tasksWithoutDelete);
  }

  function countTaskCompleted(tasks: Array<TaskModel>) {
    const sumTaskCompleted = tasks
      .filter((task) => task.isCompleted)
      .reduce((sum, _) => (sum += 1), 0);

    setTaskCompleted(sumTaskCompleted);
  }

  return (
    <div className={style.task}>
      <form onSubmit={createNewTask} className={style.taskForm}>
        <input
          type="text"
          value={newTask.content}
          onChange={newTaskChange}
          placeholder="type new task"
          required
        />
        <button>
          Add
          <PlusCircle size={24} />
        </button>
      </form>
      <header>
        <div className={style.taskCreated}>
          <strong>Tasks created</strong>
          <span>{taskCount}</span>
        </div>
        <div className={style.taskCompleted}>
          <strong>Completed</strong>
          <span>
            {taskCompleted} of {taskCount}
          </span>
        </div>
      </header>
      {taskCount > 0 ? (
        <div className={style.taskList}>
          {tasks.map((task) => {
            return (
              <TaskItem
                task={task}
                onCheckUncheckTask={checkUncheckTask}
                onDeleteTask={deleteTask}
                key={task.id}
              />
            );
          })}
        </div>
      ) : (
        <div className={style.taskEmpty}>
          <ClipboardText size={48} />
          <strong>You don't have tasks registered yet</strong>
          <span>Create tasks and organize your to-do items</span>
        </div>
      )}
    </div>
  );
}
