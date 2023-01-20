const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const db = require('./models');

/*
	import routers
*/
const professorRouter = require('./routers/professorRouter');
const studentRouter = require('./routers/studentRouter');
const majorRouter = require('./routers/majorRouter');
const enrollmentRouter = require('./routers/enrollmentRouter');
const courseRouter = require('./routers/courseRouter');
const professor_courseRouter = require('./routers/professor-courseRouter');
const departmentRouter = require('./routers/departmentRouter');
const examRouter = require('./routers/examRouter');
const resultRouter = require('./routers/resultRouter');
const authRouter = require('./routers/authRouter');

dotenv.config({ path: './config.env' });

const app = express();
const port = process.env.PORT || 8080;

dotenv.config();

app.use(express.json());
app.use(morgan('dev'));

/*
	Database connection check
*/
db.sequelize
	.authenticate()
	.then(() => console.log('Database connected'))
	.catch((err) => console.log(err.message));

/*
	Set default routes for specific routers
*/
app.use('/professor', professorRouter);
app.use('/student', studentRouter);
app.use('/major', majorRouter);
app.use('/course', courseRouter);
app.use('/enrollment', enrollmentRouter);
app.use('/professor-course', professor_courseRouter);
app.use('/department', departmentRouter);
app.use('/exam', examRouter);
app.use('/result', resultRouter);
app.use('/', authRouter)

app.listen(port, () => {
	console.log(`Server listening on the port  ${port}`);
});
