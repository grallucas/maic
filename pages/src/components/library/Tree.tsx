import { ReactFlow, Background, Controls } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import "./assets/library/css/tree.css";

interface TreeProps {

}

const Tree = (props: TreeProps) => {
    return (
        <div className = 'tree'>
                <ReactFlow>
                    <Background />
                    <Controls />
                </ReactFlow>
        </div>
    );
};

export default Tree;