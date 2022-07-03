import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const [inProgress, setInProgress] = useState<boolean>();
  const [data, setData] = useState<any[]>();

  useEffect(() => {
    const requestData = async () => {
      setInProgress(true);
      const data = await fetch("http://localhost:3000/payments/load_csv");
      setInProgress(true);

      setData(await data.json());
    };

    requestData();
  }, []);

  console.log(data);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
