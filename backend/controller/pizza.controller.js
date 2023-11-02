import pizzaModel from "../model/pizza.model";
import fs from "fs";
import path from "path";
import multer from "multer";


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      if (fs.existsSync("./uploads/pizza")) {
        cb(null, "./uploads/pizza");
      } else {
        fs.mkdirSync("./uploads/pizza");
        cb(null, "./uploads/pizza");
      }
    },
    filename: function (req, file, cb) {
      const name = file.originalname;
  
      const ext = path.extname(name);
      const nameArr = name.split(".");
      nameArr.pop();
      const fname = nameArr.join(".");
      const fullname = fname + "-" + Date.now() + ext;
      cb(null, fullname);
    },
  });
  const upload = multer({ storage: storage });


  export const getAllpizza = async (req, res) => {
    try {
      const Data = await pizzaModel.find();
      if (Data) {
        return res.status(200).json({
          data: Data,
          message: "success",
          path: "http://localhost:8004/uploads/pizza",
        });
      }
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  };


  export const addPizza = (req, res) => {
    try {
      const uploadData = upload.single("image");
      uploadData(req, res, function (error) {
        if (error) return res.status(400).json({ message: error.message });
  
        const { name,details,price,size } = req.body;
  
        let image = null;
        if (req.file !== undefined) {
          image = req.file.filename;
        }

       
  
        const createdRecord = new pizzaModel({
          name: name,
          details:details,
          price:price,
          size:size,
          image: image,
         
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

  export const getsinglepizza = async (req, res) => {
    try {
      const id = req.params.pizza_id;
  
      const pizzaData = await pizzaModel.findOne({ _id: id });
      if (pizzaData) {
        return res.status(200).json({
          data: pizzaData,  
          message: "Success",
          path: "http://localhost:8004/uploads/pizza",
        });
      }
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  };

  export const updatePizza = async (req, res) => {
    try {
      const uploadData = upload.single("image");
      uploadData(req, res, async function (err) {
        if (err) return res.status(400).json({ message: err.message });
  
        const id = req.params.pizza_id;
  
        const { name,details,price,size } = req.body;
  
        const pizzaData = await pizzaModel.findOne({ _id: id });
        console.log(pizzaData);
        let image = pizzaData.image;
  
        if (req.file !== undefined) {
          image = req.file.filename;
          if (fs.existsSync("./uploads/pizza/" + pizzaData.image)) {
            fs.unlinkSync("./uploads/pizza/" + pizzaData.image);
          }
        }
  
        const updatedpizza = await pizzaModel.updateOne(
          { _id: id },
          {
            $set: {
              name: name,
              details:details,
              price:price,
              size:size,
              image: image,
            },
          }
        );
        if (updatedpizza.acknowledged) {
          return res.status(200).json({
            data: updatedpizza,
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
  
  export const deletepizza = async (req, res) => {
    try {
      const id = req.params.pizza_id;
  
      const pizzaImage = await pizzaModel.findOne({ _id: id });
  
      if (fs.existsSync("./uploads/pizza/" + pizzaImage.image)) {
        fs.unlinkSync("./uploads/pizza/" + pizzaImage.image);
      }
  
      const deletedpizza = await pizzaModel.deleteOne({ _id: id });
      if (deletedpizza.acknowledged) {
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
  
  