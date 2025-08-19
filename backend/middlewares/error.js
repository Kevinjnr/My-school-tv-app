export default (err, req, res, next) => {
  console.log(err);
  let statusCode;
  if (typeof err.code == "number") {
    statusCode = err.code;
  } else {
    statusCode = 500;
  }
  res.status(statusCode).json({ success: false, message: err.message });
};
