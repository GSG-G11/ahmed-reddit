const app = require('./app');

app.listen(app.get('port'), () => {
  console.log(`Server is Running on http://localhost:${app.get('port')}`);
});
