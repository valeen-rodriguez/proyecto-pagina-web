const createError = require('http-errors');
const cookieParser = require('cookie-parser');
const express = require('express');
const path = require('path');
const methodOverride =  require('method-override'); 

const app = express();

app.use(express.static(path.join(__dirname, '../public'))); 
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(methodOverride('_method'));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));


const mainRouter = require('./routes/main');
const productsRouter = require('./routes/products');
const usersRouter = require('./routes/users');

app.use('/', mainRouter);
app.use('/products', productsRouter);
app.use('/users', usersRouter);

app.use('/data', express.static(path.join(__dirname, 'data')));

app.use((req, res, next) => next(createError(404)));

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.path = req.path;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

app.listen('3001', () => console.log('Servidor corriendo en el puerto 3001'));

module.exports = app;