const postsArr = [
  {
    title: "First Post",
    image:
      "https://images.unsplash.com/photo-1535402803947-a950d5f7ae4b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
    content: "This is the first blog post",
    timeStamp: "todays date",
    id: 100,
  },
  {
    title: "Second Post",
    image:
      "https://images.unsplash.com/photo-1468070454955-c5b6932bd08d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
    content: "This is the second blog post",
    timeStamp: "todays date",
    id: 200,
  },
  {
    title: "Third Post",
    image:
      "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
    content: "This is the third blog post",
    timeStamp: "todays date",
    id: 300,
  },
  {
    title: "Fourth Post",
    image:
      "https://images.unsplash.com/photo-1552667466-07770ae110d0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
    content: "This is the fourth blog post",
    timeStamp: "todays date",
    id: 400,
  },
  {
    title: "Fifth Post",
    image:
      "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
    content: "This is the fifth blog post"
    timeStamp: "todays date",
    id: 500,
  },
];

let id = 0;

module.exports = {
  allPosts(req, res) {
    res.status(200).send(postsArr);
  },

  searchPosts(req, res) {
    console.log(req.query);
    let { title } = req.query;

    let filteredArr = postsArr.filter(
      (post) => post.title.includes(title) || post.content.includes(title)
    );

    res.status(200).send(filteredArr);
  },

  createPost(req, res) {
    let { title, content, image } = req.body;
    let timeStamp = new Date();
    let newPost = {
      title,
      image,
      content,
      timeStamp,
      id,
    };
    id++;
    postsArr.unshift(newPost);
    res.status(200).send(postsArr);
  },
  updatePost(req, res) {
    let { id } = req.params;
    let { newTitle, newContent, newImage } = req.query;
    let index = postsArr.findIndex((post) => post.id === +id);

    if (newTitle) {
      postsArr[index].title = newTitle;
    }
    if (newTitle) {
      postsArr[index].title = newTitle;
    }

    if (newImage) {
      postsArr[index].image = newImage;
    }

    if (newContent) {
      postsArr[index].content = newContent;
    }

    res.status(200).send(postsArr);
  },

  deletePost(req, res) {
    let { id } = req.params;
    let index = postsArr.findIndex((post) => post.id === +id);
    if (postsArr[index].id === +id) {
      postsArr.splice(index, 1);
    }
    res.status(200).send(postsArr);
  },
};
