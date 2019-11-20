const router = require("express").Router();
const userRouter = require("./user.js");
const questionRouter = require("./question.js");
const answerRouter = require("./answer.js");

router.use("/users", userRouter);
router.use("/questions", questionRouter);
router.use("/answers", answerRouter);

module.exports = router;