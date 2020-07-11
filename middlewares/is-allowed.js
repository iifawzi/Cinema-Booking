const { ErrorHandler } = require("../helpers/error");
const isAllowed = (allowedFor)=>{
    return (req, res, next) => {
        try {
            const requesterRole = req.requester.role;
            if (allowedFor.includes(requesterRole)){
                next();
            }else {
                throw new ErrorHandler(403,"You're not authorized to preform this action");
            }
        }catch(err) {
            err.statusCode = 403;
            next(err);
        }
    };
};

module.exports = isAllowed;