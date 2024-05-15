const express = require("express");
const app = express();
const PORT = 8000;

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(PORT, function () {
  console.log(`Sever Open: ${PORT}`);
});

// 라우터 불러오기
const router = require('./routes/user')
// [세팅 엔트리] localhost:8000/user
app.use('/user', router)


app.get("*", (req, res)=>{
    res.send("페이지를 찾을 수 없습니다.");
})