const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

let games = [];
let teams = [];
let competitors = [];
let matches = [];

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
