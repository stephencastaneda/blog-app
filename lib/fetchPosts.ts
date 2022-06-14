export const fetchPosts = async () => {
  const response = await fetch("/api/blogs/blogs");
  if (response.ok) {
    console.log("duh response", response);
  }
   return response.json();
};