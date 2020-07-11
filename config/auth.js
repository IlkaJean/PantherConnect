module.exports = {
    // called when we want to restric the access to our api
    ensureAuthenticated: function (level) {
        return function (req, res, next) {
            console.log("ensure");
            console.log(req.user);
            console.log(req.isAuthenticated());
            if (req.isAuthenticated() && canAccess(req.user.level, level)) {
                return next();
            }
            res.status(401).send({ message: "Authenticated failed" });
        }
    }
};

function canAccess(userLevel, targetLevel){
    switch(userLevel){
        case 'user': return targetLevel == 'user'
        case 'admin': return true
        default: return true
    }
}