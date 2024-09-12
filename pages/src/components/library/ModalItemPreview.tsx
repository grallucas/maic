import { Button, Chip, Divider } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import tempImage from "./assets/library/images/temp-image.jpg";
import favoriteImage from "./assets/library/images/favorite.png";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import React, { useRef, useEffect } from "react";
import { Favorite } from "@mui/icons-material";

/**
 * The ModalItemPreviewProps interface represents the props that the ModalItemPreview component receives.
 */
interface ModalItemPreviewProps {
  articleId?: string;
  showPreview: boolean;
  openPreview: (articleId: string) => boolean;
  hidePreview: () => void;
  setShowPreview: (showPreview: boolean) => void;
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
 * The ModalItemPreview component displays a preview of an item in the modal with the given article ID.
 * @param {ModalItemPreviewProps} props - The props to be passed to the ModalItemPreview component.
 * @returns {JSX.Element} The ModalItemPreview component.
 */
const ModalItemPreview = (props: ModalItemPreviewProps) => {
  /**
   * The states of the ModalItemPreview component, including the title, authors, abstract, reading time, page length, tags, and image of the article.
   * Also the liked state of the article.
   * Also the modal reference.
   */
  const [title, setTitle] = React.useState<string>(
    "No title defined for this article"
  );
  const [authors, setAuthors] = React.useState<string>(
    "No authors defined for this article"
  );
  const [abstract, setAbstract] = React.useState<string>(
    "No abstract defined for this article"
  );
  const [readingTime, setReadingTime] = React.useState<string>("0 minute read");
  const [pageLength, setPageLength] = React.useState<string>("0 pages");
  const [tags, setTags] = React.useState<JSX.Element | undefined>();
  const [img, setImg] = React.useState<string>(tempImage);
  const [liked, isLiked] = React.useState<boolean>(false);
  const location = useLocation();
  const [query, setQuery] = React.useState<URLSearchParams>(
    new URLSearchParams(location.search)
  );
  const [forceHide, setForceHide] = React.useState<boolean>(false);
  const modalRef = useRef<HTMLDivElement>(null);

  /**
   * Creates a tag from a string that links to a page referring to all pages containing that tag
   * @param {string[]} tags - The tags to create links for.
   * @returns {JSX.Element} The tags as Chips.
   */
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
              to={"/library?nav=Articles&type=" + tag.replace(" ", "_")}
              clickable
              onClick={() => props.hidePreview()}
            />
          );
        })}
      </div>
    );
  };

  /**
   * Fetches the image from the item with the same ID and updates the state.
   */
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

  /**
   * Fetches the title and authors from the item with the same ID and updates the state.
   */
  useEffect(() => {
    const div = document.getElementById(props.articleId || "") as HTMLElement;
    if (div) {
      try {
        const title = div.children[1] as HTMLElement;
        setTitle(title.innerText);
        const authors = div.children[2] as HTMLElement;
        setAuthors(authors.innerText);
      } catch (error) {
        const title = div.children[1].children[0] as HTMLElement;
        setTitle(title.innerText);
        const authors = div.children[1].children[1] as HTMLElement;
        setAuthors(authors.innerText);
      }
    }
  }, [props.articleId]);

  /**
   * Fetches the abstract, reading time, and page length from the server and updates the states.
   */
  useEffect(() => {
    const parts: string[] = window.location.href.split("/");
    let baseUrl: string = "";
    if (parts[2] === "127.0.0.1:3000" || parts[2] === "localhost:3000") {
      baseUrl = `${parts[0]}//127.0.0.1:8000`;
    } else {
      baseUrl = `${parts[0]}//${parts[2]}`;
    }
    if (props.articleId) {
      fetch(`${baseUrl}/api/v1/library/${props.articleId}/abstract`)
        .then((response: Response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.text();
        })
        .then((data: string) => {
          const json = JSON.parse(data)["response"];
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
          // pass
        });
    }
  }, [props.articleId]);

  /**
   * Fetches the tags from the server and updates the state.
   */
  useEffect(() => {
    const parts: string[] = window.location.href.split("/");
    let baseUrl: string = "";
    if (parts[2] === "127.0.0.1:3000" || parts[2] === "localhost:3000") {
      baseUrl = `${parts[0]}//127.0.0.1:8000`;
    } else {
      baseUrl = `${parts[0]}//${parts[2]}`;
    }
    if (props.articleId) {
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
          // pass
        });
    }
  }, [props.articleId]);

  /**
   * Handles the click outside of the modal to close the preview.
   */
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

  /**
   * Updates the liked state of the article.
   */
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

  useEffect(() => {
    setForceHide(query.get("article") !== null);
  }, [query])

  /**
   * The ModalItemPreview component.
   */
  return (
    <div
      ref={modalRef}
      className={`page-preview ${query.get("article") !== null ? "" : (props.showPreview ? "show-page-preview" : "")}`}
    >
      <div
        style={{
          padding: "1rem",
          display: "flex",
          flexDirection: "column",
          height: "auto",
          paddingBottom: "8rem"
        }}
      >
        <img
          src={img}
          alt="Preview"
          className="modal-item-preview-image"
          loading="lazy"
        />
        <div className="modal-item-preview-header">
          <h2>{title}</h2>
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
        <p className="page-description">{abstract}</p>
        <div className="bottom-elements">
          <Button
            variant="contained"
            sx={{ width: "100%" }}
            component={Link}
            to={`/library?nav=Articles&article=${props.articleId}`}
            onClick={() => props.hidePreview()}
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
