summary: A guide on how to write articles using Markdown and HTML
type: md
date: 13/8/2024
title: Writing Articles: Markdown & HTML Basics
image: ./img/thumbnails/writing_articles.png
difficulty: easy
authors: Ben Paulson
categories: Tutorial,Markdown,HTML

**Raw Text Block:**

```md
summary: A guide on how to write articles using Markdown and HTML
type: md
date: 13/8/2024
title: Writing Articles: Markdown & HTML Basics
image: ./img/thumbnails/writing_articles.png
difficulty: easy
authors: Ben Paulson
categories: Tutorial,Markdown,HTML

# Writing Articles: Markdown & HTML Basics

When writing articles for a website, using Markdown combined with HTML can create a clean, readable structure. This tutorial will guide you through the essentials of Markdown and some useful HTML commands to enhance your articles.

## What is Markdown?

Markdown is a lightweight markup language for creating formatted text using a plain-text editor. It’s easy to learn and read, making it a popular choice for writing content that will be converted to HTML.

### Basic Markdown Syntax

- **Headings**: Use `#` for H1, `##` for H2, and so on.
- **Bold Text**: Wrap text in `**` or `__`.
- **Italic Text**: Wrap text in `*` or `_`.
- **Lists**:
  - **Unordered Lists**: Use `-` or `*`.
  - **Ordered Lists**: Use numbers followed by a period, like `1.`.
- **Links**: `[Link Text](URL)`
- **Images**: `![Alt Text](Image URL)`

## Embedding HTML in Markdown

Markdown is versatile, but there are times when you may need to use HTML to achieve specific formatting or embed content that Markdown alone cannot handle.

### Embedding Images

To embed an image with custom height and width:

\`\`\`html
<img src="./img/article_content/sample_image.png" height="300px">
\`\`\`

### Embedding Videos

To embed a video:

\`\`\`html
<video width="320" height="240" controls>
  <source src="movie.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>
\`\`\`

### Embedding Code Blocks

To display code blocks, you can use triple backticks or the `<pre>` tag:

\`\`\`python
print("Hello, World!")
\`\`\`

\`\`\`html
<pre>
print("Hello, World!")
</pre>
\`\`\`

## Conclusion

Markdown is a powerful tool for writing articles, especially when combined with HTML for added functionality. With this guide, you now have the basics to start writing your articles effectively.

Happy writing!
```

**Content (Finished Markdown):**

# Writing Articles: Markdown & HTML Basics

When writing articles for a website, using Markdown combined with HTML can create a clean, readable structure. This tutorial will guide you through the essentials of Markdown and some useful HTML commands to enhance your articles.

## What is Markdown?

Markdown is a lightweight markup language for creating formatted text using a plain-text editor. It’s easy to learn and read, making it a popular choice for writing content that will be converted to HTML.

### Basic Markdown Syntax

- **Headings**: Use `#` for H1, `##` for H2, and so on.
- **Bold Text**: Wrap text in `**` or `__`.
- **Italic Text**: Wrap text in `*` or `_`.
- **Lists**:
  - **Unordered Lists**: Use `-` or `*`.
  - **Ordered Lists**: Use numbers followed by a period, like `1.`.
- **Links**: `[Link Text](URL)`
- **Images**: `![Alt Text](Image URL)`

## Embedding HTML in Markdown

Markdown is versatile, but there are times when you may need to use HTML to achieve specific formatting or embed content that Markdown alone cannot handle.

### Embedding Images

To embed an image with custom height and width:

```html
<img src="./img/article_content/sample_image.png" height="300px">
```

### Embedding Videos

To embed a video:

```html
<video width="320" height="240" controls>
  <source src="movie.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>
```

### Embedding Code Blocks

To display code blocks, you can use triple backticks or the `<pre>` tag:

\`\`\`python
print("Hello, World!")
\`\`\`

```html
<pre>
print("Hello, World!")
</pre>
```

## Conclusion

Markdown is a powerful tool for writing articles, especially when combined with HTML for added functionality. With this guide, you now have the basics to start writing your articles effectively.

Happy writing!

---

This article should give readers a clear understanding of how to write articles using Markdown and HTML, providing practical examples and explanations.