module.exports.usersAndAdmin = (req, res, next) => {
  try {
    if (!req.body.token) return  res.status(401).json({ msg: "Please log in before trying to access this information" });
    req.body.token.role === "users" || req.body.token.role === "admin"
      ? next()
      : res.status(403).json({
          msg:
            "Your account does not have permission to access this information.",
        });
  } catch (error) {
    res.status(401).json({
      msg: "Please log in before trying to access this information.",
      error,
    });
  }
};

module.exports.adminOnly = (req, res, next) => {
  try {
    if (!req.body.token) return  res.status(401).json({ msg: "Please log in before trying to access this information"});
    req.body.token.role === "admin"
      ? next()
      : res.status(403).json({
          msg:
            "Your account does not have permission to access this information.",
        });
  } catch (error) {
    res.status(401).json({
      msg: "Please log in before trying to access this information.",
      error,
    });
  }
};