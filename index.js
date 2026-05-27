const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

let games = [
  {
    id: 1,
    name: "Valorant",
    category: "FPS"
  },
  {
    id: 2,
    name: "League of Legends",
    category: "MOBA"
  }
];

let teams = [
  {
    id: 1,
    name: "3º Informática A",
    points: 9
  },
  {
    id: 2,
    name: "2º Desenvolvimento",
    points: 6
  }
];

let competitors = [
  {
    id: 1,
    name: "Ana",
    age: 17,
    teamId: 1
  }
];

let matches = [
  {
    id: 1,
    team1: "3º Informática A",
    team2: "2º Desenvolvimento",
    gameId: 1,
    score1: 2,
    score2: 1,
    status: "finished"
  }
];

const nextId = arr => arr.length ? arr[arr.length - 1].id + 1 : 1;

/* GAMES */
app.get('/games', (req, res) => res.json(games));
app.post('/games', (req, res) => {
  const obj = { id: nextId(games), ...req.body };
  games.push(obj);
  res.json(obj);
});

/* TEAMS */
app.get('/teams', (req, res) => res.json(teams));
app.post('/teams', (req, res) => {
  const obj = { id: nextId(teams), ...req.body };
  teams.push(obj);
  res.json(obj);
});

/* COMPETITORS */
app.get('/competitors', (req, res) => res.json(competitors));
app.post('/competitors', (req, res) => {
  const obj = { id: nextId(competitors), ...req.body };
  competitors.push(obj);
  res.json(obj);
});

/* MATCHES */
app.get('/matches', (req, res) => res.json(matches));

app.post('/matches', (req, res) => {
  const obj = {
    id: nextId(matches),
    score1: 0,
    score2: 0,
    status: "scheduled",
    ...req.body
  };
  matches.push(obj);
  res.json(obj);
});

app.put('/matches/:id', (req, res) => {
  const m = matches.find(x => x.id == req.params.id);
  Object.assign(m, req.body);
  res.json(m);
});

app.listen(3000, () => console.log("API rodando"));
