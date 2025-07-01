import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { compare } from "bcrypt";
import User from "../Models/users.js"; // assuming you have a User model defined

passport.use(
  new LocalStrategy(
    { usernameField: "email", passReqToCallback: true },
    async (req, email, password, done) => {
      try {
        // Fetch the user by email from MongoDB using Mongoose
        const user = await User.findOne({ email  });

        // Check if user exists and the password is correct
        if (!user || user.providerId || !(await compare(password, user.password))) {
          return done(null, false, "Invalid email or password combination");
        }

        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

export default passport;
