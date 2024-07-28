import { useEffect, useState } from "react";
import Chip from "@mui/material/Chip";
import "./assets/library.css";
import LeftPanel from "./components/library/LeftPanel";
import Modal from "./components/library/Modal";
import ModalItem from "./components/library/ModalItem";
import { Link, useLocation } from "react-router-dom";
import { ArrowForward } from "@mui/icons-material";
import ModalItemPreview from "./components/library/ModalItemPreview";

const Library = () => {
  const rosieItems = [
    <ModalItem />,
    <ModalItem />,
    <ModalItem />,
    <ModalItem />,
    <ModalItem />,
    <ModalItem />,
  ];

  const location = useLocation();
  const [query, setQuery] = useState<URLSearchParams>(new URLSearchParams(location.search));
  const [category, setCategory] = useState<number>(1);
  useEffect(() => {
    setQuery(new URLSearchParams(location.search));
  }, [location.search])

  useEffect(() => {
    console.log(query);
  })

  return (
    <div className="App">
      <nav style={{ display: "flex" }}>
        <LeftPanel query={query} setQuery={setQuery} />
        <section className="modals" style={{maxWidth: "93.25vw"}}>
          {query.get("nav") === "Featured" && <div>
          <Modal
          title="ROSIE 2024 Finalists"
          chip={
            <Chip
              component={Link}
              color="primary"
              label="ROSIE 24'"
              to="/library?nav=Research&type=ROSIE-24"
              clickable
              deleteIcon={<ArrowForward/>}
              onDelete={() => {}}
            />
          }
          items={rosieItems}
        />
        <Modal
            title="Categories"
            chip={[
              <Chip
                variant={category === 1 ? "filled" : "outlined"}
                component={Link}
                color="primary"
                label="All"
                onClick={() => setCategory(1)}
                to="/library?nav=Featured"
                clickable
              />,
              <Chip
                variant={category === 2 ? "filled" : "outlined"}
                component={Link}
                color="primary"
                label="CNNs"
                onClick={() => setCategory(2)}
                to="/library?nav=Featured"
                clickable
              />,
              <Chip
                variant={category === 3 ? "filled" : "outlined"}
                component={Link}
                color="primary"
                label="Transformers"
                onClick={() => setCategory(3)}
                to="/library?nav=Featured"
                clickable
              />,
              <Chip
                variant={category === 4 ? "filled" : "outlined"}
                component={Link}
                color="primary"
                label="RL"
                onClick={() => setCategory(4)}
                to="/library?nav=Featured"
                clickable
              />,
              <Chip
                variant={category === 5 ? "filled" : "outlined"}
                component={Link}
                color="primary"
                label="Medical"
                onClick={() => setCategory(5)}
                to="/library?nav=Featured"
                clickable
              />,
              <Chip
                variant={category === 6 ? "filled" : "outlined"}
                component={Link}
                color="primary"
                label="Quantum"
                onClick={() => setCategory(6)}
                to="/library?nav=Featured"
                clickable
              />,
            ]}
            items={rosieItems}
          />
        </div>}
        </section>
        <ModalItemPreview/>
      </nav>
    </div>
  );
};

export default Library;
