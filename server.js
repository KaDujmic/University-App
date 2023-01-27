const app = require('./app');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Server listening on the port  ${port}`);
});
