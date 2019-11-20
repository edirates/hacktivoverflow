const Question = require("../models/question");
const Answer = require("../models/answer");

class QuestionController {
    static findAll (req, res, next) {
        Question.find()
        .populate("UserId", "-password")
        .sort({
            createdAt: "DESC"
        })
        .then((questions) => {
            res.status(200).json(questions);
        })
        .catch((err) => {
            next(err);
        });
    }

    static findOne (req, res, next) {
        Question.findById(req.params.id)
        .populate({
            path: "answers",
            model: "Answer",
            options: {
                sort: {
                    createdAt: "DESC"
                }
            },
            populate: {
                path: "UserId",
                model: "User"
            }
        })
        .populate("UserId", "-password")
        .then((question) => {
            if (question) {
                res.status(200).json(question);
            } 
            else{
                let err = { status: 404, message: `Question not found` };
                next(err);
            }
        })
        .catch((err) => {
            next(err);
        });
    }

    static create (req, res, next) {
        let tags = [];
        if (req.body.tags) {
            tags = req.body.tags.split(",");
        }
        Question.create({
            title: req.body.title,
            description: req.body.description,
            tags: tags,
            UserId: req.user._id
        })
        .then((question) => {
            res.status(201).json(question);
        })
        .catch((err) => {
            next(err);
        });
    }

    static update (req, res, next) {
        let tags = [];
        if (req.body.tags) {
            tags = req.body.tags.split(",");
        }
        Question.findByIdAndUpdate(req.params.id, 
        { $set: {
            title: req.body.title,
            description: req.body.description,
            tags: tags
        }}, { 
            omitUndefined: true, 
            runValidators:true, 
            new: true 
        })
        .populate("UserId", "-password")
        .then((question) => {
            if (question) {
                res.status(200).json(question);
            } 
            else{
                let err = { status: 404, message: `Question not found` };
                next(err);
            }
        })
        .catch((err) => {
            next(err);
        });
    }
    
    static delete (req, res, next) {
        Question.findByIdAndDelete(req.params.id)
        .then((question) => {                
            return Answer.deleteMany({ QuestionId: req.params.id });
        })
        .then((answer) => {
            res.status(200).json({ message: "Question deleted successfully" });
        })
        .catch((err) => {
            next(err);
        });
    }

    static solution(req, res, next) {
        Question.findById(req.params.id)
        .then((question) => {
            if (question.solution !== req.body.AnswerId) {
                question.solution = req.body.AnswerId;
                return question.save();
            } 
            else {
                question.solution = "";
                return question.save();
            }
        })
        .then((updated) => {
            res.status(200).json({ message: "Solution selected" });
        })
        .catch((err) => {
            next(err);
        });
    }

    static upvote(req, res, next) {
        Question.findById(req.params.id)
        .then((question) => {
            if (question.upvotes.includes(req.user._id) === false) {
                const downvote = question.downvotes.indexOf(req.user._id);
                if (downvote >= 0) {
                    question.downvotes.splice(downvote, 1);
                }
                question.upvotes.push(req.user._id);
                return question.save();
            } else {
                const index = question.upvotes.indexOf(req.user._id);
                question.upvotes.splice(index, 1);
                return question.save();
            }
        })
        .then((voted) => {
            res.status(200).json({ message: "Upvoted question" });
        })
        .catch((err) => {
            next(err);
        });
    }

    static downvote(req, res, next) {
        Question.findById(req.params.id)
        .then((question) => {
            if (question.downvotes.includes(req.user._id) === false) {
                const upvote = question.upvotes.indexOf(req.user._id);
                if (upvote >= 0) {
                    question.upvotes.splice(upvote, 1);
                }
                question.downvotes.push(req.user._id);
                return question.save();
            } else {
                const index = question.downvotes.indexOf(req.user._id);
                question.downvotes.splice(index, 1);
                return question.save();
            }
        })
        .then((voted) => {
            res.status(200).json({ message: "Downvoted question" });
        })
        .catch((err) => {
            next(err);
        });
    }
}

module.exports = QuestionController;
