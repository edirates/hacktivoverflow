const cron = require("node-cron");
const kue = require("kue");
const nodemailer = require("./nodemailer.js");
const Questions = require("../models/question.js");
const queue = kue.createQueue({
    redis: {
        host: "localhost",
        port: 6379
    }
});

function cronMail () {
    cron.schedule("* * * 1 * *", () => {
        Questions.find()
        .populate("UserId")
        .then(function (questions) {
            questions.forEach( question => {
                let message = 
                `Hello, ${question.UserId.name}
                Your question "${question.title}" has been answered for ${question.answers.length} times. Please check your question for more details.`
                
                let email = question.UserId.email
                queue.create("email", { email, message }).save();
            });
        })
        .catch(function (err) {
            console.log(err)
        });
        
        queue.process("email", 10, function (job, done) {
            nodemailer(job.data.email, job.data.message);
            done();
        })
    })
} 

module.exports = cronMail;