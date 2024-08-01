import logo from "./logo.png";
import Tree from "./components/learning-tree/Tree"
import NavBar from "./components/Navbar";

const LearningTree = () => {
  return (
    <div className="App">
      <NavBar page = 'LearningTree'/>
      <Tree/>
    </div>
  );
};

export default LearningTree;
