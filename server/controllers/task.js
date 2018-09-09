const Task = require('../models/task')
const nodemailer = require('nodemailer');
let date = new Date().getDate()
let month = new Date().getMonth()
let year = new Date().getFullYear()

module.exports = {
    getUncompleteTasks: (req, res) => {
        let info = req.info
        Task.find({ userId: info._id, status: false }, null, { sort: { d_day: 1 } }
        )
            .then(tasks => {
                res.status(200).json({
                    tasks,
                    name: info.name
                })
            })

            .catch(err => {
                res.status(500).json({
                    msg: err.message,
                })
            })
    },

    insertTask: (req, res) => {
        let newTask = req.body
        Task.create({
            task: newTask.task,
            description: newTask.description,
            d_day: newTask.d_day,
            reminder: newTask.reminder,
            userId: req.info._id
        })
            .then((newTaskcreated) => {
                res.status(201).json({
                    msg: 'task created',
                    newTaskcreated
                })
            })
            .catch((err) => {
                res.status(500).json({
                    msg: err.message,
                })
            });
    },

    updateTask: (req, res) => {
        const { task, d_day, description, reminder } = req.body
        let info = req.info
        Task.findOne({ _id: req.params.id })
            .then((result) => {
                if (result) {
                    if (String(result.userId) === String(info._id)) {
                        Task.updateOne({ _id: req.params.id },
                            {
                                $set: {
                                    task: task || result.task,
                                    description: description || result.description,
                                    d_day: d_day || result.d_day,
                                    reminder: reminder || result.reminder
                                }
                            })
                            .then(() => {
                                res.status(201).json({
                                    msg: 'task updated',
                                })
                            })
                            .catch((err) => {
                                res.status(500).json({
                                    msg: err.message,
                                })
                            });

                    } else {
                        res.status(404).json({
                            msg: 'you dont have acces to update'
                        })
                    }
                } else {
                    res.status(404).json({
                        msg: 'data not found'
                    })
                }
            })
            .catch((err) => {
                res.status(500).json({
                    msg: 'data not found'
                })
            });

    },

    removeTask: (req, res) => {
        let info = req.info
        Task.findOne({ _id: req.params.id })
            .then((result) => {
                if (result) {
                    if (String(result.userId) === String(info._id)) {
                        Task.deleteOne({ _id: req.params.id })
                            .then((result) => {
                                res.status(200).json({
                                    msg: 'data deleted'
                                })
                            })
                            .catch((err) => {
                                res.status(500).json({
                                    msg: 'delete failed',
                                })
                            });
                    } else {
                        res.status(404).json({
                            msg: 'you dont have acces to update'
                        })
                    }
                } else {
                    res.status(404).json({
                        msg: 'data not found'
                    })
                }
            }).catch((err) => {
                res.status(404).json({
                    msg: 'data not found'
                })
            });

    },

    updateTaskDone: (req, res) => {
        let id = req.params.id
        let info = req.info
        Task.findById(id)
            .then((task) => {
                if (task) {
                    if (String(task.userId) === String(info._id)) {
                        Task.update({ _id: id }, { $set: { status: true } })
                            .then((result) => {
                                console.log(result);
                                res.status(201).json({
                                    msg: 'task selesai',
                                    result
                                })
                            })
                            .catch((err) => {
                                res.status(500).json({
                                    msg: err
                                })
                            });
                    } else {
                        res.status(404).json({
                            msg: 'you dont have acces to delete'
                        })
                    }
                } else {
                    res.status(404).json({
                        msg: 'data not found'
                    })
                }
            })
            .catch((err) => {
                res.status(500).json({
                    msg: err
                })
            });
    },

    getTodayTask: (req, res) => {
        let info = req.info
        Task.find({ userId: info._id })
            .then((tasks) => {
                let dataTodayTask = []
                tasks.forEach(task => {
                    let todayTask = task.d_day
                    let rDate = todayTask.getDate()
                    let mDate = todayTask.getMonth()
                    let yDate = todayTask.getFullYear()
                    if (rDate === date && mDate === month && yDate === year) {
                        dataTodayTask.push(task)
                    }
                });
                res.status(200).json({
                    dataTodayTask,
                    name: info.name
                }
                )
            })
            .catch((err) => {
                res.status(500).json(err)
            });
    },

    getCompleteTask: (req, res) => {
        let info = req.info
        Task.find({ userId: info._id, status: true }, null, { sort: { d_day: 1 } }
        )
            .then(tasks => {
                res.status(200).json({
                    tasks,
                })
            })

            .catch(err => {
                res.status(500).json({
                    msg: err.message,
                })
            })
    },

    reminder: (req, res) => {
        let info = req.info
        Task.find({ userId: info._id })
            .then((tasks) => {
                let todayReminder = []
                tasks.forEach(task => {
                    if (task.reminder && task.status === false) {
                        let reminder = task.reminder
                        let rDate = reminder.getDate()
                        let mDate = reminder.getMonth()
                        let yDate = reminder.getFullYear()
                        if (rDate === date && mDate === month && yDate === year) {
                            todayReminder.push(task)
                        }
                    }
                });

                if (todayReminder.length > 0) {
                    let textToSend = 'you have tasks to notice : '
                    todayReminder.forEach(obj => {
                        let d = obj.d_day.getDate()
                        let m = obj.d_day.getMonth()
                        let y = obj.d_day.getFullYear()
                        let format = d + '/' + m + '/' + y
                        textToSend += obj.task + ' deadline-day : ' + format + ', '
                    });
                    nodemailer.createTestAccount((err, account) => {
                        // create reusable transporter object using the default SMTP transport
                        let transporter = nodemailer.createTransport({
                            service: 'gmail',
                            auth: {
                                user: 'helmiyghacktiv8@gmail.com', // generated ethereal user
                                pass: process.env.password, // generated ethereal password
                            }
                        });


                        // setup email data with unicode symbols
                        let mailOptions = {
                            from: 'Todo Apps', // sender address
                            to: info.email, // list of receivers
                            subject: 'Reminder', // Subject line
                            text: textToSend, // plain text body
                            html: `<b>${textToSend}</b>` // html body
                        };

                        // send mail with defined transport object
                        transporter.sendMail(mailOptions, (error, info) => {
                            if (error) {
                                return console.log(error);
                            }
                            console.log('Message sent: %s', info.messageId);
                            // Preview only available when sending through an Ethereal account
                            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

                            // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
                            // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
                        });
                    });
                }
                // res.status(200).json(todayReminder)


            })
            .catch((err) => {
                res.status(500).json(err)
            });
    },
}