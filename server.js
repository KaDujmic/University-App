const app = require('./app');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const port = 8080 || process.env.PORT;

app.listen(port, () => {
  console.log(`Server listening on the port  ${port}`);
});
