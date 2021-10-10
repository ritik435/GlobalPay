const express=require('express');
const router=express.Router();
const paymentsController=require('../controllers/payments_Controller');

router.post('/create/:id', paymentsController.create);

module.exports=router;