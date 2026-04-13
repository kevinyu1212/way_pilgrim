const express = require('express');
const cors = require('cors');
const authRoutes = require('./engines/rampart/authRoutes');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// 라우트 연결
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => res.send('WayPilgrim Server is Running...'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log('Steward Engine: Server started on port ' + PORT));
