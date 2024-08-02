import { Button, Chip, Divider } from "@mui/material";
import { Link } from "react-router-dom";
import tempImage from "./assets/library/images/temp-image.jpg";
import favoriteImage from "./assets/library/images/favorite.png";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import React, { useRef, useEffect } from "react";
import { Favorite } from "@mui/icons-material";

interface ModalItemPreviewProps {
  articleId?: string;
  showPreview: boolean;
  openPreview: (articleId: string) => boolean;
  hidePreview: () => void;
  setShowPreview: (showPreview: boolean) => void;
}

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

const ModalItemPreview = (props: ModalItemPreviewProps) => {
  const [title, setTitle] = React.useState<string>("No title defined for this article");
  const [authors, setAuthors] = React.useState<string>("No authors defined for this article");
  const [abstract, setAbstract] = React.useState<string>("No abstract defined for this article");
  const [readingTime, setReadingTime] = React.useState<string>("0 minute read");
  const [pageLength, setPageLength] = React.useState<string>("0 pages");
  const [tags, setTags] = React.useState<JSX.Element | undefined>();
  const [img, setImg] = React.useState<string>(tempImage);
  const [liked, isLiked] = React.useState<boolean>(false);
  const modalRef = useRef<HTMLDivElement>(null);

  /* Creates a tag from a string that links to a page referring to all pages containing that tag */
  const createTag = (tags: string[]) => {
    return (
      <div className={"page-tags"}>
        {tags.map((tag: string, index) => {
          return (
            <Chip
              key={index}
              component={Link}
              color="primary"
              label={tag}
              to={"/library?nav=Articles&tags=" + tag.replace(" ", "_")}
              clickable
              onClick={() => props.hidePreview()}
            />
          );
        })}
      </div>
    );
  };

  useEffect(() => {
    const div = document.getElementById(props.articleId || "") as HTMLElement;
    if (div) {
      const img = div.children[0] as HTMLImageElement;
      checkImage(img.src, function (exists: boolean) {
        if (exists) {
          setImg(img.src);
        }
      });
    }
  }, [props.articleId]);

  useEffect(() => {
    const div = document.getElementById(props.articleId || "") as HTMLElement;
    if (div) {
      const title = div.children[1] as HTMLElement;
      setTitle(title.innerText);
      const authors = div.children[2] as HTMLElement;
      setAuthors(authors.innerText);
    }
  }, [props.articleId]);

  useEffect(() => {
    const parts: string[] = window.location.href.split("/");
    let baseUrl: string = "";
    if (parts[2] === "127.0.0.1:3000" || parts[2] === "localhost:3000") {
      baseUrl = `${parts[0]}//127.0.0.1:8000`;
    } else {
      baseUrl = `${parts[0]}//${parts[2]}`;
    }
    fetch(`${baseUrl}/api/v1/library/${props.articleId}/abstract`)
      .then((response: Response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.text();
      })
      .then((data: string) => {
        const json = JSON.parse(data)["response"]
        setAbstract(json["abstract"]);
        setReadingTime(`${json["reading_time"]} minute read`);
        const pageLength = Number.parseInt(json["pages"]);
        if (pageLength === 1) {
          setPageLength("1 page");
        } else {
          setPageLength(`${pageLength} pages`);
        }
      })
      .catch((error: Error) => {
        console.error("Error fetching file:", error);
      });
  }, [props.articleId]);

  useEffect(() => {
    const parts: string[] = window.location.href.split("/");
    let baseUrl: string = "";
    if (parts[2] === "127.0.0.1:3000" || parts[2] === "localhost:3000") {
      baseUrl = `${parts[0]}//127.0.0.1:8000`;
    } else {
      baseUrl = `${parts[0]}//${parts[2]}`;
    }
    fetch(`${baseUrl}/api/v1/library/${props.articleId}/tags`)
      .then((response: Response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.text();
      })
      .then((data: string) => {
        const json = JSON.parse(data)["response"];
        setTags(createTag(json));
      })
      .catch((error: Error) => {
        console.error("Error fetching file:", error);
      });
  }, [props.articleId]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      setTimeout(() => {
        if (
          modalRef.current &&
          !modalRef.current.contains(event.target as Node) &&
          props.articleId
        ) {
          props.setShowPreview(false);
        }
      }, 10);
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [props.articleId]);

  useEffect(() => {
    const favorite = document.querySelector(".favorite") as HTMLElement;
    if (favorite) {
      if (liked) {
        favorite.style.color = "red";
        favorite.style.scale = "1.1";
        setTimeout(() => {
          favorite.classList.add("transition");
        }, 1);
      } else {
        favorite.style.color = "white";
      }
    }
  }, [liked]);

  return (
    <div
      ref={modalRef}
      className={`page-preview ${props.showPreview ? "show-page-preview" : ""}`}
    >
      <div style={{ padding: "1rem", display: "flex", flexDirection: "column", height: "89%"}}>
        <img
          src={img}
          alt="Preview"
          className="modal-item-preview-image"
        />
        <div className="modal-item-preview-header">
          <h2>
            {title}
          </h2>
          <Button
            startIcon={
              liked ? (
                <Favorite
                  className="favorite"
                  sx={{ width: "100%", height: "100%" }}
                  color="inherit"
                />
              ) : (
                <FavoriteBorderIcon
                  className="favorite"
                  sx={{ width: "100%", height: "100%" }}
                  color="inherit"
                />
              )
            }
            className="like-button"
            onClick={() => isLiked(!liked)}
          />
        </div>

        <p className="authors">{authors}</p>
        <div className="page-reading-information">
          <p className="page-length">{pageLength}</p>
          <Divider orientation="vertical" flexItem />
          <p className="page-time">{readingTime}</p>
        </div>
        <p className="page-description">
          {abstract}
        </p>
        <div className="bottom-elements">
          <Button
            variant="contained"
            sx={{ width: "100%" }}
            component={Link}
            to={`/library?nav=Articles&article=${props.articleId}`}
            onClick={() =>
              props.articleId ? props.openPreview(props.articleId) : {}
            }
          >
            <div className="read-now-button">
              Read Now
              <AutoStoriesIcon />
            </div>
          </Button>
          {tags}
        </div>
      </div>
    </div>
  );
};

export default ModalItemPreview;
