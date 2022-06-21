const express = require("express")
const path = require("path")
const PORT = 3001; 
const app = express();
const fs = require ("fs");
const uuid = require('./helpers/uuid');
const allData = require("./db/db.json")



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
    res.json(notes)
})

app.get("/api/notes/:id", (req, res) => {
    const requestedId = req.params.id
    const item = allData.find(item => item.note_id === requestedId)
    if (item) return res.json(item);
    return res.json("No match found")
})

app.post("/api/notes", (req, res) => {
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
        res.status(201).json(response)
    } else {
        res.status(500).json("Error in posting note")
    }
})

app.delete("/api/notes", (req, res) => {

})


app.listen(PORT, () =>
    console.log(`Example app listening at http://localhost:${PORT}`)
)