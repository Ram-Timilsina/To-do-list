import React, { useState, useEffect } from "react";
import "./App.css";

const App = () => {
  const [work, setWork] = useState("");

  const [final, setFinal] = useState(() => {
    const storedTasks = localStorage.getItem("todo");
    return storedTasks ? JSON.parse(storedTasks) : [];
  });

  const [validationMessage, setValidationMessage] = useState("");

  useEffect(() => {
    localStorage.setItem("todo", JSON.stringify(final));
  }, [final]);

  const inputHandler = (e) => {
    setWork(e.target.value);
    setValidationMessage("");
  };

  const clickHandle = () => {
    if (work.trim() === "") {
      setValidationMessage("Please enter a task");
      return;
    }

    setFinal([...final, { work: work, completed: false, id: Date.now() }]);
    debugger;
    setWork("");
    setValidationMessage("");
  };

  const deleteTask = (id) => {
    const updatedTasks = final.filter((item, i) => {
      debugger;
      return item.id !== id;
    });
    setFinal(updatedTasks);
  };

  const crossTask = (id) => {
    const updatedTasks = final.map((task, i) => {
      debugger;
      return task.id === id ? { ...task, completed: !task.completed } : task;
    });
    setFinal(updatedTasks);
  };

  return (
    <div className="wrapper">
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
                      <td>{eachFinal.id}</td>
                      <td className={eachFinal.completed ? "crossed" : ""}>
                        {eachFinal.work}
                      </td>
                      <td>
                        <button onClick={() => crossTask(eachFinal.id)}>
                          Completed
                        </button>
                      </td>
                      <td>
                        <button onClick={() => deleteTask(eachFinal.id)}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
