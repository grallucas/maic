import { useEffect, useState } from "react";
import Chip from "@mui/material/Chip";
import "./assets/library.css";
import LeftPanel from "./components/library/LeftPanel";
import Modal from "./components/library/Modal";
import ModalItem from "./components/library/ModalItem";

const Library = () => {
  const rosieItems = [
    <ModalItem />,
    <ModalItem />,
    <ModalItem />,
    <ModalItem />,
    <ModalItem />,
    <ModalItem />,
  ];

  const [category, setCategory] = useState<number>(1);

  return (
    <div className="App">
      <nav style={{ display: "flex" }}>
        <LeftPanel />
        <section
          style={{
            display: "flex",
            flexDirection: "column",
            padding: "2rem",
            width: "100%",
            gap: "1rem",
          }}
        >
          <Modal
            title="ROSIE 2024 Finalists"
            chip={
              <Chip
                component="a"
                color="primary"
                label="ROSIE 24'"
                href="/library?nav=Research&type=ROSIE-24"
                clickable
              />
            }
            items={rosieItems}
          />
          <Modal
            title="Categories"
            chip={[
              <Chip
                variant={category === 1 ? "filled" : "outlined"}
                component="a"
                color="primary"
                label="All"
                onClick={() => setCategory(1)}
                clickable
              />,
              <Chip
                variant={category === 2 ? "filled" : "outlined"}
                component="a"
                color="primary"
                label="CNNs"
                onClick={() => setCategory(2)}
                clickable
              />,
              <Chip
                variant={category === 3 ? "filled" : "outlined"}
                component="a"
                color="primary"
                label="Transformers"
                onClick={() => setCategory(3)}
                clickable
              />,
              <Chip
                variant={category === 4 ? "filled" : "outlined"}
                component="a"
                color="primary"
                label="RL"
                onClick={() => setCategory(4)}
                clickable
              />,
              <Chip
                variant={category === 5 ? "filled" : "outlined"}
                component="a"
                color="primary"
                label="Medical"
                onClick={() => setCategory(5)}
                clickable
              />,
              <Chip
                variant={category === 6 ? "filled" : "outlined"}
                component="a"
                color="primary"
                label="Quantum"
                onClick={() => setCategory(6)}
                clickable
              />,
            ]}
            items={rosieItems}
          />
        </section>
      </nav>
    </div>
  );
};

export default Library;
