async function fetchAndDisplayBlogPosts() {
}
async function displayBlogPost(blogPosts) {
    try {
        const blogPostResponse = await fetch('/blogs/');
        if (!blogPostResponse.ok) {
            throw new Error('Failed to fetch blog post');
        }
        const blogPosts = await blogPostResponse.json();

        await Promise.all(blogPosts.map(async (blogPosts) => {
            const authorResponse = await fetch(`/users/getUserByID/${blogPosts.author}`);
            if (!authorResponse.ok){
                throw new Error('Failed to fetch author details');
            }
            const authData = await authorResponse.json();
            blogPosts.authorName = authData.name;
        }));

        await Promise.all(blogPosts.map(async (blogPosts) => {
            await Promise.all(blogPosts.comments.map(async (comment) => {
                const userResponse = await fetch(`/users/getUserByID/${comment.user}`);
                if (!userResponse.ok) {
                    throw new Error('Failed to fetch user details');
                }
                const userData = await userResponse.json();
                comment.userName = userData.name;
            }));
        }));
        await displayBlogPost(blogPosts);

    }catch (error) {
        console.error('Error fetching content', error.message);
    }
}
function createBlogPostCard (blogPost) {
    
}
function createLikeButton(Likes) {

}

window.addEventListener('DOMContentLoaded', async () => {
    try {
        const blogPostResponse = await fetch('/blogs');
        if (!blogPostResponse.ok){
            throw new Error('Failed to fetch blog posts');
        }
        const blogPosts = await blogPostResponse.json();

        await Promise.all(blogPosts.map(async (blogPosts) => {
            const authorResponse = await fetch(`/users/getUserByID/${blogPosts.author}`);
            if (!authorResponse.ok) {
                throw new Error('Failed to fetch author details');
            }
            const authData = await authorResponse.json();
            blogPosts.authorName = authData.name;
        }));

        await Promise.all(blogPosts.map(async (blogPosts) => {
            await Promise.all(blogPosts.comment.map(async (comment) => {
                const userResponse = await fetch(`/users/getUserByID/${comment.user}`);
                if (!userResponse.ok) {
                    throw new Error('Failed to fetch user details');
                }
                const userData = await userResponse.json();
                comment.userName = userData.name;
            }));
        }));

        displayBlogPosts(blogPosts);

    } catch (error) {
        console.error('Error fetching content', error.message);
    }
});

//display blog
async function displayBlogPosts(blogPosts){
    const blogPostContainer = document.getElementById('blogPosts');
    blogPostContainer.innerHTML = '';

    blogPosts.forEach(blogPost => {
        const cardElement = document.createElement('div');

        const titleElement = document.createElement('h5');
        titleElement.textContent = blogPost.title;
        cardElement.appendChild(titleElement);

        const authorElement = document.createElement('p');
        authorElement.textContent = blogPost.authorName;
        cardElement.appendChild(authorElement);

        const contentElement = document.createElement('p');
        contentElement.textContent = blogPost.content;
        cardElement.appendChild(contentElement);

        const likesElement = document.createElement('p');
        likesElement.textContent = `Likes: ${blogPost.likes}`;
        cardElement.appendChild(likesElement);

        const commentsElement = document.createElement('ul');
        blogPost.comment.forEach(comment => {
            const commentItem = document.createElement('li');
            commentItem.textContent = `${comment.userName}: ${comment.content} ${comment.likes} Likes`;
            commentsElement.appendChild(commentItem);
        });
        cardElement.appendChild(commentsElement);

        blogPostContainer.appendChild(cardElement);
    });
}
