import express = require('express');

const app: express.Application = express();

app.listen(3000, () => {
    console.log("Listening on port 3000");
});
