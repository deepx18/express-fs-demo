import express from "express";
import { resolve } from "path";
import "./database/config.js";
import router from "./routes/students.js";
import methodOverride from "method-override";

const app = express()

app.set('views',resolve('./views'))
app.set('view engine','ejs')

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(methodOverride('_method'));

app.use('/',router);

app.listen(8080,()=>{
    console.log(`server is ${8080}`)
});    


// ( async () => {
//     await console.log(expressListEndpoints(app))
// })();



// app.get('/', (req, res) => {
//   res.render('index', { title: 'Hey', message: 'Hello there!' });    
// });


// app.get('/test',(req,res)=>{
//     res.json({message : "server runing "})    
// })