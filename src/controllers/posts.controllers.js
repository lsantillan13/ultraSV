import Post from '../models/Post.model.js';

//POST
export const createPost = async (req, res) => {
  const { 
    Entry_Title,
    Entry_Resume,
    Entry_Body,
    Entry_Featured_Image,
    Entry_Complementary_Image,
    Entry_Complementary_Text,
    Entry_Tags,
    Entry_Category,
    Author_Name,
  } = req.body;
  const newPost = new Post({Entry_Title, Entry_Resume, Entry_Body, Entry_Featured_Image, Entry_Complementary_Image, Entry_Complementary_Text, Entry_Tags, Entry_Category, Author_Name}); const savedPost = await newPost.save(); res.status(201).json(savedPost);
};

//GET
export const getPosts = async (req, res) => { const Posts = await Post.find(); res.json(Posts);};

//GET BY ID
export const getPostById = async (req, res) => { const findedPost = await Post.findById(req.params.postId); res.status(200).json(findedPost); };

//UPDATE BY ID
export const updatePostById = async (req, res) => { const updatedPost = await Post.findByIdAndUpdate(req.params.postId, req.body, {new: true}); res.status(204).json(updatedPost); };

//DELETE BY ID
export const deletePostById = async (req, res) => { const deletedPost = await Post.findByIdAndDelete(req.params.postId); res.status(204).json();};