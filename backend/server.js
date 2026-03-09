import fs from 'fs';
import db from './config/db.js';

// Read and execute init.sql when server starts
const initSQL = fs.readFileSync('./config/init.sql', 'utf8');
const statements = initSQL.split(';').filter(stmt => stmt.trim());

let completed = 0;
statements.forEach(statement => {
    db.query(statement, (err) => {
        if(err) console.error("Database init failed:", err);
        completed++;
        if(completed === statements.length) {
            console.log("Database tables initialized");
        }
    });
});

import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';  
import authRoute from './routes/auth.js';

dotenv.config()

const app = express(); 
app.use(express.json());
app.use(cors());

app.use('/api/auth', authRoute);


//PORT connection on 5000
const port = process.env.PORT;
app.listen(port, () =>{
    console.log("Backend is running on port 5000");
    console.log("Visit the localhost:5000/ to see the server");
});