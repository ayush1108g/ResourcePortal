const resources = require("./../controllers/resourcescontroller");
const authentication= require("./../controllers/authstudent");
const express = require("express");
const router = express.Router();
router.route('/resources').get(authentication.protect,resources.getresources).post(resources.createresources)

module.exports = router;
