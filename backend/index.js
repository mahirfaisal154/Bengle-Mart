const port=4000
const dns=require("dns");
dns.setServers(["192.168.1.1", "8.8.8.8"]);
const express=require("express");

const app=express();
const mngoose=require("mongoose");
const jwt=require("jsonwebtoken");
const multer=require("multer");
const path=require("path");
const cors=require("cors");
const { default: mongoose } = require("mongoose");
app.use(cors());
app.use(express.json());

//databnase connection with mongodb 
mongoose.connect("mongodb+srv://mahir:bluestacks1234@cluster0.fupp8jt.mongodb.net/");

//api creation

app.get("/", (req, res) => {
    res.send("Express app is running");
});

  //Image Storage Engine
  const storage=multer.diskStorage({
    destination:'./uploads/images',
    filename: (req, file, cb) => {
        return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
  }
})

const upload=multer({ storage: storage });


//creating upload Endpoint for images
app.use ('/images', express.static('uploads/images'));
app.post("/upload",upload.single("product"), (req, res) => {
    res.json({
        success:1,
        image_url:`http://localhost:${port}/images/${req.file.filename}`
    })
})

//schema for Creating Products

const Product=mongoose.model("Product", {
id:{
    type:Number,
    required:true,
},
name:{
    type:String,
    required:true
},

category:{
    type:String,
    required:true
},
new_price:{
    type:Number,
    required:true
},
old_price:{
    type:Number,
    required:true
},
image:{
    type:String,
    required:true
},
date:{
    type:Date,
    default:Date.now,
},
available:{
    type:Boolean,
    
    default:true,
}

});

app.post('/addproduct',async (req, res) => {
    let products=await Product.find({});
    let id;
    if(products.length>0){
        id=products[products.length-1].id+1;
    }else{
        id=1;
    }
    try {
        const product = new Product({
            id: id,
            name: req.body.name,
            category: req.body.category,
            new_price: req.body.new_price,
            old_price: req.body.old_price,
            image: req.body.image
        });
        await product.save();
        res.json({
            success:1,
            message:"Product added successfully"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success:0,
            message:"Error adding product"
        });
    }
});
//creating api for deleting products

app.post('/removeproduct',async (req, res) => {
    try {
        await Product.deleteOne({ id: req.body.id });
        res.json({
            success:1,
            message:"Product removed successfully"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success:0,
            message:"Error removing product"
        });
    }
});


//creating api for getting all products
app.get('/allproducts', async (req, res) => {
    try {
        const products = await Product.find({});
        res.json({
            success:1,
            products: products
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success:0,
            message:"Error fetching products"
        });
    }
});
/////baki ache heeee

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

