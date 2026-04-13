const express = require('express');
const router = express.Router();
const db = require('../../config/db');

// [중복확인] 이메일
router.post('/check-email', async (req, res) => {
  const { email } = req.body;
  const [rows] = await db.query('SELECT id FROM Pilgrims WHERE email = ?', [email]);
  res.json({ isDuplicate: rows.length > 0 });
});

// [중복확인] 닉네임(호칭)
router.post('/check-nickname', async (req, res) => {
  const { nickname } = req.body;
  const [rows] = await db.query('SELECT id FROM Pilgrims WHERE nickname = ?', [nickname]);
  res.json({ isDuplicate: rows.length > 0 });
});

// [아이디 찾기] 호칭으로 이메일 찾기
router.post('/find-email', async (req, res) => {
  const { nickname } = req.body;
  const [rows] = await db.query('SELECT email FROM Pilgrims WHERE nickname = ?', [nickname]);
  if (rows.length > 0) res.json({ email: rows[0].email });
  else res.status(404).json({ message: "일치하는 호칭이 없습니다." });
});

module.exports = router;
