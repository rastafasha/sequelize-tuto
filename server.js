const express = require('express');
const cors = require('cors');
const cookieSession = require("cookie-session");

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

//cors
var corsOptions = {
    origin: "http://localhost:4200" //cors para frontend
};

app.use(cors(corsOptions));


//cookies
app.use(
    cookieSession({
        name: "backend-session",
        secret: "COOKIE_SECRET", // should use as secret environment variable
        httpOnly: true
    })
);


// routers
// const router = require('./routes/productRouter.js');

app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/user', require('./routes/userRouter'));
app.use('/api/product', require('./routes/productRouter'));
app.use('/api/tutorial', require('./routes/tutorialRouter'));
app.use('/api/category', require('./routes/categoryRouter'));


//static Images Folder

app.use('/Images', express.static('./Images'));


//port

const PORT = process.env.PORT || 8080;

//server

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});