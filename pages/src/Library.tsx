import { useEffect, useState } from "react";
import Chip from "@mui/material/Chip";
import "./assets/library.css";
import LeftPanel from "./components/library/LeftPanel";
import Modal from "./components/library/Modal";
import ModalItem from "./components/library/ModalItem";
import { Link, useLocation } from "react-router-dom";
import { ArrowForward } from "@mui/icons-material";
import ModalItemPreview from "./components/library/ModalItemPreview";
import Article from "./components/library/Article";
import NavBar from "./components/Navbar";

/**
 * The Modal interface to represent the modal object.
 */
interface Modal {
  title: string;
  tags: string[];
  content_ids: string[];
}

/**
 * The Library component displays the library page of the website.
 * @returns {JSX.Element} The Library component.
 */
const Library = () => {
  /**
   * The states of the Library component, including the current article, previewed article, and whether to show the preview.
   */
  const [currentArticle, setCurrentArticle] = useState("");
  const [previewedArticle, setPreviewedArticle] = useState<string>("");
  const [showPreview, setShowPreview] = useState<boolean>(false);

  /**
   * Opens the preview of the article with the given article ID.
   * @param {string} articleId - The article ID to open the preview for.
   * @returns {boolean} Whether the preview is open.
   */
  function openPreview(articleId: string): boolean {
    let returnValue = false;

    setPreviewedArticle((prevArticleId) => {
      if (prevArticleId === articleId) {
        returnValue = true;
        setShowPreview(false);
        return "";
      }
      returnValue = false;
      setShowPreview(true);
      return articleId;
    });

    return returnValue;
  }

  /**
   * Hides the preview of the article.
   */
  function hidePreview() {
    setShowPreview(false);
  }

  /**
   * The location of the current page.
   * The query parameters of the current page.
   * The category of the current page.
   * The modals to display on the page.
   */
  const location = useLocation();
  const [query, setQuery] = useState<URLSearchParams>(
    new URLSearchParams(location.search)
  );
  const [category, setCategory] = useState<number>(1);
  const [modals, setModals] = useState<any[] | undefined>(undefined);

  /**
   * Gets the current query parameters from the URL.
   */
  useEffect(() => {
    setQuery(new URLSearchParams(location.search));
  }, [location.search]);

  /**
   * Sets the current article based on the query parameters.
   */
  useEffect(() => {
    setCurrentArticle(query.get("article") ?? "");
  }, [query]);

  /**
   * Fetches the modals from the server and updates the modals state.
   */
  useEffect(() => {
    const parts: string[] = window.location.href.split("/");
    let baseUrl: string = "";
    if (parts[2] === "127.0.0.1:3000" || parts[2] === "localhost:3000") {
      baseUrl = `${parts[0]}//127.0.0.1:8000`;
    } else {
      baseUrl = `${parts[0]}//${parts[2]}`;
    }
    fetch(`${baseUrl}/api/v1/library/modals`)
      .then((response: Response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.text();
      })
      .then((data: string) => {
        const json = JSON.parse(data)["response"];
        let modals: any[] = [];
        Object.keys(json).forEach((key, index) => {
          const modal: Modal = json[key];
          const chips = modal.tags.map((tag, index) => (
            <Chip
              key={index}
              component={Link}
              color="primary"
              label={tag}
              to={`/library?nav=Research&type=${tag
                .replace(" ", "-")
                .replace("'", "")}`}
              clickable
              deleteIcon={<ArrowForward />}
              onDelete={() => {}}
            />
          ));
          const content = modal.content_ids.map((contentId) => (
            <ModalItem
              key={contentId}
              articleId={contentId}
              openPreview={() => openPreview(contentId)}
            />
          ));
          modals.push(
            <Modal
              key={index}
              title={modal.title}
              chips={chips}
              items={content}
            />
          );
        });
        setModals(modals);
      })
      .catch((error: Error) => {
        console.error("Error fetching file:", error);
      });
  }, []);

  /**
   * The Library component.
   */
  return (
    <div style={{ margin: "0", padding: "0" }}>
      <NavBar page="Library" />
      <div className="App">
        <nav style={{ display: "flex" }}>
          <LeftPanel query={query} setQuery={setQuery} />
          <section
            className="modals"
            style={{ maxWidth: "93.25vw", paddingTop: "40px" }}
          >
            {(query.get("nav") === "Featured" || query.get("nav") === null) && (
              <div>
                {modals}
                {/* <Modal
                  title="Categories"
                  chips={[
                    <Chip
                      variant={category === 1 ? "filled" : "outlined"}
                      component={Link}
                      color="primary"
                      label="All"
                      onClick={() => setCategory(1)}
                      to="/library?nav=Featured"
                      clickable
                    />,
                    <Chip
                      variant={category === 2 ? "filled" : "outlined"}
                      component={Link}
                      color="primary"
                      label="CNNs"
                      onClick={() => setCategory(2)}
                      to="/library?nav=Featured"
                      clickable
                    />,
                    <Chip
                      variant={category === 3 ? "filled" : "outlined"}
                      component={Link}
                      color="primary"
                      label="Transformers"
                      onClick={() => setCategory(3)}
                      to="/library?nav=Featured"
                      clickable
                    />,
                    <Chip
                      variant={category === 4 ? "filled" : "outlined"}
                      component={Link}
                      color="primary"
                      label="RL"
                      onClick={() => setCategory(4)}
                      to="/library?nav=Featured"
                      clickable
                    />,
                    <Chip
                      variant={category === 5 ? "filled" : "outlined"}
                      component={Link}
                      color="primary"
                      label="Medical"
                      onClick={() => setCategory(5)}
                      to="/library?nav=Featured"
                      clickable
                    />,
                    <Chip
                      variant={category === 6 ? "filled" : "outlined"}
                      component={Link}
                      color="primary"
                      label="Quantum"
                      onClick={() => setCategory(6)}
                      to="/library?nav=Featured"
                      clickable
                    />,
                  ]}
                  items={rosieItems}
                /> */}
              </div>
            )}
          </section>
          {query.get("article") !== null && (
            <Article articleId={currentArticle} />
          )}
          <ModalItemPreview
            articleId={previewedArticle}
            showPreview={showPreview}
            openPreview={openPreview}
            hidePreview={hidePreview}
            setShowPreview={setShowPreview}
          />
        </nav>
      </div>
    </div>
  );
};

export default Library;
