import logo from './logo.svg';
import './App.css';
import Library from "./Library.js";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import LearningTree from "./LearningTree";

function App() {
  return (
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<Library/>}/>
            <Route path="/LearningTree" element={<LearningTree/>}/>
        </Routes>
      </BrowserRouter>
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
  );
}

export default App;
