import bcrypt from 'bcrypt';
import db from '../config/db.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import * as mail from '../utils/mailer.js';
import { getServerSessionMeta } from '../utils/serverSession.js';
dotenv.config();

const ALLOWED_ROLES = ['user', 'admin'];
const normalizeRole = (roleValue) => {
    const role = String(roleValue || 'user').toLowerCase();
    return ALLOWED_ROLES.includes(role) ? role : 'user';
};

//user register
const registerUser = async (req, res) =>{
    //Request user data and check missing field
    try{
        const {name, email, password, role} = req.body;
        if (!name || !email || !password){
            return res.status(500).json({message: "Please, Fill all the credentials!"})
        }

        const normalizedRole = normalizeRole(role);

        //check for the user in DB
        db.query("SELECT * FROM users WHERE email = ?", [email], async(err, result) =>{
            if(err){
                return res.status(500).json({message: "Failed to locate existing user", error: err})
            } 

            if (result.length > 0){
                return res.status(400).json({message:"Email already exists!"});
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            db.query("INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)", [name, email, hashedPassword, normalizedRole], 
                async(err, result) => {
                    if(err){
                        return res.status(500).json({message: "Registration Failed!", error: err})
                    } else{
                        // Send welcome email
                        const emailResult = await mail.SendEmail(
                            email,
                            "Welcome to Quickkart!",
                            `Hello ${name},\n\nThank you for registering at Quickkart! We're excited to have you.\n\nHappy shopping!\n\nBest,\nQuickkart Team`
                        );
                        
                        if(emailResult.success){
                            console.log('✓ Welcome email sent to:', email);
                        } else {
                            console.warn('⚠️ Email failed for user:', email);
                        }
                        
                        return res.status(201).json({success: true, message: "User registered successfully", emailSent: emailResult.success})
                    }
                })

            })
            
    } catch(err){
        return res.status(500).json({message: "Database Error", error: err})
    }
}

//user login
const loginUser = async(req, res) =>{
    //check user data and missing fields
    try{
        const {email, password, role} = req.body;
        if(!email || !password || !role){
            return res.status(400).json({message: "Please provide email, password and role!"})
        }
        const selectedRole = normalizeRole(role);

        //check for the user in the database
        db.query("SELECT * FROM users WHERE email = ?", [email], async(err, result) => {
            if(err){
                return res.status(500).json({message: "Failed to match the user email", error: err})
            }
            if(result.length === 0){
                return res.status(500).json({message: "User not found", error: err});
            }

            const user = result[0]
            const validPassword = await bcrypt.compare(password, user.password)

            if(!validPassword){
                return res.status(401).json({message: "Invalid Password"});
            }

            const storedRole = normalizeRole(user.role);
            if (selectedRole !== storedRole) {
                return res.status(403).json({message: `This account is registered as ${storedRole}. Please select ${storedRole} role to continue.`});
            }

            //create jwt token upon correct password
            const token = jwt.sign(
                {id: user.id, email: user.email, role: storedRole},
                process.env.JWT_SECRET,
                {expiresIn : '24h'}
            );

            return res.json({
                success: true,
                message: "Login Successfull",
                token: token,
                ...getServerSessionMeta(),
                user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: storedRole
            }
            })
        })
    } catch(err){
        return res.status(500).json({message: "Database Error", error: err})
    }
};

const getSessionMeta = (req, res) => {
    return res.json(getServerSessionMeta());
};


export { registerUser, loginUser, getSessionMeta };