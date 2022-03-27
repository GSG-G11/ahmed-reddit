const app = require('./app');

app.listen(process.env.PORT || 3000, () => {
  console.log(
    `Server is Running on http://localhost:${process.env.PORT || 3000}`,
  );
});
