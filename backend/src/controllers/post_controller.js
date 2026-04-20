import { Post } from "../models/post_model.js";

// Create a post
const createPost = async (req, res) => {
  try {
    const { name, description, age } = req.body;

    if (!name || !description || !age) {
      return res.status(400).json({
        message: "All fields are required.",
      });
    }

    const post = await Post.create({ name, description, age });

    res.status(201).json({
      message: "Post created successfully!!",
      status: true,
      post,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error.",
      error,
    });
  }
};

const getPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error.",
      error,
    });
  }
};

const updatePost = async (req, res) => {
  try {
    // Basic validation to check if the body is empty

    // {name: x, description: y, age: z} --> {name, description, age}
    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({
        message: " No data provided for update.",
      });
    }

    // Update the user's post when the gives us their values
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    // What if we couldn't find the post, then we check
    if (!post)
      return res.status(404).json({
        message: "Post not found",
      });

    // If the post was found, then we update it by doing this:
    res.status(200).json({ message: "Post Updated Succcessfully!!", post });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      error,
    });
  }
};

const deletePost = async (req, res) => {
  try {
    const deleted = await Post.findByIdAndDelete(req.params.id);
    if (!deleted)
      return res.status(404).json({
        message: "Post not found.",
      });

    res.status(200).json({
      message: "Post was successfully deleted.",
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error.",
      error,
    });
  }
};

export { createPost, getPosts, updatePost, deletePost };
