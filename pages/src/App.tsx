import "./App.css";
import Library from "./Library";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LearningTree from "./LearningTree";

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
