const express = require('express');
const connection = require('../connection');
const router = express.Router();

router.post('/create', (req, res, nex) => {
   let product = req.body;
   let query = "INSERT INTO product (name, description, price) VALUES (?, ?, ?)";
   connection.query(query, [product.name, product.description, product.price], (err, result) => {
      if (!err) {
         return res.status(200).json({
            message: "true",
            body: "Product Created Successfully"
         });
      } else {
         return res.status(500).json(err);
      }
   });
});

router.get('/fetch', (req, res, next) => {
   let query = "SELECT * FROM product";
   connection.query(query, (err, result) => {
      if (!err) {
         return res.status(200).json(result);
      } else {
         return res.status(500).json(err);
      }
   });
});

router.put('/update/:id', (req, res, next) => {
   const id = req.params.id;
   let product = req.body;
   let query = "UPDATE product SET name = ?, description = ?, price = ? WHERE id = ?";
   connection.query(query, [product.name, product.description, product.price, id], (err, result) => {
      if (!err) {
         if (result.affectedRows == 0) {
            return res.status(404).json({
               message: "false",
               body: "Product Id does not found"
            });
         }
         return res.status(200).json({
            message: "true",
            body: "Product Updated Successfully"
         });
      } else {
         return res.status(500).json(err);
      }
   });
})

router.delete('/delete/:id', (req, res, next) => {
   const id = req.params.id;
   let query = "DELETE from product where id = ?";
   connection.query(query, [id], (err, result) => {
      if (!err) {
         if (result.affectedRows == 0) {
            return res.status(404).json({
               message: "false",
               body: "Product Id does not found"
            });
         }
         return res.status(200).json({
            message: "true",
            body: "Product Deleted Successfully"
         });
      }
      else{
         return res.status(500).json(err);
      }

   });
})



module.exports = router;
