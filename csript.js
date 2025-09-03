const postsContainer = document.getElementById('blog-posts');
const addBtn = document.getElementById('add-post-btn');
const titleInput = document.getElementById('post-title');
const contentInput = document.getElementById('post-content');

let posts = JSON.parse(localStorage.getItem('blogPosts')) || [];
let editIndex = null;

// Render all posts
function renderPosts() {
    postsContainer.innerHTML = '';
    posts.forEach((post, idx) => {
        const article = document.createElement('article');
        article.innerHTML = `
            <h3>${post.title}</h3>
            <p>${post.content}</p>
            <button onclick="editPost(${idx})">Edit</button>
            <button onclick="deletePost(${idx})">Delete</button>
        `;
        postsContainer.appendChild(article);
    });
}

// Save posts to localStorage
function savePosts() {
    localStorage.setItem('blogPosts', JSON.stringify(posts));
}

// Add or edit post
addBtn.onclick = function() {
    const title = titleInput.value.trim();
    const content = contentInput.value.trim();
    if (title && content) {
        if (editIndex !== null) {
            // Edit mode
            posts[editIndex] = { title, content };
            editIndex = null;
            addBtn.textContent = "Add Post";
        } else {
            // Add mode
            posts.unshift({ title, content });
        }
        savePosts();
        renderPosts();
        titleInput.value = '';
        contentInput.value = '';
    }
};

// Delete post function
window.deletePost = function(index) {
    posts.splice(index, 1);
    savePosts();
    renderPosts();
};

// Edit post function
window.editPost = function(index) {
    titleInput.value = posts[index].title;
    contentInput.value = posts[index].content;
    editIndex = index;
    addBtn.textContent = "Save Edit";
};

// Initial render
renderPosts();