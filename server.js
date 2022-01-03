const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');   
const path = require('path');

dotenv.config();;
const app = express();

if(process.env.NODE_ENV === 'development'){
    app.use(morgan("dev"));
}

app.use(express.json());
app.use(express.urlencoded({extended:true}));

const rootPath = path.resolve();

/* File folder */
app.use("/uploads", express.static(path.join(rootPath, "/uploads")));


/* Error Handlers */
// app.use(notFound);
// app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server  running on port ${PORT} `))