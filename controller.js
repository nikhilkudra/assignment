const userProvider = require("./provider");
const dataValidator = require("./validator");

let register = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(401).send({
        message: `Request body is missing!`,
      });
    }
    await dataValidator.validateRegisterUser(req.body);
    let response = await userProvider.register(req.body);

    return res.status(200).send({
      response,
    });
  } catch (e) {
    console.error("Error while updateUser ::: ", e);
    return e;
  }
};

let login = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(401).send({
        message: `Request body is missing!`,
      });
    }
    const updateObj = await dataValidator.validateLoginObj(req.body);
    let response = await userProvider.login(req.body);
    return res.status(200).send({
      response,
    });
  } catch (e) {
    console.error("Error while updateUser ::: ", e);
    return res.status(401).send({
      e,
    });
  }
};
let logout = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(401).send({
        message: `Request body is missing!`,
      });
    }
    const userId = req.user.id;

    let response = await userProvider.logout(userId);
    return res.status(200).send({
      response,
    });
  } catch (e) {
    console.error("Error while updateUser ::: ", e);
    return res.status(401).send({
      e,
    });
  }
};

module.exports = {
  register,
  login,
  logout,
};
