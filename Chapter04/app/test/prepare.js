var mongoose = require('mongoose');

beforeEach(function (done) {
  function clearDatabase() {
	   for (var i in mongoose.connection.collections) {
	      mongoose.connection.collections[i].remove(function() {});
	   }
	   return done();
	}

  if (mongoose.connection.readyState === 0) {
    // I have no idea why config.db.test is used.
    mongoose.connect('mongodb://catalog_admin:some_password@mongo/catalog', function (err) {
      if (err) {
        throw err;
      }
      return clearDatabase();
    });
	} else {
	  return clearDatabase();
	}
});

afterEach(function (done) {
  mongoose.disconnect();
	return done();
});
