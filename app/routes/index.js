const spyRoutes = require('./spyRoutes');

module.exports = function (app, data) {
    spyRoutes(app, data);
};