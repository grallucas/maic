import "./assets/library/css/article.css";
import { useEffect, useState } from "react";
import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import CopyAllIcon from "@mui/icons-material/CopyAll";
import CheckIcon from "@mui/icons-material/Check";
import { createRoot } from "react-dom/client";
import { useNavigate } from "react-router-dom";

/**
 * The ArticleProps interface represents the props that the Article component receives.
 */
interface ArticleProps {
  articleId: string;
  closeArticle: () => void;
}

/**
 * Converts a date string in the format "dd/mm/yyyy" to a textual representation.
 * @param {string} dateString - The date string in the format "dd/mm/yyyy".
 * @returns {string} The textual representation of the date string.
 */
function convertDateToTextual(dateString: string) {
  const [day, month, year] = dateString.split("/");
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const monthName = months[parseInt(month, 10) - 1];
  return `${monthName} ${day}, ${year}`;
}

/**
 * The Article component displays an article with the given article ID.
 * @param {ArticleProps} props - The props to be passed to the Article component.
 * @returns {JSX.Element} The Article component.
 */
const Article = (props: ArticleProps) => {
  const [title, setTitle] = useState<string>("");
  const [summary, setSummary] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [authors, setAuthors] = useState<string>("");
  const [contents, setContents] = useState<string>("");
  const [type, setType] = useState<string>("md");
  const [pdfUrl, setPdfUrl] = useState<string>("");
  const [videoId, setVideoId] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    const parts: string[] = window.location.href.split("/");
    let baseUrl: string = "";
    if (parts[2] === "127.0.0.1:3000" || parts[2] === "localhost:3000") {
      baseUrl = `${parts[0]}//127.0.0.1:8000`;
    } else {
      baseUrl = `${parts[0]}//${parts[2]}`;
    }
    if (props.articleId) {
      fetch(`${baseUrl}/api/v1/library/${props.articleId}/content-type`)
        .then((response: Response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.text();
        })
        .then((data: string) => {
          const json = JSON.parse(data)["response"];
          if (json["type"] === "link") {
            const link = json["link"];
            window.open(link, "_blank");
            navigate("/library");
            props.closeArticle();
          }
          if (json["type"] === "pdf") {
            setPdfUrl(json["pdf"]);
          }
          if (json["type"] === "video") {
            setVideoId(json["id"]);
          }
          window.scrollTo(0, 0);
          setType(json["type"]);
        })
        .catch((error: Error) => {
          // pass
        });
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
    const imgs = document.querySelectorAll("img");
    imgs.forEach((img) => {
      if (
        !img.classList.contains("modal-item-preview-image") &&
        !img.classList.contains("logo")
      ) {
        img.src = `http://maic-fastapi-lambda.s3-website-us-east-1.amazonaws.com/${img.src.split("/").slice(-3).join("/")}`;
      }
    });

    const preElements = document.querySelectorAll("pre");

    preElements.forEach((pre) => {
      const existingButton = pre.querySelector("button");
      if (!existingButton) {
        const button = document.createElement("button");
        button.classList.add("copy-button");

        button.addEventListener("click", () => {
          const codeText = pre.innerText;
          navigator.clipboard.writeText(codeText);

          const iconContainer = button.querySelector("span");
          const root = createRoot(iconContainer!);
          root.render(<CheckIcon color="inherit" />);

          setTimeout(() => {
            root.render(<CopyAllIcon color="inherit" />);
          }, 3000);
        });

        const iconContainer = document.createElement("span");
        button.appendChild(iconContainer);
        pre.appendChild(button);

        const root = createRoot(iconContainer);
        root.render(<CopyAllIcon color="inherit" />);
      }

      const scriptPrettify1 = document.createElement("script");
      scriptPrettify1.innerHTML =
        "document.querySelectorAll('code').forEach(x => x.classList.add('prettyprint'))";
      document.body.appendChild(scriptPrettify1);

      const scriptPrettify2 = document.createElement("script");
      scriptPrettify2.src =
        "https://cdn.jsdelivr.net/gh/google/code-prettify@master/loader/run_prettify.js";
      document.body.appendChild(scriptPrettify2);
    });
  }, [contents]);

  useEffect(() => {
    if (props.articleId !== "") {
      const parts: string[] = window.location.href.split("/");
      let baseUrl: string = "";
      if (parts[2] === "127.0.0.1:3000" || parts[2] === "localhost:3000") {
        baseUrl = `${parts[0]}//127.0.0.1:8000`;
      } else {
        baseUrl = `${parts[0]}//${parts[2]}`;
      }

      if (props.articleId) {
        fetch(`${baseUrl}/api/v1/library/${props.articleId}`)
          .then((response: Response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            return response.text();
          })
          .then((data: string) => {
            const elements = data.split("\\n");
            setSummary(elements[0].split("summary: ")[1]);
            setDate(convertDateToTextual(elements[2].split("date: ")[1]));
            setTitle(elements[3].split("title: ")[1]);
            setAuthors(elements[6].split("authors: ")[1].split(",").join(", "));
            setContents(elements.slice(9).join("\n").slice(0, -1));
          })
          .catch((error: Error) => {
            // pass
          });
      }
    }
  }, [props.articleId]);

  return (
    <div className="content">
      {type === "md" && (
        <div className="article">
          {!title && !authors && !date && !summary && (
            <div>
              <h1>404 - Article Not Found</h1>
              <p>No article was found here. Try again looking for the article.</p>
            </div>
          )}
          {title && (
            <span className="article-title">
              <Markdown>{`# ${title}`}</Markdown>
            </span>
          )}
          {authors && <Markdown>{`### **Authors:** ${authors}`}</Markdown>}
          {date && <Markdown>{`### **Published:** ${date}`}</Markdown>}
          {summary && <Markdown>{`### ${summary}`}</Markdown>}
          {title && authors && date && summary && (
            <Markdown
                children={contents}
                rehypePlugins={[rehypeRaw]}
                components={{
                h2: ({ node, ...props }) => {
                    if (
                    Array.isArray(props.children) &&
                    typeof props.children[0] === "string" &&
                    props.children[0] === "Why"
                    ) {
                    console.log("Applying yellow-why class to Why heading");
                    return (
                        <h2 {...props} className="yellow-why">
                        {props.children}
                        </h2>
                    );
                    }
                    return <h2 {...props} />;
                },
                }}
            />
          )}
        </div>
      )}
      <iframe
        src={pdfUrl}
        title={pdfUrl}
        width={"100%"}
        style={{
          display: type === "pdf" ? "block" : "none",
          marginTop: "55px",
          border: "none",
          height: "calc(100vh - 55px)",
        }}
      />
      <iframe
        src={`https://www.youtube.com/embed/${videoId}`}
        title={videoId}
        width={"100%"}
        style={{
          display: type === "video" ? "block" : "none",
          marginTop: "55px",
          border: "none",
          height: "calc(100vh - 55px)",
        }}
      />
    </div>
  );
};

export default Article;