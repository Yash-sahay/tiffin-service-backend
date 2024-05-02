const express = require('express');
const app = express();
bodyParser = require('body-parser');
require('./db/config');
const { apiResponse } = require('./src/common/apiResponse');

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

const userRouter = require('./src/routes/userRoutes');
const testRouter = require('./src/routes/testRoute');
const subjectRouter = require('./src/routes/subjectRoute');
const questionRouter = require('./src/routes/questionRoute');
const reviewRouter = require('./src/routes/reviewRoute');
const setRouter = require('./src/routes/setRoute');
const roleRoute = require('./src/routes/roleRoute');

app.use('/user', userRouter);
app.use('/test', testRouter);
app.use('/subject', subjectRouter);
app.use('/question', questionRouter);
app.use('/review', reviewRouter);
app.use('/set', setRouter);
app.use('/role', roleRoute);

app.use((req, res, next) => {
    res.status(apiResponse.notFound).json({ error: 'Api url is not valid please check url' });
})

app.listen(3000, () => {
    console.log("Server started on port no 3000");
});