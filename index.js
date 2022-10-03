const { application } = require("express");
const express = require("express");
const app = express();
const connection = require("./connection");

const Routes = require("./routes");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(Routes);

app.get("/", (req, res) => {
  res.send("home");
});
const port = process.env.PORT || 3000;
const host = '0.0.0.0'
app.listen(port, host, ()=> {
  console.log(`server is running on port ${port}`)
})

