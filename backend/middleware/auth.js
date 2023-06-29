//package pour vérifier les tockens
const jwt = require("jsonwebtoken")
require("dotenv").config()

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1]
    console.log("auth middleware token:", token)

    const decodedToken = jwt.verify(
      token.replace(/"/g, ""),
      process.env.SECRETKEY
    )

    req.userData = { userId: decodedToken.userId, role: decodedToken.role }
    console.log("auth middleware userId:", decodedToken.userId)
    console.log("auth middleware token :", decodedToken.role)

    next()
  } catch (error) {
    console.error("Auth Middleware: Error:", error);
      res.status(401).json({ error: "Unauthorized Request" })
    }
  
}
