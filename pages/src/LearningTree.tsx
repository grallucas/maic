import logo from "./logo.png";
import Toolbar from "./components/learning-tree/Toolbar"
import Tree from "./components/learning-tree/Tree"
import NavBar from "./components/Navbar";

const LearningTree = () => {
  return (
    <div className="App">
      <NavBar page = 'LearningTree'/>
      <Tree />
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/LearningTree.js</code> and save to reload LearningTree.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
    </div>
  );
};

export default LearningTree;
