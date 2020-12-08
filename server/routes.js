/* eslint-disable no-console */
/* eslint no-unused-vars: ["error", { "args": "none" }] */
const express = require('express');
const path = require("path"); // eslint-disable-line global-require
const bodyParser = require('body-parser');
const knexConfig = require('./knexfile');
const knex = require('knex')(knexConfig[process.env.NODE_ENV || 'development']);
const { Model, ValidationError } = require('objection');
const cors = require('cors');

//tables
const User = require('./models/User');
const TeamAccess = require('./models/TeamAccess');
const Team = require('./models/Team');
const Game = require('./models/Game');
const Inning = require('./models/Inning');
const Lineup = require('./models/Lineup');
const Player = require('./models/Player');
const Play = require('./models/Play');

Model.knex(knex);
const { wrapError, DBError } = require('db-errors');
const buildPath = path.resolve(__dirname, "../client/build");
const app = express();

const corsOptions = {
  methods: ['GET', 'PUT', 'POST', 'DELETE'],
  origin: '*',
  allowedHeaders: ['Content-Type', 'Accept', 'X-Requested-With', 'Origin'],
};


if (process.env.NODE_ENV === "production") {

  app.use(express.static(buildPath));
}

app.use(cors(corsOptions));
app.use(bodyParser.json());

//ROUTES---------------------------------------------------------------------
//Get
app.get("/api/users", (request, response, next) => {
  User.query().then(user => {
    response.send(user);
  }, next); // <- Notice the "next" function as the rejection handler
});

app.get("/api/teamaccess", (request, response, next) => {
  TeamAccess.query().then(access => {
    response.send(access);
  }, next); // <- Notice the "next" function as the rejection handler
});

app.get("/api/teams", (request, response, next) => {
  Team.query().then(team => {
    response.send(team);
  }, next); // <- Notice the "next" function as the rejection handler
});

app.get("/api/games", (request, response, next) => {
  Game.query().then(game => {
    response.send(game);
  }, next); // <- Notice the "next" function as the rejection handler
});

app.get("/api/innings", (request, response, next) => {
  Inning.query().then(inning => {
    response.send(inning);
  }, next); // <- Notice the "next" function as the rejection handler
});

app.get("/api/lineups", (request, response, next) => {
  TeamAccess.query().then(lineup => {
    response.send(lineup);
  }, next); // <- Notice the "next" function as the rejection handler
});

app.get("/api/players", (request, response, next) => {
  Player.query().then(player => {
    response.send(player);
  }, next); // <- Notice the "next" function as the rejection handler
});

app.get("/api/players/:teamId", (request, response, next) => {
  Player.query()
    .where("teamId", request.params.teamId)
    .then(players => {
      response.send(players);
    }, next); // <- Notice the "next" function as the rejection handler
});

app.get("/api/plays", (request, response, next) => {
  Play.query().then(play => {
    response.send(play);
  }, next); // <- Notice the "next" function as the rejection handler
});

app.get(
  "/api/teamaccess/:userId/",
  (request, response, next) => {
    TeamAccess.query()
      .where("userId", request.params.userId)
      .then(access => {
        response.send(access);
      }, next); // <- Notice the "next" function as the rejection handler
  }
);

app.get("/api/lineups/:gameId/",
(request, response, next) => {
  Lineup.query()
    .where("gameId", request.params.gameId)
    .then(lineup => {
      response.send(lineup);
    }, next); // <- Notice the "next" function as the rejection handler
})

app.get("/api/innings/:gameId/",
(request, response, next) => {
  Inning.query()
    .where("gameId", request.params.gameId)
    .then(lineup => {
      response.send(lineup);
    }, next); // <- Notice the "next" function as the rejection handler
})

//Post
app.post(
  "/api/users",
  (request, response, next) => {
    User.query()
      .insertAndFetch(request.body)
      .then(newUser => {
        response.send(newUser);
      }, next);
  }
);

app.post(
  "/api/players",
  (request, response, next) => {
    Player.query()
      .insertAndFetch(request.body)
      .then(newPlayer => {
        response.send(newPlayer);
      }, next);
  }
);

app.post(
  "/api/games",
  (request, response, next) => {
    Game.query()
      .insertAndFetch(request.body)
      .then(newGame => {
        response.send(newGame);
      }, next);
  }
);

app.post(
  "/api/lineups",
  (request, response, next) => {
    Lineup.query()
      .insertAndFetch(request.body)
      .then(newGame => {
        response.send(newGame);
      }, next);
  }
);

app.post(
  "/api/teamaccess",
  (request, response, next) => {
    TeamAccess.query()
      .insertAndFetch(request.body)
      .then(newPlayer => {
        response.send(newPlayer);
      }, next);
  }
);

app.post(
  "/api/innings",
  (request, response, next) => {
    Inning.query()
      .insertAndFetch(request.body)
      .then(newPlayer => {
        response.send(newPlayer);
      }, next);
  }
);

app.post(
  "/api/plays",
  (request, response, next) => {
    Play.query()
      .insertAndFetch(request.body)
      .then(newPlay => {
        response.send(newPlay);
      }, next);
  }
);

//Put
app.put("/api/users/:id", (request, response, next) => {
  const { id, ...updatedItem } = request.body;
  if (id !== parseInt(request.params.id, 10)) {
    throw new ValidationError({
      statusCode: 400,
      message: "URL id and request id do not match"
    });
  }
  User.query()
    .updateAndFetchById(id, updatedItem)
    .then(person => {
      response.send(person);
    }, next);
});

app.put("/api/innings/:id", (request, response, next) => {
  const { id, ...updatedItem } = request.body;
  if (id !== parseInt(request.params.id, 10)) {
    throw new ValidationError({
      statusCode: 400,
      message: "URL id and request id do not match"
    });
  }
  Inning.query()
    .updateAndFetchById(id, updatedItem)
    .then(inning => {
      response.send(inning);
    }, next);
});

app.put("/api/games/:id", (request, response, next) => {
  const { id, ...updatedItem } = request.body;
  if (id !== parseInt(request.params.id, 10)) {
    throw new ValidationError({
      statusCode: 400,
      message: "URL id and request id do not match"
    });
  }
  Game.query()
    .updateAndFetchById(id, updatedItem)
    .then(game => {
      response.send(game);
    }, next);
});

//Delete
app.delete(
  "/api/players/:id",
  (request, response, next) => {
    Player.query()
      .deleteById(request.params.id)
      .then(() => {
        response.send(200);
      }, next);
  }
);

app.delete(
  "/api/teamaccess/:id",
  (request, response, next) => {
    TeamAccess.query()
      .deleteById(request.params.id)
      .then(() => {
        response.send(200);
      }, next);
  }
);

//-------------------------------------------------------------------------
app.use((error, request, response, next) => {
  if (response.headersSent) {
    next(error);
  }
  console.log(error);
  const wrappedError = wrapError(error);
  if (wrappedError instanceof DBError) {
    response.status(400).send(wrappedError.data || wrappedError.message || {});
  } else {
    response
      .status(wrappedError.statusCode || wrappedError.status || 500)
      .send(wrappedError.data || wrappedError.message || {});
  }
});

if (process.env.NODE_ENV === "production") {
  // All remaining requests return the React app, so it can handle routing.
  app.get("*", (request, response) => {
    response.sendFile(path.join(buildPath, "index.html"));
  });
}

module.exports = {
  app,
  knex,
};
