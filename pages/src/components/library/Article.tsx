import "./assets/library/css/article.css";
import { useEffect, useState } from "react";
import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import CopyAllIcon from "@mui/icons-material/CopyAll";
import CheckIcon from "@mui/icons-material/Check";
import { createRoot } from "react-dom/client";

interface ArticleProps {
  articleId: string;
}

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

const Article = (props: ArticleProps) => {
  const [title, setTitle] = useState<string>("");
  const [summary, setSummary] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [authors, setAuthors] = useState<string>("");
  const [contents, setContents] = useState<string>("");

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
            console.error("Error fetching the image:", error);
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
          console.error("Error fetching file:", error);
        });
    }
  }, [props.articleId]);

  return (
    <div className="article">
      {!title && !authors && !date && !summary && (
        <div>
          <h1>404 - Article Not Found</h1>
          <p>No article was found here. Try again looking for the article.</p>
        </div>
      )}
      {title && <Markdown>{`# ${title}`}</Markdown>}
      {authors && <Markdown>{`### **Authors:** ${authors}`}</Markdown>}
      {date && <Markdown>{`### **Published:** ${date}`}</Markdown>}
      {summary && <Markdown>{`### ${summary}`}</Markdown>}
      {title && authors && date && summary && (
        <Markdown children={contents} rehypePlugins={[rehypeRaw]} />
      )}
    </div>
  );
};

export default Article;