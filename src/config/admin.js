module.exports = (req, res, next) => {
  if (req.user[0].role === 1) {
    next();
  }
  else {
    res.status(403).json({message: 'You do not have permission to add product. Please contact administrator'});
  }
};
