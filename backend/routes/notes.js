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
    res.status(500).send("Internal Server Error");
  }
});

//ROUTE 2 :Add a new Note :POST  "/api/auth/addnote". Login required 
router.post("/addnote",fetchuser,[
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
      res.status(500).send("Internal Server Error");
    }
  }
);

//ROUTE 3 :Update an existing Note :PUT  "/api/note/updatenotes". Login required
router.put("/updatenote/:id",fetchuser, async (req, res) => {
  const {title , description , tag } = req.body;
  try {
    //Create a newNote object
      const newNote = {};
      if(title){newNote.title = title};
      if(description){newNote.description = description};
      if(tag){newNote.tag = tag};

      //Find the note to be update and update it;
      let note = await Note.findById(req.params.id);
      if(!note){return res.status(400).send("Not found")};
      if(note.user.toString()!==req.user.id){
        return res.status(401).send("Not Allowed");
      };

      note = await Note.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true});
      res.json(note);
  } catch (error) {
    //catch errors
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
  

});

//ROUTE 4 :Delete an existing Note :Delete  "/api/notes/deletenotes". Login required
router.delete("/deletenote/:id",fetchuser, async (req, res) => {
  try {
    //Find the note to be delete and delete it;
      let note = await Note.findById(req.params.id);
      if(!note){return res.status(404).send("Not found")};

      //Allowe deletion only if user owns this note
      if(note.user.toString()!==req.user.id){
        return res.status(401).send("Not Allowed");
      };
      //Deletion
      note = await Note.findByIdAndDelete(req.params.id);
      res.json({"Success" :"Note has been deleted", note:note});
  } catch (error) {
    //catch errors
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
  

});
module.exports = router;
