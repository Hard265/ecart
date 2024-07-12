import passport from "passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { JwtPayload } from "../@types";
import { User } from "../models/User";

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

const jwtStrategy = new Strategy(
  jwtOptions,
  async (payload: JwtPayload, done) => {
    try {
      // Check if user exists in your data store based on payload.userId
      const user = await User.findByPk(payload.userId);
      if (user) {
        return done(null, user); // Pass user object to the request
      }
      return done(null, false);
    } catch (error) {
      return done(error);
    }
  }
);

export default jwtStrategy;
