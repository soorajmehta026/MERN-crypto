import express from 'express';
import cors from 'cors';
import login from './db/mongod.js';
import { makeaccount } from './db/mongod.js';
import { buy,watchlistdata,sellshare } from './db/mongod.js';
import bcrypt from 'bcrypt'
import database from './db/database.js';
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.listen(process.env.PORT || 5000, () => {
  console.log(`listening on PORT`);
});

app.get('/', (req, res) => {
  res.send("hi");
});


app.post('/login', async (req, res) => {
  try {
    const response = await login(req.body.email);
    console.log(response);
    const isPasswordMatch = await bcrypt.compare(req.body.password, response.password);
    if (isPasswordMatch) {
      res.status(200).json({ name: response.name, email: response.email, success: true, message: 'Login successful!' });
    } else {
      res.status(401).json({ success: false, message: 'Invalid email or password.' });
    }
  } catch (err) {
    console.error('Error occurred:', err.message);
    res.status(500).json({ success: false, message: 'An error occurred during login.' });
  }
});

app.post('/signup', async (req, res) => {
  console.log(req.body);

  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

    const object = {
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword, // Store the hashed password
    };

    const response = await makeaccount(object);
    res.json(response);
  } catch (err) {
    console.log(err);
    res.json(err.response);
  }
});

app.post('/buy',async(req,res)=>{
  console.log(req.body)

  const object={
    email:req.body.email,
    name:req.body.name,
    price:req.body.price,
    quantity:req.body.quantity,
    boughtAt:req.body.boughtAt
  }
console.log(object.quantity);
  try{
    const response= await buy(object);
    
      res.json(response);
    

  }
  catch(err)
  {console.log(err);
   
    
  }
 



})
app.post('/watchlistdata',async (req,res)=>{
 // console.log(req.body)
  try{
    const response= await watchlistdata(req.body);
    res.json(response);
  }
  catch(err)
  {console.log(err);
  }

})

app.delete('/sellshare',async (req,res)=>{
  try{
    const response= await sellshare(req.body);
    res.json(response);
  }
  catch(err)
  {console.log(err);
  }
})
