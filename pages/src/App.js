import logo from "./logo.svg";
import "./App.css";
import Library from "./Library.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LearningTree from "./LearningTree.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/library" element={<Library />} />
        <Route path="/learning-tree" element={<LearningTree />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
