const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");   
const path = require("path");
const {notFound,errorHandler} = require('./middleware/errorMiddleware');

dotenv.config();
const app = express();

if(process.env.NODE_ENV === 'development'){
    app.use(morgan("dev"));
}

app.use(express.json());
app.use(express.urlencoded({extended:true}));

// routes import
const userRoutes = require("./routes/user");
const categoryRoutes = require("./routes/category");
const productRoutes = require("./routes/product");
const clientRoutes = require("./routes/client");
const orderRoutes = require("./routes/order");
const tableRoutes = require("./routes/table");
const uploadRoutes = require("./routes/upload");
// routes
app.use("/api/users", userRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/clients", clientRoutes);
app.use("/api/tables", tableRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/upload", uploadRoutes);

// use swagger
// setup swagger Docs
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');
const swaggerOptions = {
    swaggerDefinition:{
        info:{
            title:"Resturant API",
            description:"APIs for any resturant",
            contact:{
                name:"saif"
            },
            servers:["http://localhost:5000","https://restaurantsaifhany.herokuapp.com"],
        }
    },
    apis:['./routes/category.js','./routes/client.js','./routes/order.js','./routes/product.js','./routes/table.js','./routes/user.js']
};
const swaggerDocs = swaggerJSDoc(swaggerOptions);
const basicAuth = require('express-basic-auth');
app.use('/api-docs',basicAuth({
    users:{
        'swagger':'swagger-api/docs@restaurant'
    },
    challenge:true,
}),swaggerUI.serve,swaggerUI.setup(swaggerDocs));
const rootPath = path.resolve();

/* File folder */
app.use("/uploads", express.static(path.join(rootPath, "/uploads")));



/* Error Handlers */
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server  running on port ${PORT} `))