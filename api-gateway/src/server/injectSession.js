import UserService from '../adapters/UsersService';

const injectSession = async (req, res, next) => {
  if (req.cookies.userSesstionId) {
    const userSesion = await UserService.fetchUserSession({
      sessionId: req.cookies.userSesstionId,
    });
    res.locals.userSession = userSesion;
  }

  return next();
};

export default injectSession;
