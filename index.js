/* Importing the express module and creating an express application. */
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const al = require('@dumpy/andylib');
const l = new al.logger();
const moment = require('moment');
app.use(bodyParser.json());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('content-type', 'application/json');
    next();
})

app.get('/v1/all/:d/:m/:y', async (req, res) => {
    console.log(req.params)
    const { d, m, y } = req.params;
    const years = yearsUntil(d, m, y);
    const months = monthsUntil(d, m, y);
    const days = daysUntil(d, m, y);
    const hours = hoursUntil(d, m, y);
    const minutes = minutesUntil(d, m, y);
    const seconds = secondsUntil(d, m, y);

    return res.status(200).json({
        years: years,
        months: months,
        days: days,
        hours: hours,
        minutes: minutes,
        seconds: seconds
    });    
});

app.get('/v1/yearsuntil/:d/:m/:y', async (req, res) => {
    const { d, m, y } = req.params;
    const years = yearsUntil(d, m, y);
    return res.status(200).json({
        years: years
    });
})
app.get('/v1/monthsuntil/:d/:m/:y', async (req, res) => {
    const { d, m, y } = req.params;
    const months = monthsUntil(d, m, y);
    return res.status(200).json({
        months: months
    });
})
app.get('/v1/daysuntil/:d/:m/:y', async (req, res) => {
    const { d, m, y } = req.params;
    const days = daysUntil(d, m, y);
    return res.status(200).json({
        days: days
    });
})
app.get('/v1/hoursuntil/:d/:m/:y', async (req, res) => {
    const { d, m, y } = req.params;
    const hours = hoursUntil(d, m, y);
    return res.status(200).json({
        hours: hours
    });
})
app.get('/v1/minutesuntil/:d/:m/:y', async (req, res) => {
    const { d, m, y } = req.params;
    const minutes = minutesUntil(d, m, y);
    return res.status(200).json({
        minutes: minutes
    });
})
app.get('/v1/secondsuntil/:d/:m/:y', async (req, res) => {
    const { d, m, y } = req.params;
    const seconds = secondsUntil(d, m, y);
    return res.status(200).json({
        seconds: seconds
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
const server = app.listen(4200, () => {
    l.info('listening on port 4200', 'info')
});

server.on('connection', (socket) => {
    l.info(`New request from ${socket.localAddress}:${socket.localPort}`, 'info')
})
server.on('disconnect', (socket) => {
    l.info(`Disconnected from ${socket.localAddress}:${socket.localPort}`, 'info')
})
function until(day, month, year) {
    const until = moment(`${year}-${month}-${day}`, 'YYYY-MM-DD');
    const duration = moment.duration(until.diff(this.now));
    return {
        years: duration.years(),
        months: duration.months(),
        days: duration.days(),
        hours: duration.hours(),
        minutes: duration.minutes(),
        seconds: duration.seconds()
    };
}
function yearsUntil(day, month, year) {
    const until = moment(`${year}-${month}-${day}`, 'YYYY-MM-DD');
    const duration = moment.duration(until.diff(this.now));
    return duration.years();
}
function monthsUntil(day, month, year) {
    const until = moment(`${year}-${month}-${day}`, 'YYYY-MM-DD');
    const duration = moment.duration(until.diff(this.now));
    return duration.months();
}
function daysUntil(day, month, year) {
    const until = moment(`${year}-${month}-${day}`, 'YYYY-MM-DD');
    const duration = moment.duration(until.diff(this.now));
    return duration.days();
}
function hoursUntil(day, month, year) {
    const until = moment(`${year}-${month}-${day}`, 'YYYY-MM-DD');
    const duration = moment.duration(until.diff(this.now));
    return duration.hours();
}
function minutesUntil(day, month, year) {
    const until = moment(`${year}-${month}-${day}`, 'YYYY-MM-DD');
    const duration = moment.duration(until.diff(this.now));
    return duration.minutes();
}
function secondsUntil(day, month, year) {
    const until = moment(`${year}-${month}-${day}`, 'YYYY-MM-DD');
    const duration = moment.duration(until.diff(this.now));
    return duration.seconds();
}

