const express = require("express");
const router = express.Router();
const {getContact,createContact,updateContact,deletecContact,getContacts} = require("../controller/contactController");
const validateToken = require("../middleware/validateTokenHandler");


router.use(validateToken);

router.route("/").get(getContacts).post(createContact);


router.route("/:id").get(getContact);

router.route("/:id").put(updateContact);

router.route("/:id").delete(deletecContact);

module.exports = router;
