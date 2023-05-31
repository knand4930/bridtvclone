const UserSchema = require("../schemas/userSchema");
const createError = require("http-errors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const sessionController = {
  getSession: async (req, res, next) => {
    try {
      const user = req.user;
      res.json(user);
    } catch (error) {
      return next(createError.InternalServerError(error));
    }
  },

  register: async (req, res, next) => {
    try {
      const { username, email, password, domain } = req.body;

      if (!email || !password) {
        res.status(400).send("Please Add ALL Fields");
      }

      const userExists = await UserSchema.findOne({ email }).lean();

      if (userExists) {
        res.status(400).send("User Already Exists");
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      let userCount = await UserSchema.count();

      userCount = userCount + 1;

      const userCreated = await UserSchema.create({ email, password: hashedPassword, username, domain });

      if (userCreated) {
        const accessToken = jwt.sign({ id: userCreated._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
        res.cookie("jwt", accessToken, { httpOnly: true, maxAge: process.env.SESSION_EXPIRE * 60 * 60 * 1000 });
        const user = { _id: userCreated._id, email: email, username: username, role: role };
        res.status(201).json(user);
      } else {
        res.status(400).send("Invalid User Data");
      }
    } catch (error) {
      return next(createError.InternalServerError(error));
    }
  },

  login: async (req, res, next) => {
    try {
      const { email, password } = req.body;

      if (!email) {
        res.status(400).send("Please Enter Email");
      }

      if (!password) {
        res.status(400).send("Please Password");
      }

      const user = await UserSchema.findOne({ email: email });

      if (user && (await bcrypt.compare(password, user.password))) {
        //Create JWT
        const accessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

        res.cookie("jwt", accessToken, { httpOnly: true });
        res.status(200).json(user);
      } else {
        res.status(400).json("Password Incorrect !!!");
      }
    } catch (error) {
      return next(createError.InternalServerError(error));
    }
  },

  logout: async (req, res, next) => {
    try {
      const cookies = req.cookies;
      if (!cookies?.jwt) {
        return res.sendStatus(204); //No Content
      }

      res.clearCookie("jwt", { httpOnly: true });
      res.sendStatus(204);
    } catch (error) {
      return next(createError.InternalServerError(error));
    }
  },
};

module.exports = sessionController;
