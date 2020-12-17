module.exports = function (req, res, next) {

    res.header('access-control-allow-origin', '*');
    res.header('access-control-allow-methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('access-control-allow-headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Access-Control-Allow-Credentials', true);

    if (req.method == 'OPTIONS') {
        res.send(200);
    }
    else {
        next();
    }
};
