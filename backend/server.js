const express = require("express")
const app = express()
const cors = require("cors")
const mysql = require("mysql")

app.use(express.json());
app.use(cors());

const db=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"crud"
}
)

app.get('/',(req,res)=>{
    const sql = "SELECT * from student";
    db.query(sql,(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})

app.post("/create", (req,res)=>{
    const sql="INSERT INTO student (`name`,`email`,`mobile_no`) VALUES (?)";
    const values=[
        req.body.name,
        req.body.email,
        req.body.mob_no
    ]
    db.query(sql,[values],(err, data)=>{
        if(err) return res.json("Error");
        return res.json(data);
    })
})

app.put("/update/:id", (req,res)=>{
    const sql="update student set `name` =?, `email` =?, `mobile_no` =? where ID =? "
    const values=[
        req.body.name,
        req.body.email,
        req.body.mob_no
    ]
    const id= req.params.id;
    db.query(sql,[...values,id],(err, data)=>{
        if(err) return res.json("Error");
        return res.json(data);
    })
})

app.delete("/student/:id", (req,res)=>{
    const sql="DELETE FROM student WHERE ID =? ";
    const id= req.params.id;
    db.query(sql,[id],(err, data)=>{
        if(err) return res.json("Error");
        return res.json(data);
    })
})

app.listen(8081,()=>{
    console.log("listening to 8081")
})