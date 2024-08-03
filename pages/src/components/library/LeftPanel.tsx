import { useState, useEffect } from "react";
import { Button, Divider } from "@mui/material";
import "./assets/library/css/left-panel.css";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import ScienceIcon from "@mui/icons-material/Science";
import DescriptionIcon from "@mui/icons-material/Description";
import Movie from "@mui/icons-material/Movie";
import Favorite from "@mui/icons-material/Favorite";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import HelpIcon from "@mui/icons-material/Help";
import { Link } from "react-router-dom";

interface LeftPanelProps {
  query: any;
  setQuery: any;
}

const LeftPanel = (props: LeftPanelProps) => {
  const [articlesDropdown, areArticlesDropdowned] = useState<boolean>(
    props.query.get("nav") === "Articles"
  );

  useEffect(() => {
    if (props.query.get("nav") === "Articles") {
      areArticlesDropdowned(true);
      return;
    }
    areArticlesDropdowned(false);
  }, [props.query.get("nav")]);

  return (
    <div className="left-panel">
      <h1 className="header">
        <a href="/library">MArXiv</a>
      </h1>
      <div className="navigation">
        <Button
          component={Link}
          to="/library?nav=Featured"
          startIcon={<EmojiEventsIcon />}
        >
          Featured
        </Button>
        <Button
          component={Link}
          to="/library?nav=Research"
          startIcon={<ScienceIcon />}
        >
          Research
        </Button>
        <Button
          component={Link}
          to="/library?nav=Articles"
          startIcon={<DescriptionIcon />}
        >
          Articles
        </Button>
        {articlesDropdown && (
          <div>
            <Button component={Link} to="/library?nav=Articles&type=ROSIE">
              ROSIE
            </Button>
            <Button component={Link} to="/library?nav=Articles&type=Workshops">
              Workshops
            </Button>
            <Button component={Link} to="/library?nav=Articles&type=NLP">
              NLP
            </Button>
          </div>
        )}
        <Button component={Link} to="/library?nav=Videos" startIcon={<Movie />}>
          Videos
        </Button>
        <Button
          component={Link}
          to="/library?nav=Favorites"
          startIcon={<Favorite />}
        >
          Favorites
        </Button>
        <Divider
          sx={{ borderColor: "white", margin: "1rem 1rem" }}
          aria-hidden="true"
        />
        <Button
          component={Link}
          to="/library?nav=Submit"
          startIcon={<NoteAddIcon />}
        >
          Submit
        </Button>
        <Button
          component={Link}
          to="/library?nav=Help"
          startIcon={<HelpIcon />}
        >
          Help
        </Button>
      </div>
    </div>
  );
};

export default LeftPanel;
