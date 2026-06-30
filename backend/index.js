const port = process.env.PORT || 4000
const dns=require("dns");
dns.setServers(["192.168.1.1", "8.8.8.8"]);
const express=require("express");

const app=express();
const mngoose=require("mongoose");
const jwt=require("jsonwebtoken");
const multer=require("multer");
const path=require("path");
const cors=require("cors");
const bcrypt=require("bcryptjs");
const { default: mongoose } = require("mongoose");
app.use(cors());
app.use(express.json());

//databnase connection with mongodb 
mongoose.connect(process.env.MONGO_URI || "mongodb+srv://mahir:bluestacks1234@cluster0.fupp8jt.mongodb.net/");

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
        image_url:`${process.env.BACKEND_URL || `http://localhost:${port}`}/images/${req.file.filename}`
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
     //USER SCHEMA 
 
   const users=mongoose.model("User", {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        cartData:{
            type:Object,
        },
        date:{
            type:Date,
            default:Date.now,
        }
    });


 //creating Endpoint for registering  the user


  app.post('/signup', async (req, res) => {
    try {
            const { name, email, password } = req.body;

            if (!name || !email || !password) {
                return res.status(400).json({
                    success: 0,
                    message: "Name, email and password are required"
                });
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                return res.status(400).json({
                    success: 0,
                    message: "Please enter a valid email address"
                });
            }

            if (password.length < 8) {
                return res.status(400).json({
                    success: 0,
                    message: "Password must be at least 8 characters long"
                });
            }

            const existingUser = await users.findOne({ email });
            if (existingUser) {
                return res.status(400).json({
                    success: 0,
                    message: "An account with this email already exists"
                });
            }

            const hashedPassword = await bcrypt.hash(password, 10);


             let cart={};
             if (Array.isArray(req.body.cartData)) {
                 for(let i=0;i<req.body.cartData.length;i++){
                    cart[i]=0;
                 }
             }
            const user = new users({
                name: name,
                email: email,
                password: hashedPassword,
                cartData: cart,
            });
            await user.save();
  const data={
    user:{
        id:user.id
    }
  }
    const token=jwt.sign(data, process.env.JWT_SECRET || 'secret_key')

            res.json({
                success:1,
                message:"User registered successfully",
                token: token
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                success:0,
                message:"Error registering user"
            });
        }
    });
///API for user login

  app.post('/login', async (req, res) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({
          success: 0,
          message: "Email and password are required"
        });
      }

      const user = await users.findOne({ email });
      if (!user) {
        return res.status(400).json({
          success: 0,
          message: "Invalid email or password"
        });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({
          success: 0,
          message: "Invalid email or password"
        });
      }

      const data = {
        user: {
          id: user.id
        }
      };
      const token = jwt.sign(data, process.env.JWT_SECRET || 'secret_key');

      res.json({
        success: 1,
        message: "User logged in successfully",
        token: token
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: 0,
        message: "Error logging in user"
      });
    }
  });   
 //creating endpoint for newcollection data

 app.get('/newcollection', async (req, res) => {
    try {
      const products = await Product.find({});
      const newcollection=products.slice(1).slice(-8);
      console.log("New collection fetched ");
        res.send(newcollection);
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: 0,
        message: "Error fetching new collection data"
      });
    }
  });


  //creating endpoint for popular in women section

   app.get('/popularinwomen', async (req, res) => {
    try {
      const products = await Product.find({ category: { $regex: /^women$/i } });
      const popularInWomen = products.slice(0, 4);
      console.log("Popular in women section fetched ");
      res.send(popularInWomen);
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: 0,
        message: "Error fetching popular in women section data"
      });
    }
  });
    //creating middleware to fetch user

    const fetchUser=async(req,res,next)=>{
        const token=req.header('auth-token');
        if (!token) {
            return res.status(401).json({
                success: 0,
                message: "Access denied. No token provided."
            });
        }
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret_key');
            req.user = decoded.user;
            next();
        } catch (error) {
            res.status(401).json({
                success: 0,
                message: "Invalid token."
            });
        }
    }




     //creating endpoint for adding products in cart data

     app.post('/addtocart', fetchUser, async (req, res) => {
       try {
           let userData = await users.findOne({ _id: req.user.id });
           if (!userData.cartData) userData.cartData = {};
           userData.cartData[req.body.itemID] = (userData.cartData[req.body.itemID] || 0) + 1;
           userData.markModified('cartData');
           await userData.save();
           res.json({ success: 1, message: "Product added to cart" });
       } catch (error) {
         console.error(error);
         res.status(500).json({ success: 0, message: "Error adding product to cart" });
       }
     });

      //Creating endpoint to remove product from cart
 app.post('/removefromcart', fetchUser, async (req, res) => {
       try {
           let userData = await users.findOne({ _id: req.user.id });
           if (!userData.cartData) userData.cartData = {};
           if (userData.cartData[req.body.itemID] > 0) {
               userData.cartData[req.body.itemID] -= 1;
           }
           userData.markModified('cartData');
           await userData.save();
           res.json({ success: 1, message: "Product removed from cart" });
       } catch (error) {
           console.error(error);
           res.status(500).json({ success: 0, message: "Error removing product from cart" });
       }
   });

     //Creating endpoint to fetch the logged-in user's cart data

 app.get('/getcart', fetchUser, async (req, res) => {
       try {
           const userData = await users.findOne({ _id: req.user.id });
           const cartData = userData.toObject().cartData || {};
           res.json({ success: 1, cartData });
       } catch (error) {
           console.error(error);
           res.status(500).json({ success: 0, message: "Error fetching cart data" });
       }
   });



// Admin endpoint: all users' orders (cart data joined with products)
app.get('/allorders', async (req, res) => {
    try {
        const allUsers = await users.find({});
        const allProducts = await Product.find({});

        const productMap = {};
        allProducts.forEach(p => {
            const rawId = p.toObject().id;
            productMap[String(rawId)] = p;
        });

        const orders = [];
        allUsers.forEach(user => {
            const cartData = user.toObject().cartData || {};
            const items = [];
            let totalCost = 0;

            Object.entries(cartData).forEach(([itemId, qty]) => {
                if (qty > 0) {
                    const product = productMap[String(itemId)];
                    if (product) {
                        items.push({
                            product: {
                                id: product.toObject().id,
                                name: product.name,
                                image: product.image,
                                new_price: product.new_price,
                                category: product.category,
                            },
                            quantity: qty,
                        });
                        totalCost += product.new_price * qty;
                    }
                }
            });

            if (items.length > 0) {
                orders.push({
                    user: { name: user.name, email: user.email },
                    items,
                    totalCost,
                });
            }
        });

        res.json({ success: 1, orders });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: 0, message: "Error fetching orders" });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

