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

/**
 * The LeftPanelProps interface represents the props that the LeftPanel component receives.
 */
interface LeftPanelProps {
  query: any;
  setQuery: any;
}

/**
 * The LeftPanel component displays the left panel of the library page.
 * @param {LeftPanelProps} props - The props to be passed to the LeftPanel component.
 * @returns {JSX.Element} The LeftPanel component.
 */
const LeftPanel = (props: LeftPanelProps) => {
  /**
   * The state of the articles dropdown based on the query.
   */
  const [articlesDropdown, areArticlesDropdowned] = useState<boolean>(
    props.query.get("nav") === "Articles"
  );

  /**
   * Updates the articles dropdown state based on the query.
   */
  useEffect(() => {
    if (props.query.get("nav") === "Articles") {
      areArticlesDropdowned(true);
      return;
    }
    areArticlesDropdowned(false);
  }, [props.query.get("nav")]);

  /**
   * The LeftPanel component.
   */
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
