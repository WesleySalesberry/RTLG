
export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(401).json({
        success: false,
        message: `User role ${req.user.role} is not authorized to access this route`
      })
    }
    next();
  };
};