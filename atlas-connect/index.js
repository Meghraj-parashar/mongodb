// This is a simple Express server that connects to a MongoDB Atlas database using Mongoose.
// It listens on a specified port and responds with "Hello World!" when the root URL is accessed.
const express = require('express');
const mongoose = require('mongoose');
 
const app = express();
const PORT = process.env.PORT || 3000;
//middleware
app.use(express.json());
const MONGODB_URI = process.env.MONGODB_URI || "mongodb+srv://meghrajparashar:meghraj@cluster0.yfhco00.mongodb.net/megh?retryWrites=true&w=majority";
mongoose.connect(MONGODB_URI).then(console.log("mongodb succesfully connected")).catch((e)=>console.log("not connected"))


const student_schema= mongoose.Schema({
  name:{
    type:String,
    required:true,
    unique:true
  },
  age:{
    type:Number,
    min:0,
    max:50
  },
  luck:Number
})

//creating the collection of student after making its schema
const student_model = new mongoose.model("student",student_schema)

async function crate_student (name){
  try{
  const student= new student_model({name:name,
    age:20,
    luck:100
  })
  const result = await student.save();
  console.log("collection is made and documnet is saved at mongodb",result)}
  catch(e){
    console.error("error in creating a student",e.message)
  }
}
async function read_student() {
  const student =await student_model.find()
  console.log("findied the collections",student)
  
}
async function update_student(id) {
  const student = await student_model.findByIdAndUpdate(id,{name:"Meghraj parshar"},{new:true});

    // const student = await student_model.findByIdAndDelete("680e02ef77e734c2680f135a")
  console.log("deleted the jai",student)

}
async function delete_student() {
  const student = await student_model.findByIdAndDelete('680e0299b03bf6903c0595f3')  
}
                      //Uncomment any function you want to run 
// delete_student()
// update_student('680e02a11427e89f0945ad12')
// read_student()
crate_student("ragav")



app.get('/', (req, res) => {
  res.send('Hello World!');
});
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})