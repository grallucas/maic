import "./assets/library/css/article.css";
import { useEffect, useState } from "react";
import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import CopyAllIcon from "@mui/icons-material/CopyAll";
import CheckIcon from "@mui/icons-material/Check";
import { createRoot } from "react-dom/client";

/**
 * The ArticleProps interface represents the props that the Article component receives.
 */
interface ArticleProps {
  articleId: string;
  type: "markdown" | "pdf" | "link" | "video"
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
  /**
   * The states of the Article component, including the title, summary, date, authors, and contents of the article.
   */
  const [title, setTitle] = useState<string>("");
  const [summary, setSummary] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [authors, setAuthors] = useState<string>("");
  const [contents, setContents] = useState<string>("");

  /**
   * Fetches the images within the contents of the article from the server and updates the image srcs.
   * Also adds a copy button to the code blocks in the article.
   */
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
        const ogFile = img.src
          .split("/")
          [img.src.split("/").length - 1].replace(".png", "")
          .replace(".jpg", "")
          .replace(".gif", "");

        const fetchImage = async () => {
          try {
            const response = await fetch(
              `${baseUrl}/api/v1/library/${ogFile}/image`
            );
            const blob = await response.blob();
            const imageUrl = URL.createObjectURL(blob);
            img.src = imageUrl;
          } catch (error) {
            return;
          }
        };
        fetchImage();
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
    });
  }, [contents]);

  /**
   * Fetches the article with the given article ID from the server and updates the states of the Article component.
   */
  useEffect(() => {
    if (props.articleId !== "") {
      const parts: string[] = window.location.href.split("/");
      let baseUrl: string = "";
      if (parts[2] === "127.0.0.1:3000" || parts[2] === "localhost:3000") {
        baseUrl = `${parts[0]}//127.0.0.1:8000`;
      } else {
        baseUrl = `${parts[0]}//${parts[2]}`;
      }

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
  }, [props.articleId]);

  /**
   * Returns the JSX for the Article component.
   */
  return (
    <div className="article">
      <div style={{display: props.type === "markdown" ? "block" : "none"}}>
        {!title && !authors && !date && !summary && (
          <div>
            <h1>404 - Article Not Found</h1>
            <p>No article was found here. Try again looking for the article.</p>
          </div>
        )}
        {title && <span className="article-title"><Markdown>{`# ${title}`}</Markdown></span>}
        {authors && <Markdown>{`### **Authors:** ${authors}`}</Markdown>}
        {date && <Markdown>{`### **Published:** ${date}`}</Markdown>}
        {summary && <Markdown>{`### ${summary}`}</Markdown>}
        {title && authors && date && summary && (
          <Markdown children={contents} rehypePlugins={[rehypeRaw]} />
        )}
      </div>
      <div style={{display: props.type === "pdf" ? "block" : "none"}}>
      {
       <p>Test</p>
      }
      </div>
      {<script>
        // TODO: fix
        document.querySelectorAll('code').forEach(x =&gt; x.classList.add('prettyprint'))
      </script>}
      {<script src="https://cdn.jsdelivr.net/gh/google/code-prettify@master/loader/run_prettify.js"></script>}

    </div>
  );
};

export default Article;
