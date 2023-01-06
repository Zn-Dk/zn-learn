const express = require("express");
const app = express();

app.get("/car", (req, res) => {
  console.log("访问服务器02, 来自主机名:", req.get("host"));
  const students = [
    { name: "奔驰", color: "red", price: 199 },
    { name: "宝马", color: "green", price: 299 },
    { name: "奥迪", color: "yellow", price: 399 },
  ];
  res.send(students);
});

app.listen(5001, () => {
  console.log("server started on http://localhost:5001/car");
});
