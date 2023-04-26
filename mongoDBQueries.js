//Task-2
//1) Find all the information about each products
db.products.find({}).pretty();

//2)Find the product price which are between 400 to 800
db.products.find({product_price: {$gte: 400, $lte: 800}}).pretty();

//3)Find the product price which are not between 400 to 600
db.products.find( { price: { $not: {$gte: 400, $lte: 600 } } } ).pretty();

//4) List the four product which are greater than 500 in price 
db.products.find({product_price:{$gt:500}}).limit(4).pretty();

//5) Find the product name and product material of each products
db.products.find({},
  {product_name:1,
product_material:1
  }).pretty();

//6) Find the product with a row id of 10
db.products.aggregate([{$match:{id:"10"}}]).pretty();

//7)Find only the product name and product material
db.products.findOne({}, {product_name:1,
  product_material:1
    }).pretty();

//8) Find all products which contain the value of soft in product material 
db.products.aggregate([{$match: {product_material:"Soft"}}]).pretty();   

//9)Find products which contain product color indigo  and product price 492.00
db.products.aggregate( [
  { $match: { $and: [ { product_color: "indigo" }, { product_price: 492.00 } ] } }
] ).pretty();

//10) Delete the products which product price value are same
db.products.aggregate([
  {$group: {_id: {price: "$price"}, count: {$sum: 1}}},
  {$match: {count: {$gt: 1}}}
]).forEach(function(doc){
   db.products.deleteMany({price: doc._id.price})
})