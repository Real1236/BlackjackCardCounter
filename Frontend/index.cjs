// eslint-disable-next-line no-undef
const express = require("express");
const app = express();
app.use(express.json());
app.use(express.static("dist"));
const port = 8080;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
