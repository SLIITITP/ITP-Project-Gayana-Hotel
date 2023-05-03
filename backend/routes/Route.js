const {Router} =require("express")
const router = Router()

const {
    getVehicle,
    addVehicle,
    updateVehicle,
    deleteVehicle,
    getVehicleById
} = require("../controllers/vehicleControllers")

//vehicle router
router.get("/vehicle/get",getVehicle);
router.post("/vehicle/save",addVehicle)
router.get("/vehicle/get/:id",getVehicleById)
router.put("/vehicle/update/:id",updateVehicle)
router.delete("/vehicle/delete/:id",deleteVehicle) 

module.exports = router;

