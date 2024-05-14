const express = require('express')
const path = require('path')
const app = express()
const port = 3000

const postRouter = require("./routers/posts")

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})