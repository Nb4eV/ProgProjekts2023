const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const sqlite3 = require("sqlite3").verbose();
const port = 3004;

const database = new sqlite3.Database("./db/database.db")

const app = express()

//app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(cors({origin: '*'}))

app.listen(port, () =>
{
  console.log(`Database running on port ${port}`)
})

database.serialize(() =>
{
  database.run(
    `CREATE TABLE IF NOT EXISTS itemList (
      id INTEGER PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      address VARCHAR(255) NOT NULL,
      amount VARCHAR(255) NOT NULL
      );`
  )

  database.get(`SELECT * FROM itemList`, (err, items) =>
  {
    
    if(!items)
    {
      database.run(
        `INSERT INTO itemList (name, address, amount)
        VALUES(
          "Cirvis",
          "Riga",
          "50");
        )`
      )
    }
  
})


app.get("/", (req, res) =>
{
  database.get(`SELECT * FROM itemList`, (err, item) =>
  {
    res.json({itemList: item})
  })
})

app.get("/items", (req, res) =>
{
  database.all(`SELECT * FROM itemList`, (err, items) =>
  {
    res.json(items)
  })
})

app.post('/items', (req, res) => {
  database.run(`
    INSERT INTO itemList (name, address, amount)
    VALUES(
      "${req.body.name}", 
      "${req.body.address}", 
      "${req.body.amount}");
  `)
    res.json('New item added')
  })


})

