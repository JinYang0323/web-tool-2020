const express = require('express');
const app = express();
const PORT = 5000;

app.use(express.static('./build'));

app.get('/api/test', (req, res) => {
    res.send('server works');
});

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});
