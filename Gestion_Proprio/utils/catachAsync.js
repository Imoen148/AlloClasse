// sert de try/catch dans les fonction async

module.exports = fn => {
    return (req, res, next) => {
        fn(req, res, next).catch(/*err => next(err)*/ next);
    }
}