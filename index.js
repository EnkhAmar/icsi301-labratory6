const express = require("express");

const app = express();

app.set("view engine", "ejs");

app.use(express.static('public'));
app.use(express.json({ extended: true }));

app.get('/', (req, res) => {
    res.render("todo");
});

let employees = [];

app.get("/todo", (req, res) => {
    return res.json(employees);
})

app.post("/todo/add", (req, res) => {
    employees.push({ name: req.body.name, email: req.body.email, phone: req.body.phone });
    return res.json({ success: true })
})

app.delete("/todo/del/:name", (req, res) => {
    let index = employees.indexOf(employees.find(item => item.name == req.params.name))
    employees.splice(index, index + 1)
    return res.json({ success: true })
})

app.put("/todo/upd/:name", (req, res) => {
    let index = employees.indexOf(employees.find(item => item.name == req.params.name))
    employees[index] = req.body;
    return res.json({ success: true })
})

app.listen(3000, () => console.log("Server Up and running"));