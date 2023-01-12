import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';


dotenv.config({ path: './config.env' });

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(morgan('dev'));


app.listen(port, () => {
	console.log(`Server listening on the port  ${port}`);
});
;