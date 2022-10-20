import dotenv from 'dotenv';
import express from 'express';

/*
 *  Express REST methodology
 */
dotenv.config();
const app = express();

app.get('/', (req, res) => {});
app.listen(process.env.PORT || 8080, () => {
  console.log(`Listening on port ${process.env.PORT || 8080}`);
});
