import { useEffect, useState, useRef } from "react";
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
import CanvasBackground from "./components/library/Background";
import { useStepContext } from "@mui/material";

/**
 * The Modal interface to represent the modal object.
 */
interface Modal {
  title: string;
  tags: string[];
  content_ids: string[];
  type: string;
  img: string;
  date: string;
  description: string;
  authors: string;
}

const useScrollToLocation = () => {
  const scrolledRef = useRef(false);
  const { hash } = useLocation();
  const hashRef = useRef(hash);

  useEffect(() => {
    if (hash) {
      // We want to reset if the hash has changed
      if (hashRef.current !== hash) {
        hashRef.current = hash;
        scrolledRef.current = false;
      }

      // only attempt to scroll if we haven't yet (this could have just reset above if hash changed)
      if (!scrolledRef.current) {
        const id = hash.replace("#", "");
        const element = document.getElementById(id);
        if (element) {
          const elementPosition =
            element.getBoundingClientRect().top + window.scrollY;

          window.scrollTo({
            top: elementPosition,
            behavior: "smooth",
          });

          scrolledRef.current = true;
        }
      }
    }
  });
};

/**
 * The Library component displays the library page of the website.
 * @returns {JSX.Element} The Library component.
 */
const Library = () => {
  /**
   * The states of the Library component, including the current article, previewed article, and whether to show the preview.
   */
  useScrollToLocation();
  const [categoryItems, setCategoryItems] = useState<any[]>([]);
  const [categoryTags, setCategoryTags] = useState<any[]>([]);
  const [currentArticle, setCurrentArticle] = useState("");
  const [previewedArticle, setPreviewedArticle] = useState<string>("");
  const [showPreview, setShowPreview] = useState<boolean>(false);
  const [columns, setColumns] = useState<number>(6);
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    document.title = 'MAIC - Library';
  }, []);

  /**
   * Updates the width state based on the window width.
   */
  useEffect(() => {
    // Define a function to update the width state
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    // Add event listener for resize
    window.addEventListener("resize", handleResize);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  /**
   * Updates the number of columns based on the window width.
   */
  useEffect(() => {
    setColumns(Math.round(window.innerWidth / 320));
  }, [width]);

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
   * Close the article
   */
  function closeArticle() {
    setCurrentArticle("");
    setPreviewedArticle("");
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
  const [category, setCategory] = useState<string>("All");
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
              to={`/library?nav=${tag}`}
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
              columns={columns}
              type={modal.type}
            />
          ));
          modals.push(
            <Modal
              key={index}
              title={modal.title}
              chips={chips}
              items={content}
              type={modal.type}
              img={modal.img}
              date={modal.date}
              description={modal.description}
              authors={modal.authors}
            />
          );
        });
        setModals(modals);
      })
      .catch((error: Error) => {
        // pass
      });
  }, []);

  /***
   * Fetches the articles from the server and updates the categoryItems state.
   */
  useEffect(() => {
    const parts: string[] = window.location.href.split("/");
    let baseUrl: string = "";
    if (parts[2] === "127.0.0.1:3000" || parts[2] === "localhost:3000") {
      baseUrl = `${parts[0]}//127.0.0.1:8000`;
    } else {
      baseUrl = `${parts[0]}//${parts[2]}`;
    }
    if (category) {
      fetch(`${baseUrl}/api/v1/library/${category}/tagged-content`)
        .then((response: Response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.text();
        })
        .then((data: string) => {
          const json = JSON.parse(data)["response"];
          let tempCategoryItems: any[] = [];
          Object.keys(json).forEach((key, index) => {
            tempCategoryItems.push(
              <ModalItem
                key={json[key]}
                articleId={json[key]}
                openPreview={() => openPreview(json[key])}
                columns={columns}
              />
            );
          });
          setCategoryItems(tempCategoryItems);
        })
        .catch((error: Error) => {
          // pass
        });
    }
  }, [category]);

  useEffect(() => {
    const parts: string[] = window.location.href.split("/");
    let baseUrl: string = "";
    if (parts[2] === "127.0.0.1:3000" || parts[2] === "localhost:3000") {
      baseUrl = `${parts[0]}//127.0.0.1:8000`;
    } else {
      baseUrl = `${parts[0]}//${parts[2]}`;
    }
    fetch(`${baseUrl}/api/v1/library/tags`)
      .then((response: Response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.text();
      })
      .then((data: string) => {
        const json = JSON.parse(data)["response"];
        const modifiedJson = ["All", ...json];
        setCategoryTags(modifiedJson);
      })
      .catch((error: Error) => {
        // pass
      });
  }, []);

  /**
   * Gets the modals for a specific subsection
   */
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    if (currentArticle === "") {
      const parts: string[] = window.location.href.split("/");
      let baseUrl: string = "";
      if (parts[2] === "127.0.0.1:3000" || parts[2] === "localhost:3000") {
        baseUrl = `${parts[0]}//127.0.0.1:8000`;
      } else {
        baseUrl = `${parts[0]}//${parts[2]}`;
      }
      if (query.get("nav")) {
        fetch(`${baseUrl}/api/v1/library/subsection/${query.get("nav")}`)
          .then((response: Response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            return response.json();
          })
          .then((data: any) => {
            const json = data["response"];
            let modals: any[] = [];
            Object.keys(json).forEach((key, index) => {
              const modal: Modal = json[key];
              const chips = modal.tags.map((tag, index) => (
                <Chip
                  key={index}
                  component={Link}
                  color="primary"
                  label={tag}
                  to={`/library?nav=${query.get("nav")}`}
                  clickable
                  deleteIcon={<ArrowForward />}
                  onDelete={() => {}}
                />
              ));
              const contentIds = modal.content_ids.sort();
              const content = contentIds.map((contentId) => (
                <ModalItem
                  key={contentId}
                  articleId={contentId}
                  openPreview={() => openPreview(contentId)}
                  columns={columns}
                  type={modal.type}
                />
              ));
              modals.push(
                <Modal
                  key={index}
                  title={modal.title}
                  chips={chips}
                  items={content}
                  type={modal.type}
                  img={modal.img}
                  date={modal.date}
                  description={modal.description}
                  authors={modal.authors}
                />
              );
            });
            setModals(modals);
          })
          .catch((error: Error) => {
            // pass
          });
      }
    }
  }, [currentArticle || query]);

  /**
   * Get the tagged content when type is set
   */
  useEffect(() => {
    if (query.get("type") && currentArticle === "") {
      const parts: string[] = window.location.href.split("/");
      let baseUrl: string = "";
      if (parts[2] === "127.0.0.1:3000" || parts[2] === "localhost:3000") {
        baseUrl = `${parts[0]}//127.0.0.1:8000`;
      } else {
        baseUrl = `${parts[0]}//${parts[2]}`;
      }

      if (query.get("type")) {
        fetch(`${baseUrl}/api/v1/library/${query.get("type")}/tagged-content`)
          .then((response: Response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            return response.json();
          })
          .then((data: any) => {
            const json = data["response"];
            const items: any[] = [];
            Object.keys(json).forEach((key, index) => {
              items.push(
                <ModalItem
                  key={index}
                  articleId={json[key]}
                  openPreview={() => openPreview(json[key])}
                  columns={columns}
                />
              );
            });

            const tag = query.get("type") || "defaultTitle";
            const modal = <Modal title={tag} chips={[]} items={items} />;
            setModals([modal]);
          });
      }
    }
  }, [query.get("type")]);

  /**
   * The Library component.
   */
  return (
    <div style={{ margin: "0", padding: "0" }}>
      <NavBar page="Library" />
      <div className="App">
        <nav style={{ display: "flex" }}>
          <LeftPanel query={query} setQuery={setQuery} />
          {query.get("article") === null && (
            <section
              className="modals"
              style={{ maxWidth: "93.25vw", paddingTop: "40px" }}
            >
              <div>
                {modals}
                {(query.get("nav") === "Featured" ||
                  query.get("nav") === null) && (
                  <Modal
                    title="Categories"
                    chips={categoryTags.map((tag, index) => {
                      return (
                        <Chip
                          key={index + 1}
                          variant={category === tag ? "filled" : "outlined"}
                          component={Link}
                          color="primary"
                          label={tag}
                          onClick={() => setCategory(tag)}
                          to="/library?nav=Featured"
                          clickable
                        />
                      );
                    })}
                    items={categoryItems}
                  />
                )}
              </div>
            </section>
          )}
          {query.get("article") !== null && (
            <Article articleId={currentArticle} closeArticle={closeArticle} />
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
      <CanvasBackground />
    </div>
  );
};

export default Library;
