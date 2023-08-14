import express from "express";
import fs from "fs";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
const _dirname = dirname(fileURLToPath(import.meta.url));
import ejs from "ejs";


const app = express();
const port = 3000;

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));


let oldData = "";
fs.readFile('data.txt', "utf8", (err, data) => {
    if (err) throw err;
    oldData = data;
});

let oldDatatex = "";
fs.readFile('text.txt', "utf8", (err, data) => {
    if (err) throw err;
    oldDatatex = data;
});


app.get("/", (req, res) => {
    fs.readFile('data.txt', "utf8", (err, data) => {
        if (err) throw err;
        const string = data;
        const array = string.split(",");
        res.render("index.ejs", { arrays: `${array}`, });
    });
});


app.post("/submit", (req, res) => {
    const datad = req.body.text + "," + oldData;
    fs.writeFile('data.txt', `${datad}`, (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
        fs.readFile('data.txt', "utf8", (err, data) => {
            if (err) throw err;
            oldData = data;
            const string = data;
            const array = string.split(",");
            res.render("index.ejs", {
                arrays: `${array}`,
            });

        });

    });

});

app.get("/work", (req, res) => {

    fs.readFile('text.txt', "utf8", (err, data) => {
        if (err) throw err;
        const string = data;
        const array = string.split(",");
        res.render("work.ejs", { arrays: `${array}`, });
    });
});

app.post("/work", (req, res) => {
    const datad = req.body.text1 + "," + oldDatatex;
    fs.writeFile('text.txt', `${datad}`, (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
        fs.readFile('text.txt', "utf8", (err, data) => {
            if (err) throw err;
            oldDatatex = data;
            const string = data;
            const array = string.split(",");
            res.render("work.ejs", {
                arrays: `${array}`,
            });

        });

    });

});

app.post("/workDone", (req, res) => {
    const words = req.body;
    const datad = req.body.text1 + "," + oldDatatex;
    fs.writeFile('text.txt', `${datad}`, (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
        fs.readFile('text.txt', "utf8", (err, data) => {
            if (err) throw err;
            oldDatatex = data;
            const string = data;
            const array = string.split(",");
            res.render("work.ejs", {
                arrays: `${array}`,
            });

        });

    });

});


app.listen(port, () => {
    console.log(`listening to port ${port}`);
});