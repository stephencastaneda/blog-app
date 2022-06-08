import BlogPosts from '../../../blogposts.json';

export default function handler(req, res) {
  res.status(200).json(BlogPosts)
}