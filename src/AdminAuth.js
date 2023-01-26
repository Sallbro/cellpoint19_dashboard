const jwt = require("jsonwebtoken");
const user = require("../src/models/adminschema");

const AdminAuthentication = async (req, res, next) => {
    try {
        const session_id = req.cookies.salmanbhai;
        const verify_session_id = jwt.verify(session_id, "mynameissalmanandilovetocode");
        console.log("token admin: ", session_id);
        const rootusers = await user.findOne({ session_id });
        console.log("verify_session_id admin: ", verify_session_id);

        if (!rootusers) {
            req.status = 400;
        } else {
            req.rootusers_id = rootusers._id;
            req.session_id = session_id;
            req.rootusers = rootusers;
        }
        req.status = 200;
    }
    catch (e) {
        console.log("admin error ");
        next();
    }
    next();
};
module.exports = AdminAuthentication;
