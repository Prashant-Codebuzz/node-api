import passport from "passport";
import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";
import moment from "moment";
import { AccessToken } from "../Models/access.token.js"; // Your accessToken model
import {User} from "../Models/users.js"; // Your user model
import { APP_KEY } from "../../../constants.js";

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: APP_KEY,
};

passport.use(
  new JwtStrategy(options, async (jwtPayload, done) => {
    try {
      // Check if the token is expired
      if (moment.utc().unix() > jwtPayload.exp) {
        return done(null, false);
      }

      // Find the token in the accessToken collection
      const checkToken = await AccessToken.findOne({
        jti: jwtPayload.jti, // JWT Token ID (jti)
        userId: jwtPayload.sub, // User ID from the token (sub)
        revoked: false,
      }).populate('users');
      // Token not found or expired
      if (
        !checkToken ||
        moment.utc().unix() > moment.unix(checkToken.expiresAt)
      ) {
        return done(null, false);
      }
      // Find the user using the userId (sub) from the token
      // const user = await User.find({_id:jwtPayload.sub});
      const user = await User.findOne({_id:jwtPayload.sub})
      
      // If user not found
      if (!user) {
        return done(null, false);
      }

      // Remove sensitive data like the password
      user.password = undefined;

      // Attach the JWT ID (jti) to the user object
      user.jti = jwtPayload.jti;

      return done(null, user);
    } catch (error) {
      return done(error, false);
    }
  })
);

export default passport;
