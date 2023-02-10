import { Header } from "./components/Header";
import { Task } from "./components/Task";

import style from "./App.module.css";
import "./global.css";

function App() {
  return (
    <div>
      <Header />
      <div className={style.wrapper}>
        <Task />
        <div className={style.task}></div>
      </div>
    </div>
  );
}

export default App;
