const router = require("express").Router();
const conentUnitController = require("../controllers/conentUnitController");
const { isAuthenticated } = require("../middlewares/auth");

router.get("/getConentUnitById", isAuthenticated, conentUnitController.getConentUnitById);

router.get("/getConentUnits", isAuthenticated, conentUnitController.getConentUnit);

router.post("/postConentUnit", isAuthenticated, conentUnitController.postConentUnit);

router.put("/deleteConentUnit", isAuthenticated, conentUnitController.deleteConentUnit);

module.exports = router;
