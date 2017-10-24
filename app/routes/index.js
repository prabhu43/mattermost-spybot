const spyRoutes = require('./spyRoutes');

module.exports = function (app, data, token) {
    spyRoutes(app, data, token);
};