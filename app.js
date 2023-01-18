const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const db = require('./models');

const professorRouter = require('./routers/professorRouter');
const studentRouter = require('./routers/studentRouter');
const majorRouter = require('./routers/majorRouter');
const enrollmentRouter = require('./routers/enrollmentRouter');
const courseRouter = require('./routers/courseRouter');
const professor_courseRouter = require('./routers/professor-courseRouter');
const departmentRouter = require('./routers/departmentRouter');

dotenv.config({ path: './config.env' });

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());
app.use(morgan('dev'));

db.sequelize
	.authenticate()
	.then(() => console.log('Database connected'))
	.catch((err) => console.log(err.message));

app.use('/professor', professorRouter);
app.use('/student', studentRouter);
app.use('/major', majorRouter);
app.use('/course', courseRouter);
app.use('/enrollment', enrollmentRouter);
app.use('/professor-course', professor_courseRouter);
app.use('/department', departmentRouter);

app.listen(port, () => {
	console.log(`Server listening on the port  ${port}`);
});
