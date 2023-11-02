import userModel from "../model/user.model";
import multer from "multer";
import fs, { chown } from "fs";
import path from "path";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      if (fs.existsSync("./uploads/user")) {
        cb(null, "./uploads/user");
      } else {
        fs.mkdirSync("./uploads/user");
        cb(null, "./uploads/user");
      }
    },
    filename: function (req, file, cb) {
      const name = file.originalname;
      const ext = path.extname(name);
      const nameArr = name.split(".");
      nameArr.pop();
      const fname = nameArr.join(".");
      const fullName = fname + "-" + Date.now() + ext;
      cb(null, fullName);
    },
  });
  
  const upload = multer({ storage: storage });

  export const getAllUsers = async (req, res) => {
    try {
      const userData = await userModel.find();
      if (userData) {
        return res.status(200).json({
          data: userData,
          message: "success",
          path: "http://localhost:8004/uploads/user",
        });
      }
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  };

  export const addUser = (req, res) => {
    try {
      const uploadData = upload.single("avatar");
      uploadData(req, res, function (error) {
        if (error) return res.status(400).json({ message: error.message });
  
        const {
          firstname,
          lastname,
          email,
          password,
          contact,
          otp,
          status,
        } = req.body;
  
        let avatar = null;
        if (req.file !== undefined) {
          avatar = req.file.filename;
        }
  
        const createdRecord = new userModel({
          firstname: firstname,
          lastname: lastname,
          email: email,
          password: password,
          contact: contact,
          otp: otp,
          status: status,
          avatar: avatar,
        });
  
        createdRecord.save();
  
        if (createdRecord) {
          return res.status(201).json({
            data: createdRecord,
            message: "Success",
          });
        }
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  };

  export const SingUp = async (req, res) => {
    try {
      const uploadData = upload.single("avatar");
      uploadData(req, res, async function (error) {
        if (error) return res.status(400).json({ message: error.message });
  
        const { firstname, lastname, email, password, contact } = req.body;
        console.log(email);
  
        let avatar = null;
        if (req.file !== undefined) {
          avatar = req.file.filename;
        }
  
        const isEmail = validator.isEmail(email);
        const isPassword = validator.isStrongPassword(password);
  
        if (!isEmail) {
          return res.status(400).json({
            message: "invalid email",
          });
        } else if (!isPassword) {
          return res.status(400).json({
            message:
              "passsword must be minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1,",
          });
        }
  
        const existUser = await userModel.findOne({ email: email });
  
        if (existUser) {
          return res.status(400).json({
            message: "user already exist",
          });
        }
        const passToString = password.toString();
  
        const hashPassword = bcrypt.hashSync(passToString, 10);
  
        const newUser = new userModel({
          firstname: firstname,
          lastname: lastname,
          email: email,
          password: hashPassword,
          contact: contact,         
        //   otp: otp,
        });
        newUser.save();
        if (newUser) {
          return res.status(201).json({
            message: "Successfully resgistered",
          });
        }
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  };

  export const login = async (req, res) => {
    try {
      const { email, password } = req.body;
      const isEmail = validator.isEmail(email);
      const isPassword = validator.isStrongPassword(password);
  
      if (!isEmail) {
        return res.status(400).json({
          message: "invalid email",
        });
      } else if (!isPassword) {
        return res.status(400).json({
          message:
            "passsword must be minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1,",
        });
      }
  
      const checkUser = await userModel.findOne({ email: email });
  
      if (!checkUser) {
        return res.status(400).json({
          message: "email not exist Please signup",
        });
      }
  
      const passwordCompare = await bcrypt.compare(password, checkUser.password);
      if (!passwordCompare) {
        return res.status(400).json({
          message: "Invlaid credetianls",
        });
      }
  
      const token = jwt.sign(
        {
          id: checkUser._id,
          email: checkUser.email,
        },
        "mysecretkey",
        { expiresIn: "1h" }
      );
  
      return res.status(200).json({
        token: token,
        message: "successfully login",
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  };


  export const getsingleUser = async (req, res) => {
    try {
      const id = req.params.user_id;
  
      const userData = await userModel.findOne({ _id: id });
      if (userData) {
        return res.status(200).json({
          data: userData,
          message: "Success",
        });
      }
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  };


  export const updateUser = async (req, res) => {
    try {
      const uploadData = upload.single("avatar");
      uploadData(req, res, async function (err) {
        if (err) return res.status(400).json({ message: err.message });
  
        const id = req.params.user_id;
  
        const { firstname, lastname, email, contact } =
          req.body;
  
        const userData = await userModel.findOne({ _id: id });
  
        let avatar = userData.avatar;
  
        if (req.file !== undefined) {
          avatar = req.file.filename;
          if (fs.existsSync("./uploads/user/" + userData.avatar)) {
            fs.unlinkSync("./uploads/user/" + userData.avatar);
          }
        }
  
        const updateUser = await userModel.updateOne(
          { _id: id },
          {
            $set: {
              firstname: firstname,
              lastname: lastname,
              email: email,
              contact: contact,
              avatar: avatar,
            },
          }
        );
  
        const updte = await userModel.findOne({ _id: id });
  
        if (updateUser.acknowledged) {
          return res.status(200).json({
            confirmData: updateUser,
            data: updte,
            message: "updated",
          });
        }
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  };


  export const deleteUser = async (req, res) => {
    try {
      const id = req.params.user_id;
  
      const userAvatar = await userModel.findOne({ _id: id });
  
  
      if (fs.existsSync("./uploads/user/" + userAvatar.avatar)) {
        fs.unlinkSync("./uploads/user/" + userAvatar.avatar);
      }
  
      const deletedUser = await userModel.updateOne(
        { _id: id },
        {
          $set: {
            status: 0,
          },
        }
      );
      if (deletedUser.acknowledged) {
        return res.status(200).json({
          message: "Deleted",
        });
      }
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  };
  
  
  