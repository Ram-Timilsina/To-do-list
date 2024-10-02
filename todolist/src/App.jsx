import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [work, setWork] = useState("");
  const [final, setFinal] = useState([]);
  const [validationMessage, setValidationMessage] = useState("");

  const inputHandler = (e) => {
    setWork(e.target.value);
    setValidationMessage("");
  };

  const clickHandle = () => {
    if (work.trim() === "") {
      setValidationMessage("Please enter a task");
      return;
    }

    setFinal([...final, { work, completed: false }]);
    setWork("");
    setValidationMessage("");
  };

  const deleteTask = (index) => {
    const updatedTasks = final.filter((_, i) => i !== index);
    setFinal(updatedTasks);
  };

  const crossTask = (index) => {
    const updatedTasks = final.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setFinal(updatedTasks);
  };

  return (
    <>
      <div className="main">
        <div className="input-container">
          <label>Task</label>
          <input
            type="text"
            onChange={inputHandler}
            value={work}
            placeholder="Enter your task to do"
          />
          <span id="validation" style={{ color: "red" }}>
            {validationMessage}
          </span>
          <button onClick={clickHandle}>Submit</button>
        </div>
        <div className="table">
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Task to do</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {final.length !== 0 &&
                final.map((eachFinal, i) => (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td className={eachFinal.completed ? "crossed" : ""}>
                      {eachFinal.work}
                    </td>
                    <td>
                      <button onClick={() => crossTask(i)}>Cross</button>
                    </td>
                    <td>
                      <button onClick={() => deleteTask(i)}>Delete</button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default App;
