import BlogModel from "../Models/blogModel.js";

//Get blogs
export async function getAllBlogs(req, res){
    try {
        const blog = await BlogModel.find();
        res.json(blog);
    } catch (error) {
        res.status(500).json({error: error.message });
    }
}

//Get blog ID
export async function getBlogID(req, res){
    try {
        const blog = await BlogModel.find(req.params.id);
        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }
        res.json(blog);
    } catch (error) {
        res.status(500).json({error: error.message });
    }
}
//Create new blog
export async function createBlogPost(req, res) {
    try {
        const { title, content, author } = req.body;
        const newBlog = new BlogModel({
            title,
            content,
            author,
            createdAt: new Date(),
            comments: [],
            likes: 0
        });
        const savedBlog = await newBlog.save();
        res.status(201).json(savedBlog);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

//like Blog
export async function likedBlogPost(req, res){
    try {
        const blog = await BlogModel.findById(req.params.id);
        if (!blog) {
            return res.status(404).json({message: 'Blog not found'});
        }
        blog.likes++;
        const updatedBlog = await blog.save();
        res.json(updatedBlog);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

//Create blog comment
export async function addBlogComment(req, res) {
    try {
        const { userID, content } = req.body;
        const blog = await BlogModel.find(req.params.id);
        if (!blog) {
            return res.status(404).json({message: 'Blog not found'});
        }
        const newComment = {
            user: userID,
            content,
            likes: 0
        };
        blog.comment.push(newComment);
        const updatedBlog = await blog.save();
        res.json(updatedBlog);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
//like blog comments
export async function likeBlogComment(req, res) {
    try {
        const blog = await BlogModel.find(req.params.id);
        if (!blog) {
            return res.status(404).json({message: 'Blog not found'});
        }
        const commentIndex = parseInt(req.params.commentIndex);
        if (isNaN(commentIndex) || commentIndex < 0 || commentIndex >= blog.comments.length) {
            return res.status(404).json({message: 'Invalid comment index'});
        }
        const comment = blog.comment[commentIndex];
        comment.likes++;
        const updatedBlog = await blogs.save();
        res.json(updatedBlog);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

//delete blog
export async function deleteBlogPost(req, res) {
        try {
            const blog = await BlogModel.findByIdAndDelete(req.params.id);
            if (!blog) {
                return res.status(404).json({ message: 'Blog not found' });
            }
            res.json(blog);
        } catch (error) {
            res.status(500).json({error: error.message});
        }
}