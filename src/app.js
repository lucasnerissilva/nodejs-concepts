const express = require("express");
const cors = require("cors");

const { uuid, isUuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

const checkUUID = () => {
  return (req, res, next) => {
    const { id } = req.params;

    if (!isUuid(id))
      return res.status(400).send({
        success: false,
        error: "invalid UUID type"
      });

    return next();
  };
};

app.get("/repositories", (request, response) => {
  // TODO
});

app.post("/repositories", (request, response) => {
  // TODO
});

app.put("/repositories/:id", checkUUID(), (request, response) => {
  // TODO
});

app.delete("/repositories/:id", checkUUID(), (request, response) => {
  // TODO
});

app.post("/repositories/:id/like", checkUUID(), (request, response) => {
  // TODO
});

module.exports = app;
