const express = require("express");
const cors = require("cors");

const { uuid, isUuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

const buildResponseWithBadRequestStatus = (response, message) => {
  return response.status(400).send({
    error: message,
  });
};

const checkUUID = () => {
  return (req, res, next) => {
    const { id } = req.params;

    if (!isUuid(id))
      return buildResponseWithBadRequestStatus(res, "invalid UUID type");

    return next();
  };
};

const checkRepositoryPayload = () => {
  return (req, res, next) => {
    const { title, url, techs } = req.body;

    if (!title)
      return buildResponseWithBadRequestStatus(res, "title is required");

    if (!url) return buildResponseWithBadRequestStatus(res, "url is required");

    if (!techs || !techs.length)
      return buildResponseWithBadRequestStatus(res, "techs is required");

    return next();
  };
};

app.get("/repositories", (request, response) => {
  // TODO
  if (repositories && repositories.length)
    return response.status(200).send(repositories);

  return response.status(204).send();
});

app.post("/repositories", checkRepositoryPayload(), (request, response) => {
  // TODO
  const { title, url, techs } = request.body;
  const repository = { title, url, techs, id: uuid(), likes: 0 };

  repositories.push(repository);

  return response.status(201).send(repository);
});

app.put("/repositories/:id", checkUUID(), (request, response) => {
  // TODO
  const { id } = request.params;

  const { title, url, techs } = request.body;

  const repository = repositories.find((r) => r.id === id);

  if (!repository)
    return buildResponseWithBadRequestStatus(response, "repository not found");

  if (title) repository.title = title;
  if (url) repository.url = url;
  if (techs) repository.techs = techs;

  return response.status(200).send(repository);
});

app.delete("/repositories/:id", checkUUID(), (request, response) => {
  // TODO
  const { id } = request.params;

  let repository = repositories.find((r) => r.id === id);

  if (!repository)
    return buildResponseWithBadRequestStatus(res, "repository not found");

  const index = repositories.indexOf(repository);

  repositories.splice(index, 1);

  return response.status(204).send();
});

app.post("/repositories/:id/like", checkUUID(), (request, response) => {
  // TODO
  const { id } = request.params;

  let repository = repositories.find((r) => r.id === id);

  if (!repository)
    return buildResponseWithBadRequestStatus(res, "repository not found");

  repository.likes++;

  return response.status(201).send(repository);
});

module.exports = app;
