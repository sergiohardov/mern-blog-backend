import PostModel from "../models/Post.js";

export const getAll = async (req, res) => {
  try {
    const posts = await PostModel.find().populate("author").exec();

    res.json(posts);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Error to get all posts.",
    });
  }
};

export const getOne = async (req, res) => {
  try {
    const postId = req.params.id;

    PostModel.findOneAndUpdate(
      {
        _id: postId,
      },
      {
        $inc: { viewsCount: 1 },
      },
      {
        returnDocument: "after",
      }
    )
      .then((doc) => {
        if (!doc) {
          return res.status(404).json({
            message: "Article not found",
          });
        }

        res.json(doc);
      })
      .catch((err) => {
        if (err) {
          console.log(err);

          return res.status(500).json({
            message: "Error return article",
          });
        }
      });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Error to get all posts.",
    });
  }
};

export const remove = async (req, res) => {
  try {
    const postId = req.params.id;

    PostModel.findOneAndDelete({
      _id: postId,
    })
      .then((doc) => {
        if (!doc) {
          return res.status(404).json({
            message: "Article not found",
          });
        }

        res.json({ success: true });
      })
      .catch((err) => {
        if (err) {
          console.log(err);

          return res.status(500).json({
            message: "Error to delete post",
          });
        }
      });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Error to get all posts.",
    });
  }
};

export const create = async (req, res) => {
  try {
    const doc = new PostModel({
      title: req.body.title,
      text: req.body.text,
      tags: req.body.tags,
      imageUrl: req.body.imageUrl,
      author: req.userId,
    });

    const post = await doc.save();

    res.json(post);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Error to create post.",
    });
  }
};

export const update = async (req, res) => {
  try {
    const postId = req.params.id;

    await PostModel.updateOne(
      {
        _id: postId,
      },
      {
        title: req.body.title,
        text: req.body.text,
        tags: req.body.tags,
        imageUrl: req.body.imageUrl,
        author: req.userId,
      }
    );

    res.json({ success: true  });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Error to update post.",
    });
  }
};
