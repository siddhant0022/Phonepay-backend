const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./src/config/db');
const AuthRouter = require('./src/routes/authRoutes');

const app = express();
app.use(cors());
app.use(express.json());
connectDB();

app.get('/', (req, res) => {
  res.send('Working Correctly');
});

app.use('/api/auth', AuthRouter);


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})