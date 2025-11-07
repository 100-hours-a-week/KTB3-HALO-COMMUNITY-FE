export function renderArticleWrap(container, { title, content, imageUrl }) {
  container.innerHTML = `
    <div class="article_container">
      <h1 class="article_title">${title}</h1>
      <div class="article_image">
        ${imageUrl ? `<img src="${imageUrl}" alt="게시글 이미지">` : ""}
      </div>
      <div class="article_content">
        <p>${content}</p>
      </div>
    </div>
  `;
}
