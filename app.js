const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const db = require('./models');

const professorRouter = require('./routers/professorRouter');

dotenv.config({ path: './config.env' });

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());
app.use(morgan('dev'));

db.sequelize.authenticate()
	.then(() => console.log('Database connected'))
	.catch((err) => console.log(err.message));

app.use('/professor', professorRouter);

app.listen(port, () => {
	console.log(`Server listening on the port  ${port}`);
});
