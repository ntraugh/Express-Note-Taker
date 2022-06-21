const express = require("express")
const path = require("path")
const PORT = 3001; 
const app = express();
// importing our db.json file
const everyNote = require("./db/db.json")
const fs = require ("fs");
const uuid = require('./helpers/uuid');
const { json } = require("express");


// accept form part data, accept json, and allow pages to show 
app.use(express.urlencoded({ extended: true}))
app.use(express.json())
app.use(express.static("public"))

// this is just "/" because it is our main page
app.get("/", (req, res) =>
    res.sendFile(path.join(__dirname, "public/index.html"))
)

app.get("/notes", (req, res) =>
    res.sendFile(path.join(__dirname, "public/notes.html"))
)


app.get("/api/notes", (req, res) => {
    const noteData = fs.readFileSync("./db/db.json", "utf-8");
    const notes = noteData.length ? JSON.parse(noteData) : [];
    return res.json(notes)
})

// // function to save the note to the left side of the page
// function saveNewNote (body, allNotes){
//     const noteBody = body
//     allNotes.push(noteBody)
//     fs.writeFileSync(path.join(__dirname, "./db/db.json"),
//         JSON.stringify(allNotes, null, 2));
//         return noteBody
// }

app.post("/api/notes", (req, res) => {
    // const makeNewNote = saveNewNote(req.body, everyNote)
    // console.log(makeNewNote)
    // res.json(makeNewNote)
    console.info(`${req.method} request received to add note`)
    const { title, text } = req.body
    if(title && text){
        const newNote = {
            title, 
            text,
            note_id: uuid()
        }
        const noteData = fs.readFileSync("./db/db.json", "utf-8");
        const notes = noteData.length ? JSON.parse(noteData) : [];
        notes.push(newNote)
        // convert data to a string to save it
        const noteString = JSON.stringify(notes, null, 2)
        fs.writeFile(`./db/db.json`, noteString, (err) => 
            err
                ? console.error(err)
                : console.log(
                    `A new note with the text of ${newNote.text} has been created`
                    )
        )
        const response = {
            status: "success",
            body: newNote,
        }
        console.log(response)
    }
})

app.delete("/api/notes", (req, res) => {

})


app.listen(PORT, () =>
    console.log(`Example app listening at http://localhost:${PORT}`)
)