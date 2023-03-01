let express = require("express");
let bodyparser = require("body-parser");
let fs = require("fs");
let app = express();
let mysql = require('mysql');



// syntax start (need to be perfect syntax)
app.use(bodyparser.json({ limit: '100mb' }));
app.use(bodyparser.urlencoded({ limit: '100mb', extended: true }));
app.use(express.json());
// syntax end


// w3school syntax start
let con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "college"
});
// W3SCHOOL end

app.get("/", (req, res) => {
    res.end("Welcome To API");
})


app.post("/students", (req, res) => {
    let body = req.body;
    // console.log(body);
    let sql = `INSERT INTO students(rollno,name,percentage) VALUES(${body.rollno},'${body.name.replace(/'/g, "''")}',${body.percentage})`;

    con.connect((err) => {
        if (err) {
            res.end(JSON.stringify({ status: "failed", data: err }));
        }
        con.query(sql, (err, result) => {
            if (err) {
                res.end(JSON.stringify({ status: "failed", data: err }));
            }
            res.end(JSON.stringify({ status: "success", data: result }));
        })
    })
})

app.get("/students", (req, res) => {
    let body = req.body;

    let sql = 'SELECT * FROM students';

    con.connect((err) => {
        if (err) {
            res.end(JSON.stringify({ status: "failed", data: err }));
        }
        con.query(sql, (err, result) => {
            if (err) {
                res.end(JSON.stringify({ status: "failed", data: err }));
            }
            res.end(JSON.stringify({ status: "success", data: result }))
        })
    })

})


app.get("/students/:id", (req, res) => {
    let body = req.body;
    let sql = `SELECT * FROM students WHERE rollno = ${req.params.id}`;

    con.connect((err) => {
        if (err) {
            res.end(JSON.stringify({ status: "failed", data: err }));
        }
        con.query(sql, (err, result) => {
            if (err) {
                res.end(JSON.stringify({ status: "failed", data: err }));
            }
            res.end(JSON.stringify({ status: "success", data: result }))
        })
    })

})


app.delete("/students/:id", (req, res) => {
    let body = req.body;
    //console.log(body)
    let sql = `DELETE FROM students WHERE rollno = ${req.params.id}`;

    con.connect((err) => {
        if (err) {
            res.end(JSON.stringify({ status: "failed", data: err }));
        }
        con.query(sql, (err, result) => {
            if (err) {
                res.end(JSON.stringify({ status: "failed", data: err }));
            }
            res.end(JSON.stringify({ status: "success", data: result }))
        })
    })

})


app.put("/students/:id", (req, res) => {
    let body = req.body;
    // console.log(body);
    let sql = `UPDATE students SET rollno = ${body.rollno},name= '${body.name.replace(/'/g, "''")}',percentage = ${body.percentage} WHERE rollno = ${req.params.id}`;

    con.connect((err) => {
        if (err) {
            res.end(JSON.stringify({ status: "failed", data: err }));
        }
        con.query(sql, (err, result) => {
            if (err) {
                res.end(JSON.stringify({ status: "failed", data: err }));
            }
            res.end(JSON.stringify({ status: "success", data: result }));

        })
    })
})





app.listen(8081, () => {
    console.log("API running on http://localhost:8081/");
});