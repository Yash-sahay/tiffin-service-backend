const express = require('express');
const app = express();
bodyParser = require('body-parser');
require('./db/config');
const { apiResponse } = require('./src/common/apiResponse');
const path = require('path');

const cors = require('cors');

app.use(bodyParser.json({ limit: '10mb' }));
app.use(
    bodyParser.urlencoded({
        limit: '10mb',
        extended: true,
        parameterLimit: 50000,
    })
);

app.use(express.json());
app.use(cors());


app.use('/temp-resources', express.static(path.join(__dirname, '/temp-resources')));
app.use('/resources', express.static(path.join(__dirname, '/resources')));

const userRouter = require('./src/routes/userRoutes');
const testRouter = require('./src/routes/testRoute');
const subjectRouter = require('./src/routes/subjectRoute');
const questionRouter = require('./src/routes/questionRoute');
const reviewRouter = require('./src/routes/reviewRoute');
const setRouter = require('./src/routes/setRoute');
const roleRoute = require('./src/routes/roleRoute');
const menuRoute = require('./src/routes/menuRoute');
const orderRoute = require('./src/routes/orderRoute');
const latestOrderMenuRoute = require('./src/routes/latestOrderMenuRoute');
const uploadDocRoute = require('./src/routes/uploadDocRoute');

app.use('/user', userRouter);
app.use('/test', testRouter);
app.use('/subject', subjectRouter);
app.use('/question', questionRouter);
app.use('/review', reviewRouter);
app.use('/set', setRouter);
app.use('/role', roleRoute);
app.use('/menu', menuRoute);
app.use('/order', orderRoute);
app.use('/latestOrderMenu', latestOrderMenuRoute);
app.use('/doc', uploadDocRoute);

app.use((req, res, next) => {
    res.status(apiResponse.notFound).json({ error: 'Api url is not valid please check url' });
})

app.listen(5000, () => {
    console.log("Server started on port no 5000");
});