
 function testMiddleware(req, res, next) {
    console.log(req.body);
  console.log("Test middleware");
  next();
}

module.exports = { testMiddleware };

