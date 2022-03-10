// Authentication Middleware

const debug = require('debug')('photoapi:auth');
const models = require('../models');
 
// HTTP Basic Authentication
const basic = async (req, res, next) => {
  
    // check if authorization header exists
    if (!req.headers.authorization) {
        debug("Authorization header missing")

        return res.status(401).send({
            status: "fail",
            data: "Authorization required"
        });
    }

    // split header into basic "authSchema", "base64Payload"
    const [authSchema, base64Payload] = req.headers.authorization.split(' ');

    // show fail if authSchema isn't "basic"
    if (authSchema.toLowerCase() !== "basic") {
        debug("Authorization schema isn't basic");

        return res.status(401).send({
            status: 'fail',
            data: 'Authorization required',
        });
    }
  
    // decode payload from base64 to an ascii string
    const decodedPayload = Buffer.from(base64Payload, 'base64').toString('ascii');
  
    // split decoded payload into email and password
    const [email, password] = decodedPayload.split(':');
  
    const user = await models.User.login(email, password);
  
      if (!user) {
          return res.status(401).send({
              status: 'fail',
              data: 'Authorization failed',
          });
      }
  
    // attach the user to the request
    req.user = user;
  
    next();
}
 
module.exports = {
    basic
};