import jwt from "jsonwebtoken";
import { TokenBlacklistModel, UserModel } from "../features/users/user.schema.js";

const jwtAuth = async (req, res, next) => {
  // 1. Read the token.
  const token = req.headers["authorization"];

  // 2. if token does not exist
  if (!token) {
    return res.status(401).send("Unauthorized");
  }

  // 3. verify the token
  try {
    const payload = jwt.verify(
      token,
      process.env.JWT_SECRET,
      async (err, user) => {
        if (err) return res.sendStatus(403);

        // 4. check blacklisted or not
        const isBlacklisted = await TokenBlacklistModel.findOne({ token });
        if (isBlacklisted) return res.status(403).send("Token is invalid.");

        // 5. Compare `iat` with `lastLogoutTime`
        const userRecord = await UserModel.findById(user.userId);
        if (user.issuedAt <= userRecord.lastLogoutTime) {
          return res.status(403).send("Token is invalid.");
        }

        req.userId = user.userId;
        console.log(user.issuedAt + "  "+  userRecord.lastLogoutTime)
        next();
      }
    );
  } catch (err) {
    console.log(err);
    return res.status(401).send("Unauthorized");
  }
};

export default jwtAuth;
