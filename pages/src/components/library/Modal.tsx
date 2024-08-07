import "./assets/library/css/modal.css";
import { Box, ButtonGroup, Card, CardContent } from "@mui/material";
import { useState, useEffect, useRef } from "react";
import StarIcon from "@mui/icons-material/Star";

/**
 * The ModalProps interface represents the props that the Modal component receives.
 */
interface ModalProps {
  title: string;
  chips: JSX.Element | JSX.Element[];
  items: JSX.Element[];
  decorative?: boolean;
}

/**
 * The Modal component displays a modal with the given title, chips, and items.
 * @param {ModalProps} props - The props to be passed to the Modal component.
 * @returns {JSX.Element} The Modal component.
 */
const Modal = (props: ModalProps) => {
  /**
   * Refs and states for style sparkles
   */
  const headerRef = useRef(null);
  const [headerSize, setHeaderSize] = useState({ width: 0, height: 0 });

  /**
   * Update header dims
   */
  useEffect(() => {
    if (headerRef.current) {
      const { offsetWidth, offsetHeight } = headerRef.current;
      setHeaderSize({ width: offsetWidth, height: offsetHeight });
    }
  }, [props.title]);

  /**
   * The Modal component.
   */
  return (
    <Card className="modal">
      <CardContent>
        <div className="modal-top-bar">
          <div style={{ display: "flex", justifyContent: "left" }}>
            <h2 className="modal-header" ref={headerRef}>
              {props.title}
            </h2>
            {props.decorative ? (
              <div
                style={{
                  position: "absolute",
                  width: `${headerSize.width}px`,
                  height: `${headerSize.height}px`,
                }}
              >
                <span className="sparkle">
                  <StarIcon sx={{ fill: "#e1c11e" }} />
                </span>
                <span className="sparkle">
                  <StarIcon sx={{ fill: "#e1c11e" }} />
                </span>
                <span className="sparkle">
                  <StarIcon sx={{ fill: "#e1c11e" }} />
                </span>
                <span className="sparkle">
                  <StarIcon sx={{ fill: "#e1c11e" }} />
                </span>
              </div>
            ) : (
              ""
            )}
          </div>
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
