const workRoutes = require('./workRoutes');

const router = (app) => {
    app.use('/', workRoutes);
}

module.exports = router;