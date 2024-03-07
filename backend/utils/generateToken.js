const jwt = require('jsonwebtoken');

exports.generateToken = (res, payload) => {

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "1d"
    });

    console.log("token=> ", token);
    res.cookie('jwt', token, {
        httpOnly: true,
        // secure: process.env.NODE_ENV !== 'development', // Use secure cookies in production
        sameSite: 'strict', // Prevent CSRF attacks
        maxAge: 1 * 24 * 60 * 60 * 1000, // 1 days
      });

}


