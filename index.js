const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.send('Hello, Express!');
})


app.listen(3000, () => {
    console.log(`app is listening on http://localhost:3000`);
    
})