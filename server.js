const app = require("express")();
const cors = require("cors");
const bodyParser = require("body-parser");

app.use(cors());

app.options('*', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type'); // Add other headers here
  res.setHeader('Access-Control-Allow-Methods', 'POST'); // Add other methods here
  res.send();
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Server running");
});

app.post("/login", (req, res) => {
    console.log(req.body);
  const { email, password } = req.body;
  if (email !== "test@test.com" || password !== "test")
    return res.status(401).json({ error: "Invalid Credentials" });
  res.json({ redirected:"oui",url: "http://www.apple.com" });
});

const port = process.env.PORT || 8080;

app.listen(port);