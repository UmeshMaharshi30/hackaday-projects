const app = require('./server');

const PORT = process.env.PORT || 4000;

var server = app.listen(PORT, function () {
    console.log("Application is running on port %s", PORT);
});