const express = require("express");
const router = express.Router();

const {
    getServices,
    createService,
    getService,
    updateService,
    deleteService,
} = require("../controllers/serviceController");

router.get("/", getServices);
router.post("/", createService);
router.get("/:id", getService);
router.put("/:id", updateService);
router.delete("/:id", deleteService);

module.exports = router;
