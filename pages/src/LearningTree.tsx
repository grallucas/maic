import logo from "./logo.png";
import Toolbar from "./components/library/Toolbar"
import Tree from "./components/library/Tree"

const LearningTree = () => {
  return (
    <div className="App">
      <Toolbar/>
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
