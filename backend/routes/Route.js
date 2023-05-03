const {Router} =require("express")
const router = Router()

//const {getCategory,
 //   saveCategory,
 //   deleteCategory,
 //   updateCategory,
 //   getCategoryById
//s} = require("../controllers/CategoryControllers")
const {
    getReservations,
    getReservationById,
    addReservation,
    updateReservation,
    deleteReservation
} = require("../controllers/ReservationCtrl")

const {
    getRooms,
    addRoom,
    updateRoom,
    deleteRoom,
    getRoomById
} = require("../controllers/RoomControllers")

//category router
//router.get("/category/get",getCategory);
//router.post("/category/save",saveCategory)
//router.get("/category/get/:id",getCategoryById)
//router.put("/category/update/:id",updateCategory)
//router.delete("/category/delete/:id",deleteCategory) 

//Room router
router.get("/Room/get",getRooms)
router.get("/Room/get/:id",getRoomById)
router.post("/Room/save",addRoom)
router.put("/Room/update/:id",updateRoom)
router.delete("/Room/delete/:id",deleteRoom)

//Reservation router
router.get("/Reservation/get",getReservations)
router.get("/Reservation/get/:id",getReservationById)
router.post("/Reservation/save",addReservation)
router.put("/Reservation/update/:id",updateReservation)
router.delete("/Reservation/delete/:id",deleteReservation)
module.exports = router;