import { Button, Chip, Divider } from "@mui/material";
import { Link } from "react-router-dom";
import tempImage from "./assets/library/images/temp-image.jpg";
import favoriteImage from "./assets/library/images/favorite.png";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import React from "react";
import { Favorite } from "@mui/icons-material";

interface ModalItemPreviewProps {
  articleId?: string;
  openPreview: (articleId: string) => boolean;
  hidePreview: () => void;
}

const ModalItemPreview = (props: ModalItemPreviewProps) => {
  const [liked, isLiked] = React.useState<boolean>(false);

  /* Creates a tag from a string that links to a page referring to all pages containing that tag*/
  const createTag = (tags: string[]) => {
    return (
      <div className={"page-tags"}>
        {tags.map((tag: string) => {
          return (
            <Chip
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

  React.useEffect(() => {
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
      className={`page-preview ${props.articleId ? "show-page-preview" : ""}`}
    >
      <div style={{ padding: "1rem" }}>
        <img
          src={tempImage}
          alt="Preview"
          className="modal-item-preview-image"
        />
        <div className="modal-item-preview-header">
          <h2>
            Demo Article - A Fantastic Search into the World of Web Development
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

        <p className="authors">Haile A., Paulson B., et al.</p>
        <div className="page-reading-information">
          <p className="page-length">9 Pages</p>
          <Divider orientation="vertical" flexItem />
          <p className="page-time">15 Minute Read</p>
        </div>
        <p className="page-description">
          Lorem ipsum odor amet, consectetuer adipiscing elit. Quis augue non
          non malesuada aptent leo dolor. Feugiat in quam torquent, ultrices
          taciti montes. Eu class ullamcorper aenean eleifend donec. Lobortis
          pretium curabitur elit; faucibus finibus rhoncus vehicula. Amet sit
          lobortis iaculis amet, orci condimentum netus. Luctus ipsum nibh
          convallis tristique per diam torquent. Lacus in dis ut adipiscing
          suspendisse cras aliquet. Neque praesent rhoncus ullamcorper mattis
          sapien etiam vehicula sapien ultrices. Enim netus ornare phasellus
          cras nunc ridiculus massa. Habitant mauris duis, elit dapibus ad lorem
          ornare augue. Neque quis aenean condimentum a odio cubilia magnis
          dictum condimentum. Imperdiet felis luctus montes euismod duis
          elementum. Turpis integer ut sit non imperdiet molestie augue duis.
          Dignissim consequat molestie aliquam curae; amet gravida convallis
          pulvinar? Fames himenaeos vestibulum ullamcorper dolor tempus.
        </p>
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
        {createTag(["VQ-VAE", "Time Series", "Seq2Seq", "MICS"])}
      </div>
    </div>
  );
};

export default ModalItemPreview;
