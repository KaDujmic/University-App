const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');

/*
	import routers
*/
const professorRouter = require('./routers/professorRouter');
const studentRouter = require('./routers/studentRouter');
const majorRouter = require('./routers/majorRouter');
const enrollmentRouter = require('./routers/enrollmentRouter');
const courseRouter = require('./routers/courseRouter');
const professorCourseRouter = require('./routers/professorCourseRouter');
const departmentRouter = require('./routers/departmentRouter');
const examRouter = require('./routers/examRouter');
const resultRouter = require('./routers/resultRouter');
const authRouter = require('./routers/authRouter');
const { errorMiddleware } = require('./utils/errorMiddlewareHandler');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json');

dotenv.config({ path: './config.env' });

const app = express();

dotenv.config();

app.use(express.json());
app.use(morgan('dev'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

/*
Set default routes for specific routers
*/
app.get('/', (req, res) => {
	// #swagger.tags = ['Home']
});

app.use('/professor', professorRouter);
app.use('/student', studentRouter);
app.use('/major', majorRouter);
app.use('/course', courseRouter);
app.use('/enrollment', enrollmentRouter);
app.use('/professor-course', professorCourseRouter);
app.use('/department', departmentRouter);
app.use('/exam', examRouter);
app.use('/result', resultRouter);
app.use('/', authRouter);

app.use(errorMiddleware);

module.exports = app;
