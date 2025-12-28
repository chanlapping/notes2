const notesRouter = require("express").Router();
const Note = require("../models/note");

notesRouter.get("/", async (req, res) => {
  const notes = await Note.find({});
  res.status(200).json(notes);
});

notesRouter.get("/:id", async (req, res, next) => {
  const id = req.params.id;
  const note = await Note.findById(id);
  if (note) {
    res.json(note);
  } else {
    res.status(404).end();
  }
});

notesRouter.delete("/:id", async (req, res, next) => {
  const id = req.params.id;
  await Note.findOneAndDelete(id);
  res.status(204).end();
});

notesRouter.post("/", async (req, res, next) => {
  const body = req.body;
  if (!body.content) {
    return res.status(400).json({ error: "content missing" });
  }

  const note = new Note({
    content: body.content,
    important: body.important || false,
  });

  const savedNote = await note.save();
  res.status(201).json(savedNote);
});

notesRouter.put("/:id", (req, res, next) => {
  const { content, important } = req.body;
  Note.findById(req.params.id)
    .then((note) => {
      if (!note) {
        return res.status(404).end();
      }

      note.content = content;
      note.important = important;

      return note.save().then((savedNote) => {
        res.json(savedNote);
      });
    })
    .catch((error) => next(error));
});

module.exports = notesRouter;
