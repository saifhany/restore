const express = require('express');
const router =  express.Router();
const  {protect} = require("../middleware/authMiddleware");
const {createClient,
    getClients,
    getClient,
    updateClient,
    deleteClient,
    } = require("../controller/client");
const {runValidation} = require("../validators");
const {clientCreateValidator } = require("../validators/client");

router
     .route("/")
     .post(protect,clientCreateValidator,runValidation,createClient)
     .get(protect,getClients);

router.route("/:id")
       .get(protect,getClient)
       .put(protect,updateClient)
       .delete(protect,deleteClient);

module.exports = router;       
