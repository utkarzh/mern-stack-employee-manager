const jwt = require("jsonwebtoken");

exports.checkAdmin = async (req, resp, next) => {
  const token = req.header("Authorization");
  console.log(token);
  console.log("inside the verify token", req.body);

  try {
    if (!token) {
      throw new Error();
    }
    const { adminId } = await jwt.verify(token, process.env.JWT_KEY);
    //ALTHOUGH WE HAVE NO USE OF THIS HERE AS ALL ADMINS WILL HAVE ACCESS TO SAME DATA..
    //BUT THIS COULD BE USEFUL WHEN YOU HAVE TO SHOW INDIVIDUAL USERS DATA...

    if (adminId) {
      req.adminId = adminId;
      next();
    }
  } catch (error) {
    resp.status(401).json({ message: "You are not logged in" });
  }
};
