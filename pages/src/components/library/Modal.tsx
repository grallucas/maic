import "./assets/library/css/modal.css";
import { Box, ButtonGroup, Card, CardContent, Skeleton } from "@mui/material";
import { useState, useEffect, useRef } from "react";
import StarIcon from "@mui/icons-material/Star";
import Markdown from "react-markdown";
import { useLocation } from "react-router-dom";

/**
 * The ModalProps interface represents the props that the Modal component receives.
 */
interface ModalProps {
  title: string;
  chips: JSX.Element | JSX.Element[];
  items: JSX.Element[];
  type?: string;
  img?: string;
  date?: string;
  description?: string;
  authors?: string;
}

/**
 * Checks if an image exists at the given URL.
 * @param {string} url - The URL of the image to check.
 * @param {void} callback - The callback function to execute after checking the image.
 */
function checkImage(url: string, callback: (exists: boolean) => void): void {
  const img = new Image();

  img.onload = function () {
    callback(true);
  };

  img.onerror = function () {
    callback(false);
  };

  img.src = url;
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
  const [img, setImg] = useState<any>(
    <Skeleton variant="rectangular" width={"19vh"} height={"19vh"} />
  );
  const [authors, setAuthors] = useState<string>("Members: ");
  const location = useLocation();
  const [query, setQuery] = useState<URLSearchParams>(
    new URLSearchParams(location.search)
  );
  const [typeCheck, setTypeCheck] = useState<string>("initial");

  useEffect(() => {
    window.addEventListener("load", function () {
      const hash = window.location.hash;
      if (hash) {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }
    });
  }, []);

  useEffect(() => {
    setImg(`https://maic-fastapi-lambda.s3.amazonaws.com/${props.img?.replace("./", "")}`);
  }, [props.img])

  /**
   * Update header dims
   */
  useEffect(() => {
    if (headerRef.current) {
      const { offsetWidth, offsetHeight } = headerRef.current;
      setHeaderSize({ width: offsetWidth, height: offsetHeight });
    }
  }, [props.title]);


  useEffect(() => {
    if (props.authors && props.authors.split(",").length <= 1) {
      setAuthors("Team Lead: ");
    }
  }, [props.authors]);

  useEffect(() => {
    if (props.type === "normal") {
      if (new URLSearchParams(location.search).get("type") !== null) {
        if (new URLSearchParams(location.search).get("type")?.toLowerCase().replaceAll(" ", "-") !== props.title.toLowerCase().replaceAll(" ", "-")) {
        setTypeCheck("none");
        } else {
        setTypeCheck("initial");
        }
      } else {
        setTypeCheck("initial");
      }
      } else {
      setTypeCheck("initial");
    }
  }, [props.type, props.title, typeCheck, setTypeCheck]);

  // useEffect(() => {
  //   const handleClick = () => {
  //     console.log("Page was clicked");
  //     // Add any additional logic you want to run on click
  //   };

  //   document.addEventListener("click", handleClick);

  //   return () => {
  //     document.removeEventListener("click", handleClick);
  //   };
  // }, []);

  /**
   * The Modal component.
   */
  return (
    <Card className="modal" id={props.title.toLowerCase().replaceAll(" ", "-")} sx={{display: typeCheck}}>
      <CardContent>
        <div className="modal-top-bar">
          <div style={{ display: "flex", justifyContent: "left" }}>
            <h2 className="modal-header" ref={headerRef}>
              {props.title}
            </h2>
            {props.type === "decorative" ? (
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
        {props.type !== "descriptive" ? (
          <ButtonGroup
            variant="text"
            color="inherit"
            sx={{
              width: "100%",
              marginTop: "1rem",
              flexWrap: "wrap",
            }}
          >
            {props.items}
          </ButtonGroup>
        ) : (
          <div>
            <div
              className="descriptive-text"
              style={{ display: "flex", gap: "0.5rem", marginTop: "1rem" }}
            >
              {typeof img === "string" ? (
                <img src={img} alt={img} style={{ maxHeight: "20vh", borderRadius: "1rem" }}></img>
              ) : (
                img
              )}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  textAlign: "left",
                }}
              >
                <p style={{ fontWeight: "bold" }}>{props.date}</p>
                <Markdown>{props.description}</Markdown>
                <p style={{ fontWeight: "bold", color: "#0578ff" }}>
                  {authors}
                  {props.authors}
                </p>
              </div>
              <ButtonGroup
                  variant="text"
                  color="inherit"
                  sx={{
                    marginTop: "0rem",
                    flexWrap: "wrap",
                    display: props.items.length > 0 ? "block" : "none",
                  }}
                  id={props.type}
                >
                  {props.items}
                </ButtonGroup>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default Modal;
