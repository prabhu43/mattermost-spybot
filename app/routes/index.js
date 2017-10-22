const spyRoutes = require('./spyRoutes');

module.exports = function(app, db, ws) {
  spyRoutes(app, db, ws);
  // Other route groups could go here, in the future
};