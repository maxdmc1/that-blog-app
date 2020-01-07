const db = require("../models");

module.exports = {
  postBlogifyApi: async function(req, res) {
    const dbBlog = await db.Blog.create(req.body);
    res.json(dbBlog);
  },
  api: function(app) {
    // Get all blogs
    app.get("/api/blogs", function(req, res) {
      db.Blog.findAll({}).then(function(dbBlogs) {
        res.json(dbBlogs);
      });
    });

    // Get a blog
    app.get("/api/blogs/:id", function(req, res) {
      console.log({ id: req.params.id });
      db.Blog.findAll({ where: { id: req.params.id } }).then(function(dbBlogs) {
        console.log(dbBlogs);
        res.json(dbBlogs[0]);
      });
    });

    // Update a blog post
    // app.put("/api/blogs/:id", function(req, res) {
    //   console.log({ id: req.params.id });
    //   db.Blog.findAll({where: { id: req.params.id } }).then(function(
    //     dbBlogs
    //   ) {
    //     console.log(dbBlogs);
    //   })
    // })

    // Create a new blog
    app.post("/api/blogs", this.postBlogifyApi);

    // Delete an blog by id
    app.delete("/api/blogs/:id", function(req, res) {
      db.Blog.destroy({ where: { id: req.params.id } }).then(function(dbBlog) {
        res.json(dbBlog);
      });
    });
  }
};
