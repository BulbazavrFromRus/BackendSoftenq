const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('./models/user');

const app = express();
app.use(express.json());

const SECRET_KEY = 'cat';

// Регистрация пользователя
app.post('/register', async (req, res) => {
const { name, email, password } = req.body;

try {
// Проверка, существует ли пользователь с таким email
const existingUser = await User.findOne({ where: { email } });
if (existingUser) {
return res.status(400).json({ message: 'Пользователь с таким email уже существует' });
}

// Создание нового пользователя
const hashedPassword = await bcrypt.hash(password, 10);
await User.create({ name, email, password: hashedPassword });
res.status(201).json({ message: 'Пользователь зарегистрирован' });
} catch (error) {
console.error(error);
res.status(500).json({ message: 'Ошибка сервера' });
}
});

// Вход пользователя и выдача JWT токена
app.post('/login', async (req, res) => {
const { email, password } = req.body;

try {
const user = await User.findOne({ where: { email } });

if (!user || !(await bcrypt.compare(password, user.password))) {
return res.status(401).json({ message: 'Неправильный email или пароль' });
}

const token = jwt.sign({ userId: user.id }, SECRET_KEY, { expiresIn: '1d' });
res.json({ token });
} catch (error) {
console.error(error);
res.status(500).json({ message: 'Ошибка сервера' });
}
});

app.listen(3000, () => {
console.log('Сервер запущен на порту 3000');
});