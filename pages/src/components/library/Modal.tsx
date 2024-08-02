import "./assets/library/css/modal.css";
import { ButtonGroup, Card, CardContent } from "@mui/material";
import { useState, useEffect } from "react";

/**
 * The ModalProps interface represents the props that the Modal component receives.
 */
interface ModalProps {
  title: string;
  chips: JSX.Element | JSX.Element[];
  items: JSX.Element[];
}

/**
 * The Modal component displays a modal with the given title, chips, and items.
 * @param {ModalProps} props - The props to be passed to the Modal component.
 * @returns {JSX.Element} The Modal component.
 */
const Modal = (props: ModalProps) => {
  /**
   * The states of the Modal component, including the width of the window and the number of columns for modal items.
   */
  const [width, setWidth] = useState(window.innerWidth);
  const [columns, setColumns] = useState<number>(6);

  /**
   * Updates the width state based on the window width.
   */
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

  /**
   * Updates the number of columns based on the window width.
   */
  useEffect(() => {
    setColumns(Math.round(window.innerWidth / 320));
  }, [width]);

  /**
   * The Modal component.
   */
  return (
    <Card className="modal">
      <CardContent>
        <div className="modal-top-bar">
          <h2 className="modal-header">{props.title}</h2>
          {props.chips}
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
