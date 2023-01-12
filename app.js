import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import sequelize from './database/client.js';

dotenv.config({ path: './config.env' });

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());
app.use(morgan('dev'));

sequelize
	.authenticate()
	.then(() => console.log('Database connected'))
	.catch((err) => console.log(err.message));

app.listen(port, () => {
	console.log(`Server listening on the port  ${port}`);
});
