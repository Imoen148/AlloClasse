const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit'); // SECURITY
const helmet = require('helmet'); // SECURITY
const mongoSanitize = require('express-mongo-sanitize'); // SECURITY
const xss = require('xss-clean'); // SECURITY
const hpp = require('hpp'); // SECURITY 
const AppError = require('./utils/appError')
const globalErrorHandler = require('./controllers/errorController')

const immeublesRouter = require('./routes/immeubleRoutes');
const usersRouter = require('./routes/userRoutes');
const portesRouter = require('./routes/porteRoutes');
const fournisseursRouter = require('./routes/fournisseurRoutes');
const bonDeReparationRouter = require('./routes/bonDeReparationRoute');
const locataireRouter = require('./routes/locataireRoute');

const app = express();


// MIDLEWARES
app.use(helmet()); // SECURITY BEST PRACTICES - SET SECURITY HTTP HEADERS

const limiter = rateLimit({ // SECURITY BEST PRACTICES - LIMIT THE NUMBER OF REQUEST PER IP AND WAIT
    max: 100,
    windowMs: 60 * 60 * 1000,
    message: 'Too many request from this IP, please try again in an hour'
});
app.use('/api', limiter);
app.use(mongoSanitize()); // SECURITY BEST PRACTICES - DATA SANITIZATION - NOSQL QUERY INJECTION
app.use(xss()); // SECURITY BEST PRACTICES - DATA SANITIZATION - CROSS-SIDE SCRIPTING ATTACK (XSS)
app.use(hpp()); // SECURITY BEST PRACTICES - HTTP PARAMETER SOLUTION

if (process.env.NODE_ENV === 'development') app.use(morgan('dev')); // dev request infos
app.use(express.json()); // Body parser, reading data from body into req.body


// ROUTES
app.use('/api/v1/immeubles', immeublesRouter);
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/portes', portesRouter);
app.use('/api/v1/fournisseurs', fournisseursRouter);
app.use('/api/v1/bonDeReparations', bonDeReparationRouter);
app.use('/api/v1/locataires', locataireRouter);


// middleware handleling undefined routes
app.all('*', (req,res,next) => {
    next(new AppError(`Undefined route! Can't find ${req.originalUrl}!`, 404));
});


// middleware handleling errors
app.use(globalErrorHandler);


module.exports = app;



