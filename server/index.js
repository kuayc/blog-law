require("dotenv").config();
const express = require("express");
const app = express();
const pc = require("./postController");

app.use(express.json());

// endpoints
app.get("/api/posts", pc.allPosts);
app.get("/api/search", pc.searchPosts);
app.post("/api/posts", pc.createPost);
app.put("/api/posts/:id", pc.updatePost);
app.delete("/api/posts/:id", pc.deletePost);

// big brother is listening
const SERVER_PORT = 4321;
app.listen(SERVER_PORT, () => {
  console.log(`listening ${SERVER_PORT}`);
});
