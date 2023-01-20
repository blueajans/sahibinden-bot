const Fuse = require("./fuse.js");
list = require("./vehicles.json");
const options = {
  threshold: 0.2,
  ignoreLocation: false,
  keys: ["model", "brand", "year", "power"],
};
const fuse = new Fuse(list, options);

const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  const pattern = {
    model: req.query.model,
    brand: req.query.brand,
    year: req.query.year,
  };
  try {
    res.send(fuse.search(pattern)[0]["item"]["url"]);
  } catch (error) {
    res.send("0");
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
