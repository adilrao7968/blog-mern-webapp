require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 6007;
const cors = require("cors");
const db = require("./models");
const authRouter = require("./routes/auth");
const postRouter = require("./routes/post");
const commentRouter = require("./routes/comment");
const likesRouter = require("./routes/likes");
const profileRouter = require("./routes/profile");

// middleware include
app.use(cors());
app.use(express.json());
app.use(express.static("public"));
app.use(authRouter);
app.use(postRouter);
app.use(commentRouter);
app.use(likesRouter);
app.use(profileRouter);


db.sequelize.sync({ logging: false }).then(() => {
  app.listen(port, () =>
    console.log(`Server is running on port ${port} & Database Connected`)
  );
});
