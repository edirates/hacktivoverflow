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
            questions.forEach( el => {
                let content = 
                `Hello, ${el.UserId.name}
                Your question "${el.title}" has been answered for ${el.answers.length} times. Please check your question for more details.`
                
                let email = el.UserId.email
                queue.create("email", { email, content }).save();
            });
        })
        .catch(function (err) {
            console.log(err)
        });
        
        queue.process("email", 5, function (job, done) {
            nodemailer(job.data.email, job.data.content);
            done();
        })
    })
} 

module.exports = cronMail;