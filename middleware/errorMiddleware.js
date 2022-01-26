// handle not found ROUTES
exports.notfound = (req,res,next)=>{
    const error = new Error(`Not found - ${req.originalUrl}`);
    res.status(404);
    next(error);
};
// handle errors
exports.errorHandler = (err,req, res, next)=>{
    const statusCode = res.statusCode === 200 ? 500: res.statusCode;
    res.status(statusCode);
    res.json({
        message: res.status,
        stack:process.env.NODE_ENV === "production" ? null :err.stack
    })
}