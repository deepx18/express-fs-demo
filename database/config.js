import mongoose from "mongoose";
import dotenv from "dotenv";
import process from "process";
import {resolve} from "path";
import express from "express";
import router from "../routes/students.js";

const app = express();

dotenv.config({path : resolve('./.env')});

const MONGO_URL = process.env.MONGO_URL ;
// const PORT = process.env.PORT || 3000;

mongoose 
.connect(MONGO_URL)

const studentschema = new mongoose.Schema({
    name:String,
    city : String,
    email:String,
    field:String,   
});    

const studentmodel = mongoose.model('students',studentschema);

export default studentmodel;