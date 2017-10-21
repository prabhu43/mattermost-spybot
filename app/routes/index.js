const spyRoutes = require('./spyRoutes');

module.exports = function(app, db) {
  spyRoutes(app, db);
  // Other route groups could go here, in the future
};