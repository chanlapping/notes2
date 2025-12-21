const express = require("express");
const app = express();

let notes = [
  {
    id: "1",
    content: "HTML is easy",
    important: true,
  },
  {
    id: "2",
    content: "Browser can execute only JavaScript",
    important: false,
  },
  {
    id: "3",
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true,
  },
];

app.get("/", (req, res) => {
  res.send("<h1>Hello World</h1>");
});

app.get("/notes", (req, res) => {
  res.json(notes);
});

app.get("/notes/:id", (req, res) => {
  const id = req.params.id;
  const note = notes.find((n) => n.id === id);
  if (note) {
    res.json(note);
  } else {
    res.sendStatus(404);
  }
});

app.delete("/notes/:id", (req, res) => {
  const id = req.params.id;
  notes = notes.filter((note) => note.id !== id);
  res.sendStatus(204);
});

const PORT = 3001;
app.listen(PORT, () => console.log(`server listening on port ${PORT}`));
