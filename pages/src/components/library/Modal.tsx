import "./assets/library/css/modal.css";
import { ButtonGroup, Card, CardContent } from "@mui/material";
import { useState, useEffect } from "react";

interface ModalProps {
  title: string;
  chip: JSX.Element | JSX.Element[];
  items: JSX.Element[];
}

const Modal = (props: ModalProps) => {
  const [width, setWidth] = useState(window.innerWidth);
  const [columns, setColumns] = useState<number>(6);

  useEffect(() => {
    // Define a function to update the width state
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    // Add event listener for resize
    window.addEventListener("resize", handleResize);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    setColumns(Math.round(window.innerWidth / 320));
  }, [width]);

  return (
    <Card className="modal">
      <CardContent>
        <div className="modal-top-bar">
          <h2 className="modal-header">{props.title}</h2>
          {props.chip}
        </div>
        <ButtonGroup
          variant="text"
          color="inherit"
          sx={{ width: "100%", marginTop: "1rem" }}
        >
          {props.items.slice(0, columns)}
        </ButtonGroup>
      </CardContent>
    </Card>
  );
};

export default Modal;
