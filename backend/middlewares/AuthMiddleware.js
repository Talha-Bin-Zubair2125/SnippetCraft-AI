const protect = (req, res, next) => {
  const userId = req.signedCookies.userId;
  if (!userId) {
    return res.status(401).json({ message: "Not authorized" });
  }
  req.userId = userId;
  next();
};

module.exports = { protect };