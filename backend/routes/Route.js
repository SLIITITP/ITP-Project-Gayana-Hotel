const {Router} =require("express")
const router = Router()

const {getCategory,
    saveCategory,
    deleteCategory,
    updateCategory,
    getCategoryById
} = require("../controllers/CategoryControllers")

const {
    getitems,
    additem,
    updateItem,
    deleteItem,
    getItemById
} = require("../controllers/ItemControllers")

const{
    getOrder,
    updateOrder,
    deleteOrder,
    getOrderById,
    saveOrder,
    getLastOrderNumber
}= require("../controllers/OrderControllers")

const{
    getSupplier,
    addSupplier,
    deleteSupplier,
    getSupplierById
}= require("../controllers/SupplierConntrollers")

//category router
router.get("/category/get",getCategory);
router.post("/category/save",saveCategory)
router.get("/category/get/:id",getCategoryById)
router.put("/category/update/:id",updateCategory)
router.delete("/category/delete/:id",deleteCategory) 

//item router
router.get("/item/get",getitems)
router.get("/item/get/:id",getItemById)
router.post("/item/save",additem)
router.put("/item/update/:id",updateItem)
router.delete("/item/delete/:id",deleteItem)

//order router
router.get("/order/get",getOrder)
router.get("/order/get/:id",getOrderById)
router.post("/order/save",saveOrder)
router.put("/order/update/:id",updateOrder)
router.delete("/order/delete/:id",deleteOrder)
router.get("/order/lastNumber", getLastOrderNumber);

//supplier router
router.get("/supplier/get",getSupplier)
router.get("/supplier/get:id",getSupplierById)
router.delete("supplier/delete/:id",deleteSupplier)
router.post("/supplier/save",addSupplier)

module.exports = router;