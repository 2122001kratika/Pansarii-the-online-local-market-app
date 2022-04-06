import jwt from 'jsonwebtoken';

export const generateToken = (user) => {
    return jwt.sign(
             {        _id: user._id, 
                      name: user.name, 
                      email: user.email,
                      isAdmin: user.isAdmin,
             },
             process.env.JWt_SECRET || 'something secret',
            { 
                expiresIn: '30d',
            }
     );
};
export const isAuth = (req, res, next) => {
    const authorization = req.headers.authorization;
    if(authorization){
        const token = authorization.slice(7, authorization.length); // Bearer XXXXXX the authorization token is in this format that is why we are taking it from index 7 upto the end
        jwt.verify(
            token,
            process.env.JWt_SECRET || 'somethingsecret',
             (err, decode)=> {
            if(err) {
                res.status(401).send({ message: 'Invalid Token' });
            }else{
                req.user = decode;
                next();
            }
        }
      );
    }else{
        res.status(401).send({ message: 'NoToken' })
    }
};