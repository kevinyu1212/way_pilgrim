const express = require('express');
const router = express.Router();
const db = require('../../config/db');
const bcrypt = require('bcrypt');

// 중복 확인 API들... (기존 코드 유지)
router.post('/check-email', async (req, res) => {
    const { email } = req.body;
    const [rows] = await db.execute('SELECT id FROM Pilgrims WHERE email = ?', [email]);
    res.json({ isDuplicate: rows.length > 0 });
});

router.post('/check-nickname', async (req, res) => {
    const { nickname } = req.body;
    const [rows] = await db.execute('SELECT id FROM Pilgrims WHERE nickname = ?', [nickname]);
    res.json({ isDuplicate: rows.length > 0 });
});

// 최종 회원가입 (고백 단계 포함)
router.post('/signup', async (req, res) => {
    const { email, password, nickname, initiation_type, first_confession } = req.body;
    
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const sql = `INSERT INTO Pilgrims (email, password_hash, nickname, initiation_type, first_confession) VALUES (?, ?, ?, ?, ?)`;
        await db.execute(sql, [email, hashedPassword, nickname, initiation_type, first_confession]);
        
        res.status(201).json({ message: '순례길의 첫 걸음을 축하합니다!' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: '등록 중 오류가 발생했습니다.' });
    }
});

module.exports = router;
