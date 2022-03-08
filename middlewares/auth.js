// Authentication Middleware

const debug = require('debug')('photoapi:auth');
 
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
}
 
module.exports = {
    basic,
};