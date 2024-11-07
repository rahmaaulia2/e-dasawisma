const ErrorHandler = (err, req, res, next) => {
  let status = err.status || 500;
  let message = err.message || "Internal server error";
  switch (err.name) {
    case "SequelizeValidationError":
    case "SequelizeUniqueConstraintError":
    case "SequelizeDatabaseError":
    case "SequelizeForeignKeyConstraintError":
      status = 400;
      message = err.errors.map((e) => e.message);
      break;
    case "JsonWebTokenError":
    case "InvalidToken":
      status = 401;
      message = "Invalid token";
      break;
    case "Unauthorized":
      status = 401;
      message = "Unauthorized";
      break;
    case "Unauthenticated":
      status = 401;
      message = "Unauthenticated";
      break;
    case "InvalidUsername/Password":
      status = 400;
      message = "Invalid username/password";
      break;
    case "UserNotFound":
      status = 404;
      message = "User not found";
      break;
    case "DetailKKNotFound":
      status = 404;
      message = "KK not found";
      break;
    case "EmailAlreadyExist":
      status = 400;
      message = "Email already exist";
      break;
    case "CannotCreateDasawisma":
      status = 400;
      message = "Cannot create dasawisma";
      break;
    case "NameAlreadyExist":
      status = 400;
      message = "Name already exist";
      break;
    default:
      status = 500;
      message = "Internal server error";
      break;
  }
  res.status(status).json({ message });
};
module.exports = ErrorHandler;
