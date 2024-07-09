const { Router } = require("express")
const { authMdw } = require("../middleware/auth.middleware")
const {
    addMessageCtrl,
    getAllMessagesCtrl
} = require("../controllers/messages.controller")

const router = Router()

router.get("/", authMdw(['PUBLIC']), getAllMessagesCtrl)

router.post("/", authMdw(['USER', 'ADMIN']), addMessageCtrl)

module.exports = router