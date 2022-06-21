const express = require("express")
const path = require("path")
const PORT = 3001; 
const app = express();
// importing our db.json file
const everyNote = require("./db/db.json")
const fs = require ("fs")

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


app.get("/api/notes", (req, res) => res.json(everyNote));

// function to save the note to the left side of the page
function saveNewNote (body, allNotes){
    const noteBody = body
    allNotes.push(noteBody)
    fs.writeFileSync(path.join(__dirname, "./db/db.json"),
        JSON.stringify(allNotes, null, 2));
        return noteBody
}

app.post("/api/notes", (req, res) => {
    const makeNewNote = saveNewNote(req.body, everyNote)
    console.log(makeNewNote)
    res.json(makeNewNote)
})

app.delete("/api/notes", (req, res) => {

})


app.listen(PORT, () =>
    console.log(`Example app listening at http://localhost:${PORT}`)
)