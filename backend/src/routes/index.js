const accountRouter = require('./accountRoute');

const router = (app) => {
    app.use('/account', accountRouter);
}

module.exports = router;