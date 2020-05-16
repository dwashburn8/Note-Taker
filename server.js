const express = require("express");
const path= require("path")
const notes = require("./public/notes")
const fs =require("fs")


const app = express();

const PORT = process.env.PORT || 8118;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname + "public")));
app.use("/styles",  express.static(__dirname + '/public/stylesheets'));
app.use("/scripts", express.static(__dirname + '/public/javascripts'));


app.listen(PORT, ()=> {
    console.log("Server Listening");
    
})


app.get("/", (req, res)=>{
    res.sendFile(__dirname + "/public/index.html")
})

app.get("/notes", (req, res)=>{
    res.sendFile(__dirname + "/public/notes.html")
})

app.get("/api/notes", (req, res)=> {
   

    fs.readFile("./db.json", "utf8", function(err, results){
        if(err) throw err
        res.json(JSON.parse(results))
        
    });


});

app.post("/api/notes", (req, res)=> {
    fs.readFile("./db.json", "utf8", function(err, results){
        if(err) throw err
        let savedData=JSON.parse(results)
        let newNote=req.body
        if(savedData.length>0){
        savedData.push(newNote)
        fs.writeFile("./db.json",JSON.stringify(savedData),function(err){
            if(err)throw err
        })
    }
    })

    
})

app.delete("/api/notes/:id", (req, res) => {
    fs.readFile("./db.json", "utf8", function(err, results){
        if(err) throw err
        let savedData=JSON.parse(results)
        console.log(req.params.id);
        
        let removeIndex= savedData.map(function(item){
            return item.id
        }).indexOf((req.params.id))
        console.log(removeIndex);
        
        savedData.splice(removeIndex,1)
        fs.writeFile("./db.json",JSON.stringify(savedData),function(err){
            if(err)throw err
        })
        
    })



})


