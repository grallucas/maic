import React from "react";
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
import { Link, useLocation } from "react-router-dom";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const LeftPanel = () => {
  const query = useQuery();
  const [nav, setNav] = useState<string | null>(query.get('nav'));
  const [articlesDropdown, areArticlesDropdowned] = useState<boolean>(query.get('nav') === "Articles");

  useEffect(() => {
    if(query.get('nav') === "Articles") {
      areArticlesDropdowned(true);
      return;
    }
    areArticlesDropdowned(false);
  },[nav])

  return (
    <div className="left-panel">
      <h1 className="header">
        <a href="/library">MAI Archive</a>
      </h1>
      <div className="navigation">
        <Button
          component={Link}
          to="/library?nav=Featured"
          startIcon={<EmojiEventsIcon />}
          onClick={() => {setNav("Featured")}}
        >
          Featured
        </Button>
        <Button
          component={Link}
          to="/library?nav=Research"
          startIcon={<ScienceIcon />}
          onClick={() => {setNav("Research")}}
        >
          Research
        </Button>
        <Button
          component={Link}
          to="/library?nav=Articles"
          startIcon={<DescriptionIcon />}
          onClick={() => {setNav("Articles")}}
        >
          Articles
        </Button>
        {
          articlesDropdown && 
          <div>
            <Button
              component={Link}
              to="/library?nav=Articles&type=ROSIE"
              onClick={() => {setNav("ROSIE")}}
            >
              ROSIE
            </Button>
            <Button
              component={Link}
              to="/library?nav=Articles&type=Workshops"
              onClick={() => {setNav("Workshops")}}
            >
              Workshops
            </Button>
            <Button
              component={Link}
              to="/library?nav=Articles&type=NLP"
              onClick={() => {setNav("NLP")}}
            >
              NLP
            </Button>
          </div>
        }
        <Button component={Link} to="/library?nav=Videos" startIcon={<Movie />} onClick={() => {setNav("Videos")}}>
          Videos
        </Button>
        <Button
          component={Link}
          to="/library?nav=Favorites"
          startIcon={<Favorite />}
          onClick={() => {setNav("Favorites")}}
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
          onClick={() => {setNav("Submit")}}
        >
          Submit
        </Button>
        <Button
          component={Link}
          to="/library?nav=Help"
          startIcon={<HelpIcon />}
          onClick={() => {setNav("Help")}}
        >
          Help
        </Button>
      </div>
    </div>
  );
};

export default LeftPanel;
