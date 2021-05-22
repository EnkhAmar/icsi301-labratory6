const express = require("express");
const app = express();

let emp = [{name: 'Enkh-Amar', email: '18b1num0399@stud.num.edu.mn', phone: 88441195}, {name: 'someone', email: 'example@email.com', phone: 80808080}];

app.set("view engine", "ejs");
app.use(express.static('public'));
app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.render("index");
});


app.get("/employee", (req, res) => {
    return res.json(emp);
})

app.post("/employee/add", (req, res) => {
    let newName = req.body.name
    let newEmail = req.body.email
    let newPhone = req.body.phone
    emp.push({ name: newName, email: newEmail, phone: newPhone });
    res.redirect('/')
})

app.delete("/employee/delete/:name", (req, res) => {
    let index = emp.indexOf(emp.find(item => item.name == req.params.name))
    emp.splice(index, index + 1)
    return res.json({ success: true })
})

app.post("/employee/update", (req, res) => {
    let index = emp.indexOf(emp.find(item => item.name == req.body.oldName))
    console.log(req.body)
    emp[index] = req.body;
    res.redirect('/')
})

app.listen(3000, () => console.log("Server Up and running"));