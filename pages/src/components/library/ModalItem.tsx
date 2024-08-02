import { Button } from "@mui/material";
import "./assets/library/css/modal.css";
import tempImage from "./assets/library/images/temp-image.jpg";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

/**
 * The ModalItemProps interface represents the props that the ModalItem component receives.
 */
interface ModalItemProps {
  articleId?: string;
  openPreview?: (articleId: string) => boolean;
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
 * The ModalItem component displays an item in the modal with the given article ID.
 * @param {ModalItemProps} props - The props to be passed to the ModalItem component.
 * @returns {JSX.Element} The ModalItem component.
 */
const ModalItem = (props: ModalItemProps) => {
  /**
   * The states of the ModalItem component, including the title, authors, and image of the article.
   * Also the navigate function to navigate to the article page.
   */
  const navigate = useNavigate();
  const [title, setTitle] = useState<string>(
    "No title defined for this article"
  );
  const [authors, setAuthors] = useState<string>(
    "No authors defined for this article"
  );
  const [img, setImg] = useState<string>(tempImage);

  /**
   * Fetches the image from the server and updates the image states.
   */
  useEffect(() => {
    if (props.articleId) {
      const parts: string[] = window.location.href.split("/");
      let baseUrl: string = "";
      if (parts[2] === "127.0.0.1:3000" || parts[2] === "localhost:3000") {
        baseUrl = `${parts[0]}//127.0.0.1:8000`;
      } else {
        baseUrl = `${parts[0]}//${parts[2]}`;
      }
      const fetchImage = async () => {
        try {
          const response = await fetch(
            `${baseUrl}/api/v1/library/${props.articleId}/image`
          );
          const blob = await response.blob();
          const imageUrl = URL.createObjectURL(blob);
          checkImage(imageUrl, function (exists: boolean) {
            if (exists) {
              setImg(imageUrl);
            }
          });
        } catch (error) {
          // pass
        }
      };
      fetchImage();
    }
  }, [props.articleId]);

  /**
   * Fetches the title and authors from the server and updates the title and authors states.
   */
  useEffect(() => {
    const parts: string[] = window.location.href.split("/");
    let baseUrl: string = "";
    if (parts[2] === "127.0.0.1:3000" || parts[2] === "localhost:3000") {
      baseUrl = `${parts[0]}//127.0.0.1:8000`;
    } else {
      baseUrl = `${parts[0]}//${parts[2]}`;
    }
    fetch(`${baseUrl}/api/v1/library/${props.articleId}/title-and-authors`)
      .then((response: Response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.text();
      })
      .then((data: string) => {
        const json = JSON.parse(data)["response"];
        setTitle(json["title"]);
        setAuthors(json["authors"]);
      })
      .catch((error: Error) => {
        // pass
      });
  }, [props.articleId]);

  function handleRedict() {
    if (props.openPreview && props.articleId) {
      if (props.openPreview(props.articleId)) {
        navigate(`/library?nav=Articles&article=${props.articleId}`);
      }
    }
  }

  /**
   * The ModalItem component.
   */
  return (
    <Button sx={{ width: "100%" }} onClick={() => handleRedict()}>
      <div style={{ padding: "1rem" }} id={props.articleId}>
        <img
          src={img}
          alt="Preview"
          style={{ width: "90%", maxHeight: "25vh", maxWidth: "20vh" }}
          className={props.articleId}
        ></img>
        <h3 className="modal-item-header">{title}</h3>
        <p className="authors">{authors}</p>
      </div>
    </Button>
  );
};

export default ModalItem;
