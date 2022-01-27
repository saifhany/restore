const Product = require('../models').Product;
const Table = require('../models').Table;
const Order = require('../models').Order;

// check stock of each product
exports.stock = async (list)=>{
    for(let index=0; index< list.length; index++){
        const productSearched = await Product.findByPk(list[index].id);
        if(productSearched.stock < list[index].quantity){
            return false;
        }
    }
    return true;
}
// update table
exports.updateTable = async(id,ocupied)=>{
    const table = await Table.findByPk(id);
    table.ocupied = ocupied;
    await table.save();
};
// Add products
exports.addProductsInOrder = async(order,products)=>{
    products.forEach( async(product)=>{
        await order.addProduct(product.id,{
            through:{quantity: product.quantity},
        });
    });
}
/*
update stock from products
condition
        +1 increase stock
        -1 decrease stock
*/
exports.updateProductsStock = async (products,condition)=> {
    await products.forEach(async (product)=>{
        const productToUpdate = await product.findByPk(product.id);
        if(productToUpdate){
            if(condition>=1){
                productToUpdate.stock += product.quantity;
            }else{
                productToUpdate.stock -= product.quantity;
            }
            await productToUpdate.save();
        }
    });
};