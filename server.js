const express = require('express');
const cors = require('cors');
const cookieSession = require("cookie-session");

const app = express();
const db = require("./models");

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

var corsOptions = {
    origin: "http://localhost:4200" //cors para frontend
};

app.use(cors(corsOptions));

app.use(
    cookieSession({
        name: "bezkoder-session",
        secret: "COOKIE_SECRET", // should use as secret environment variable
        httpOnly: true
    })
);




// routers
// const router = require('./routes/productRouter.js');
// app.use('/api/products', router);
// app.use('/api/auth', router);
// app.use('/api/user', router);

app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/user', require('./routes/userRouter'));
app.use('/api/product', require('./routes/productRouter'));
app.use('/api/tutorial', require('./routes/tutorialRouter'));
app.use('/api/category', require('./routes/categoryRouter'));

// require('./routes/auth.routes')(app);
// require('./routes/userRouter')(app);
// require('./routes/productRouter')(app);
// require('./routes/tutorialRouter')(app);
// require('./routes/categoryRouter')(app);

//static Images Folder

app.use('/Images', express.static('./Images'));


//port

const PORT = process.env.PORT || 8080;

//server

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});