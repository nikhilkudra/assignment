const jwt = require("jsonwebtoken");
const User = require("./userModel");

const verifyToken = (req, res, next) => {
  let accessToken = req.headers['authorization']
  if (req && req.headers && req.headers.authorization) {
          let path = req.route.path.trim();
          path = path.slice(1, path.length);
          path = path.toLowerCase();
      jwt.verify(req.headers.authorization, process.env.API_SECRET, async (err, decode) => {
  if (err) {
    return  res.status(500)
    .send({
      message: "Token Error"
    });
  }
  let currentTimestamp = Math.floor(Date.now() / 1000) + (60 * 60)
              if (currentTimestamp > decode.exp) {
                return  res.status(401).send({
                  message: `JWT expired, Please login again`,
                });
              }
             User.findOne({
                          _id: decode.id
                        })
                        .exec((err, user) => {
                          if (err) {
                            res.status(500)
                              .send({
                                message: err
                              });
                          } else {
                            req.user = user;
                            if(!user || user.token !== accessToken){
                              return res.status(500)
                              .send({
                                message: `Unauthorized ! Please login again `
                              });
                            }
                            next();
                          }
                        })
                    });

  } else {
    return  res.status(401).send({
      message: `JWT not available`,
    });
  }
};
module.exports = verifyToken
