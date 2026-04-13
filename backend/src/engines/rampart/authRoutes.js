const express = require('express');
const router = express.Router();
const db = require('../../config/db');
const bcrypt = require('bcrypt');

// 중복 확인
router.post('/check-email', async (req, res) => {
    try {
        const { email } = req.body;
        const [rows] = await db.execute('SELECT id FROM Pilgrims WHERE email = ?', [email]);
        res.json({ isDuplicate: rows.length > 0 });
    } catch (err) { res.status(500).json(err); }
});

router.post('/check-nickname', async (req, res) => {
    try {
        const { nickname } = req.body;
        const [rows] = await db.execute('SELECT id FROM Pilgrims WHERE nickname = ?', [nickname]);
        res.json({ isDuplicate: rows.length > 0 });
    } catch (err) { res.status(500).json(err); }
});

// 회원가입
router.post('/signup', async (req, res) => {
    const { email, password, nickname, initiation_type, first_confession, interests } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(String(password), 10);
        const sql = `INSERT INTO Pilgrims 
            (email, password_hash, nickname, initiation_type, first_confession, interests) 
            VALUES (?, ?, ?, ?, ?, ?)`;
        await db.execute(sql, [email, hashedPassword, nickname, initiation_type, first_confession, JSON.stringify(interests)]);
        res.status(201).json({ message: '등록 완료' });
    } catch (err) {
        res.status(500).json({ error: 'DB 저장 실패', detail: err.message });
    }
});

// 로그인 로직 추가
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const [rows] = await db.execute('SELECT * FROM Pilgrims WHERE email = ?', [email]);
        if (rows.length === 0) return res.status(401).json({ error: '존재하지 않는 순례자입니다.' });

        const user = rows[0];
        const isMatch = await bcrypt.compare(password, user.password_hash);
        if (!isMatch) return res.status(401).json({ error: '비밀번호가 일치하지 않습니다.' });

        res.json({ 
            message: '환영합니다!', 
            user: { id: user.id, nickname: user.nickname, email: user.email } 
        });
    } catch (err) {
        res.status(500).json({ error: '로그인 중 오류 발생' });
    }
});

module.exports = router;
