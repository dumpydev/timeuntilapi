/* Importing the express module and creating an express application. */
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { log } = require('@dumpy/andylib')
app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('content-type', 'application/json');
    next();
})
app.get('/v1/all/:d/:m/:y', async (req, res) => {
    const { d, m, y } = req.params;
    const date = new Date(`${d}/${m}/${y}`);

    const years = yearsUntil(date);
    const months = monthsUntil(date);
    const days = daysUntil(date);
    const hours = hoursUntil(date);
    const mins = minutesUntil(date);
    const seconds = secondsUntil(date);

    return res.status(200).json({
        years: years,
        months: months,
        days: days,
        hours: hours,
        mins: mins,
        seconds: seconds
    });    
});

app.get('/v1/secondsuntil/:d/:m/:y', async (req, res) => {
    const { d, m, y } = req.params;
    const date = new Date(`${d}/${m}/${y}`);
    
    const seconds = secondsUntil(date);
    res.status(200).json({
        seconds: seconds
    })
})
app.get('/v1/minsuntil/:d/:m/:y', async (req, res) => {
    const { d, m, y } = req.params;
    const date = new Date(`${d}/${m}/${y}`);
    
    const mins = minutesUntil(date);
    res.status(200).json({
        minutes: mins
    });
});
app.get('/v1/monthsuntil/:d/:m/:y', async (req, res) => {
    const { d, m, y } = req.params;
    const date = new Date(`${d}/${m}/${y}`);
    
    const months = monthsUntil(date);
    return res.status(200).json({
        months: months
    });

});
app.get('/v1/hoursuntil/:d/:m/:y', async (req, res) => {
    const { d, m, y } = req.params;
    const date = new Date(`${d}/${m}/${y}`);

    const hours = hoursUntil(date);
    return res.status(200).json({
        hours: hours
    });
});

app.get('/v1/yearsuntil/:d/:m/:y', async (req, res) => {
    const { d, m, y } = req.params;
    const date = new Date(`${d}/${m}/${y}`);
    
    const years = yearsUntil(date);
    return res.status(200).json({
        years: years
    });
});
app.get('/v1/daysuntil/:d/:m/:y', async (req, res) => {
    const { d, m, y } = req.params;
    const date = new Date(`${d}/${m}/${y}`);

    const days = daysUntil(date);
    return res.status(200).json({
        days: days
    });
});



app.get('/v1/timeuntil/:d/:m/:y/', async (req, res) => {
    const { d, m, y } = req.params;
    if (!(d && m && y)) {
        return res.status(400).json({
            error: 'Missing parameters'
        });
    }

    const time = new Date(y, m-1, d);
    const now = new Date();

    const diff = time.getTime() - now.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    // difference between the current date and the date of the event
    const result = {
        days,
        hours,
        minutes,
        seconds
    };
    return res.status(200).json(result);
})

app.get('/v1/timepast/:d/:m/:y/', async (req, res) => {
    if (!(req.params.d && req.params.m && req.params.y)) {
        return res.status(400).json({
            error: 'Missing parameters'
        });
    }

    const time = new Date(req.params.y, req.params.m - 1, req.params.d);
    const now = new Date();

    const diff = now.getTime() - time.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    const years = Math.floor(days / 365);

    return res.json({
        years: years,
        days: days,
        hours: hours,
        minutes: minutes,
        seconds: seconds,
        timestamp: time.getTime()
    });
})

app.use((req, res, next) => {
    res.status(404)
    // respond with json
    if (req.accepts('json')) {
        res.json({ error: 'Not found or Missing Parameters' });
        return;
    }
    // respond with html page
    if (req.accepts('html')) {
        res.send('<p>Page not found</p>')
        return;
    }

})

/* Telling the server to listen on port 3000. */
const server = app.listen(3000, () => {
    log('listening on port 3000', 'info')
});

server.on('connection', (socket) => {
    log(`New request from ${socket.localAddress}:${socket.localPort}`, 'info')
})
server.on('disconnect', (socket) => {
    log(`Disconnected from ${socket.localAddress}:${socket.localPort}`, 'info')
})

function secondsUntil(date) {
    const now = new Date();
    const diff = date.getTime() - now.getTime();
    return Math.floor(diff / 1000);
}

function monthsUntil(date) {
    const now = new Date();
    const diff = date.getTime() - now.getTime();
    return Math.floor(diff / (1000 * 60 * 60 * 24 * 30));
}

function minutesUntil(date) {
    const now = new Date();
    const diff = date.getTime() - now.getTime();
    return Math.floor(diff / (1000 * 60));
}

function hoursUntil(date) {
    const now = new Date();
    const diff = date.getTime() - now.getTime();
    return Math.floor(diff / (1000 * 60 * 60));
}

function yearsUntil(date) {
    const now = new Date();
    const diff = date.getTime() - now.getTime();
    return Math.floor(diff / (1000 * 60 * 60 * 24 * 365));
}

function daysUntil(date) {
    const now = new Date();
    const diff = date.getTime() - now.getTime();
    return Math.floor(diff / (1000 * 60 * 60 * 24));
}


