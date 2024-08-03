import "./assets/library/css/modal.css";
import { Box, ButtonGroup, Card, CardContent } from "@mui/material";
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
          sx={{ width: "100%", marginTop: "1rem", flexWrap: "wrap" }}
        >
          {props.items}
        </ButtonGroup>
      </CardContent>
    </Card>
  );
};

export default Modal;
