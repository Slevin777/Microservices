import UserService from "../adapters/UsersService";

const injectSession = async (req, res, next) => {
  if (req.cookies.userSessionId) {
    try {
      const userSesion = await UserService.fetchUserSession({
        sessionId: req.cookies.userSessionId,
      });
      res.locals.userSession = userSesion;
    } catch (e) {
      console.log(e);
    }
  }

  return next();
};

export default injectSession;
