const express = require('express');
var cors = require('cors');

function initHTTPServer(dataClient) {
    const { getAllData } = dataClient;
    const app = express();
    app.use(cors());

    app.get('/', (req, res) => {
        return res.json({ status: 'OK' });
    });

    app.get('/all', (req, res, next) => {
        getAllData().then((dataToShow) => {
            res.json(dataToShow);
        }).catch((err) => {
            next(err);
        });
    });

    return app;
}

module.exports = {
    initHTTPServer
};
