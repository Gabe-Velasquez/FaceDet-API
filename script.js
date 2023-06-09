const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const cors = require('cors');
const knex = require('knex');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
    client: 'pg',
    connection: {
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false },
      host: process.env.DATABASE_HOST,
      port: 5432,
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PW,
      database: process.env.DATABASE_DB
    }
  });

//   db.select('*').from('users').then(data => {
//   });
// const db = require('knex')({
//     client: 'pg',
//     connection: process.env.PG_CONNECTION_STRING,
//     searchPath: ['knex', 'public'],
//   });
const app = express();
app.use(cors());
app.use(express.json());

// app.get('/', (req, res)=>{
//     res.send(database.users);
// })
app.get('/', (req, res)=> { res.send('It is working!') })
app.post ('/signin', (req, res) => { signin.handleSignin(req, res, db, bcrypt) })
app.post('/register', (req,res) => { register.handleRegister(req, res, db, bcrypt) })
app.get('/profile/:id', (req, res) => {profile.handleProfileGet (req, res, db)})
app.put('/image', (req, res) => { image.handleImage(req,res,db)})

app.listen(process.env.PORT || 3000, ()=> {
  console.log(`app is running on port ${process.env.PORT} `)
})