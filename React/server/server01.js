const express = require("express");
const app = express();

app.get("/student", (req, res) => {
  console.log("访问服务器01, 来自主机名:", req.get("host"));
  const students = [
    { name: "张三", age: 15, gender: 1 },
    { name: "李四", age: 16, gender: 0 },
    { name: "王五", age: 17, gender: 1 },
  ];
  res.send(students);
});

app.listen(5000, () => {
  console.log("server started on http://localhost:5000/student");
});
