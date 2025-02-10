export const globalErrorHandler = (err, req, res, next) => {
  let  statusCode= err.statusCode || 500;
  let  message = err.message || "Internal Server Error";
    console.log(err.stack);
    res.status(statusCode).json({message});
    
  }