const User = require("../models/User");

module.exports = async (req, res, next) => {
  const user = await User.findById(req.user.id);
    if (!user || user.role !== 1) {
      return res.status(403).send({error: { status:403, message:'Access denied.'}});
    }
    next();
};