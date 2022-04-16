const express = require("express");
const router = express.Router();
var fetchuser = require("../middleware/fetchuser");
const Note = require("../models/Note");
const { body, validationResult } = require("express-validator");

//ROUTE 1 :Get all  the notes :GET  "/api/auth/getuser". require Auth
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    //catch errors
    console.error(error.message);
    res.status(500).send("some error occurred");
  }
});

//ROUTE 2 :Add a new Note :POST  "/api/auth/addnote". require Auth
router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "Enter a valid title").isLength({ min: 5 }),
    body("description", "Description must be atleast 5 Character").isLength({min: 5})
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      //if there are error , return bad request and the errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const note = new Note({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const saveNote = await note.save();
      res.json(saveNote);
    } catch (error) {
      //catch errors
      console.error(error.message);
      res.status(500).send("some error occurred");
    }
  }
);

module.exports = router;
