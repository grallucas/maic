import logo from "./logo.png";
import Tree from "./components/learning-tree/Tree"
import NavBar from "./components/Navbar";
import {useSearchParams } from "react-router-dom";


const LearningTree = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  return (
    <div className="App">
      <NavBar page = 'LearningTree'/>
      <Tree nodeID = {searchParams.get("node")}/>
    </div>
  );
};

export default LearningTree;