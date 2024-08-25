const express = require('express');
const app = express();

app.use(express.json()); // Middleware to parse JSON bodies

app.post('/bfhl', (req, res) => {
    console.log(req.body)
    const data = req.body.data || [];

    const numbers = data.filter(item => !isNaN(item));
    const alphabets = data.filter(item => /^[a-zA-Z]+$/.test(item));

    const lowercaseAlphabets = alphabets.filter(char => char === char.toLowerCase());
    const highestLowercaseAlphabet = lowercaseAlphabets.length ? [lowercaseAlphabets.sort().pop()] : [];

    const response = {
        is_success: true,
        user_id: "anshika_sarkar_11042003",
        email: "anshika.sarkar2021@vitstudent.ac.in",
        roll_number: "21BCE2050",
        numbers,
        alphabets,
        highest_lowercase_alphabet: highestLowercaseAlphabet
    };

    res.status(200).json(response);
});

app.get('/bfhl', (req, res) => {
    res.status(200).json({ operation_code: 1 });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
