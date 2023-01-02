import reactLogo from "../assets/react.svg";
import "./App.css";
import { useEffect } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Counter } from "../features/Counter/Counter";
import { getHotPage } from "../api/getHotPage";

function App() {
  return (
    <Router>
      <div className="App">
        <div>
          <a href="https://vitejs.dev" target="_blank">
            <img src="/vite.svg" className="logo" alt="Vite logo" />
          </a>
          <a href="https://reactjs.org" target="_blank">
            <img src={reactLogo} className="logo react" alt="React logo" />
          </a>
        </div>
        <h1>Vite + React</h1>
        <div className="card">
          <Counter />
          <p>
            Edit <code>src/App.jsx</code> and save to test HMR
          </p>
        </div>
        <a
          href="https://www.reddit.com/api/v1/authorize?client_id=edxXr1WIfOdugyJ5pEJZBsSnqHz7-A&response_type=code&
    state=random&redirect_uri=effulgent-semolina-e038d2.netlify.app&duration=DURATION&scope=SCOPE_STRING"
        ></a>
        <p className="read-the-docs">
          Click on the Vite and React logos to learn more
        </p>
      </div>
    </Router>
  );
}

export default App;
