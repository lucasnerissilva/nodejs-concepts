const express = require("express");
const cors = require("cors");

const { uuid, isUuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

const buildResponse = (response, status) => {
  return response.status(status).send();
};

const buildResponseWithError = (response, status, message) => {
  if (message)
    return response.status(status).send({
      error: message,
    });

  return response.status(status).send();
};

const buildResponseWithReturn = (response, status, apiReturn) => {
  return response.status(status).send(apiReturn);
};

const checkUUID = () => {
  return (req, res, next) => {
    const { id } = req.params;

    if (!isUuid(id))
      return buildResponseWithError(res, 400, "invalid UUID type");

    return next();
  };
};

const checkRepositoryPayload = () => {
  return (req, res, next) => {
    const { title, url, techs } = req.body;

    if (!title) return buildResponseWithError(res, 400, "title is required");

    if (!url) return buildResponseWithError(res, 400, "url is required");

    if (!techs || !techs.length)
      return buildResponseWithError(res, 400, "techs is required");

    return next();
  };
};

app.get("/repositories", (request, response) => {
  // TODO
  if (repositories && repositories.length)
    return buildResponseWithReturn(response, 200, repositories);

  return buildResponse(response, 204);
});

app.post("/repositories", checkRepositoryPayload(), (request, response) => {
  // TODO
  const { title, url, techs } = request.body;
  const repository = { title, url, techs, id: uuid(), likes: 0 };

  repositories.push(repository);

  return buildResponseWithReturn(response, 201, repository);
});

app.put("/repositories/:id", checkUUID(), (request, response) => {
  // TODO
});

app.delete("/repositories/:id", checkUUID(), (request, response) => {
  // TODO
  const { id } = request.params;

  let repository = repositories.find((r) => r.id === id);

  if (!repository)
    return buildResponseWithError(response, 400, "repository not found");

  const index = repositories.indexOf(repository);

  repositories.splice(index, 1);

  return buildResponse(response, 204);
});

app.post("/repositories/:id/like", checkUUID(), (request, response) => {
  // TODO
});

module.exports = app;
