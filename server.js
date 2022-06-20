const express = require("express")
const path = require("path")
const PORT = 3001; 
const app = express();
// importing our db.json file
const everyNote = require("./db/db.json")


app.use(express.static("public"))

// this is just "/" because it is our main page
app.get("/", (req, res) =>
    res.sendFile(path.join(__dirname, "public/index.html"))
)

app.get("/notes", (req, res) =>
    res.sendFile(path.join(__dirname, "public/notes.html"))
)


app.get("/api/notes", (req, res) => {
    res.json(everyNote)
})






app.listen(PORT, () =>
    console.log(`Example app listening at http://localhost:${PORT}`)
)