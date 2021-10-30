const express = require('express');
const morgan = require('morgan')
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path')

const app = express();
app.use(cors())

const { authRouter } = require('./controllers/authController'); 
const { authMiddleware } = require('./middlewares/authMiddleware'); 
const { userRouter } = require('./controllers/usersController'); 

app.use(express.json());
app.use(morgan('tiny'));

app.use(express.static(__dirname + '/build'))

app.get('/', function(req, res) {
	res.sendFile(path.join(__dirname + '/build/index.html'))
})

app.use('/auth', authRouter);
app.use(authMiddleware);
app.use('/users', userRouter);

const start = async () => {
    try {
        await mongoose.connect('mongodb+srv://testuser:testpass@cluster0.lpyof.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
            useNewUrlParser: true, useUnifiedTopology: true
        });
    
        // app.listen(process.env.PORT || 5000);
        app.listen(5000);
    } catch (err) {
        console.error(`Error on server startup: ${err.message}`);
    }
}

start();