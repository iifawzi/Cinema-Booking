const { ErrorHandler } = require("../helpers/error");
const {checkToken} = require("../helpers/jwt");


const isAuth = ()=>{
    return (req, res, next) => {
        const encoded_token = req.headers.authorization;
        if (!encoded_token) {
            throw new ErrorHandler(401, "User is not Authenticated");
        } else {
            let splicedToken;
            if (encoded_token.startsWith("Bearer ")) {
                // Remove Bearer from string
                const spliced = encoded_token.split(" ");
                splicedToken = spliced[1];
            }else {
                splicedToken = encoded_token;
            }
            try {
                let decoded_token = checkToken(splicedToken);
                req.user = {
                    ...decoded_token,
                };
                return next();
            } catch (err) {
                err.statusCode = 401;
                next(err);
            }
        }
    };
};
 
module.exports = isAuth;