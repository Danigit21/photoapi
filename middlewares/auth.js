// Authentication Middleware

const debug = require('debug')('photoapi:auth');
const { User } = require('../models');
 
// HTTP Basic Authentication
const basic = async(req, res, next) => {
    // make sure Authorization header exists, otherwise fail
    if (!req.headers.authorization) {
        debug("Authorization header missing")

        return res.status(401).send({
            status: "fail",
            data: "Authorization required"
        });
    }

    debug("Authorization header: %o", req.headers.authorization);
    const [authSchema, base64Payload] = req.headers.authorization.split(' ');

    // if authSchema isnt basic then bail
    if (authSchema.toLowerCase() !== "basic") {
        debug("Authorization schema isn't basic");

        return res.status(401).send({
            status: "fail",
            data: "Authorization required"
        });

        // not our to authenticate
    }

    // decode payload from base64 => ascii
    const decodedPayload = Buffer.from(base64Payload, 'base64').toString('ascii');
    // decodedPayLoad = "username:password"

    // split decoded payload into "<username>:<password>"
    const [username, password] = decodedPayload.split(':');

    const user = await User.login(username, password);
    
    if (!user) {
        return res.status(401).send({
            status: "fail",
            data: "Authorization failed"
        });
    }

    // finally check attach user to request
    // req.authenticated = true;
    req.user = user;

    // pass request along, need to "call" next() or else no process
    next();
}
 
module.exports = {
    basic,
}
 