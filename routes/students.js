import studentmodel from "../database/config.js";
import express from "express";

const router = express.Router({ mergeParams: true });

// afficher tous les students
router.get('/afficher', async (req, res) => {
  const student = await studentmodel.find(
    {},
    { name: 1, city: 1, email: 1, field: 1, _id: 1 }
  );

  res.render("students/index", {students: student});
});

router.get("/create", (req, res) => {
  res.render("students/create");
});

router.post("/store",async(req,res)=>{
    const newstudent = new studentmodel(req.body);
    const savedStudent = await newstudent.save();

    const StudentReponse = {
        id : savedStudent._id,
        name : savedStudent.name,
        city : savedStudent.city,
        email : savedStudent.email,
        field : savedStudent.field,
    }
    res.redirect('/afficher');
})    

router.delete('/supprimer/:id',async(req,res)=>{
    try{
        const id = req.params.id
        const studentId = await studentmodel.findById(id)
    
        if(!studentId){
            res.json({message : "not student "})
        }    
    
        await studentmodel.findByIdAndDelete(id)
        res.redirect('/afficher');

    }catch(err){
        console.log(err)
         res.status(500).json({mesage : "error pour supprimer cet user"})
    }     
})    

router.put('/update/:id',async(req,res)=>{
    const id = req.params.id
   
    try{
        const modStudent = await studentmodel.findById(id)
    
        if(!modStudent){
            res.json({message : "cet student existe pas !!"})
        }    
        
        
        modStudent.name = req.body.name
        modStudent.city = req.body.city
        modStudent.email = req.body.email
        modStudent.field = req.body.field
        
        await studentmodel.findByIdAndUpdate(
            id,
            modStudent
        )    

        res.redirect('/afficher');
    }catch(err) {
        console.log("erreur",err)
        res.status(500).json('error pour modifier cet users !! ')
    }    
})    

router.get("/edit/:id", async (req, res) => {
  const id = req.params.id;  
  const studentOne = await studentmodel.findById(id);

  if (!studentOne) {
    return res.send("student not found");  
  }  

  res.render('students/edit', { student: studentOne });
}); 



export default router;