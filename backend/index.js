const express = require('express');
const db = require('./config/db')
const cors = require('cors')

const app = express();
const  PORT = 3001;
app.use(cors());
app.use(express.json())

// Route to get all posts
app.get("/api/get", (req,res)=>{
	db.query("SELECT * FROM StudentScore", (err,result)=>{
    	if(err) {
    		console.log(err)
    	} 
		res.send(result)
	});   
});

// Route for creating the post
app.patch('/api/update/:id', (req,res)=> {

	const score = req.body.score;
	const id = req.params.id;

	db.query("UPDATE StudentScore SET score = ? WHERE studentId = ?",[score, id], (err,result)=>{
    	if(err) {
   			console.log(err);
		} 
   		console.log(result);
    });    
	res.send();
});

app.listen(PORT, ()=>{
    console.log(`Server is running on ${PORT}`)
})