
const express = require("express");
const router = express.Router();
const postApiController = require("../../controllers/postApiController");

router.get("/", postApiController.index);
router.get("/:id", postApiController.show);
router.post("/", postApiController.store);
router.put("/:id", postApiController.update);
router.delete("/:id", postApiController.destroy);

module.exports = router;
