const User = require('../models/user');
const jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);
var axios = require('axios');

module.exports = {
    register: (req, res) => {
        let { name, city, email, password } = req.body
        let hash = bcrypt.hashSync(password, salt);
        User.create({
            name: name,
            city: city,
            email: email,
            password: hash,
        })

            .then((result) => {
                res.status(201).json({
                    msg: 'yeay !, you have registered',
                    result
                })
            })
            .catch((err) => {
                    res.status(500).json({
                    msg: err.message
                })
            });
    },

    getUsers: (req, res) => {
        User.find()
            .then((users) => {
                res.status(200).json(users)
            })
            .catch((err) => {
                res.status(500).json({
                    msg: err.message
                })
            });
    },

    updateUser: (req, res) => {
        const { name, email } = req.body
        User.findOne({ _id: req.params.id })
            .then((result) => {
                if (result) {
                    User.updateOne({_id : req.params.id},{
                        name: name || result.name,
                        email: email || result.email,
                    })
                        .then((result) => {
                            res.status(201).json({
                                msg: 'data updated',
                                result
                            })
                        })
                        .catch((err) => {
                            res.status(500).json({
                                msg: err.message
                            })
                        });
                } else {
                    res.status(404).json({
                        msg: 'data not found'
                    })
                }
            })
            .catch((err) => {
                res.status(500).json({
                    msg: err.message
                })
            });
    },

    removeUser: (req,res) => {
        User.deleteOne({_id : req.params.id})
        .then(() => {
            res.status(201).json({
                msg: 'data deleted'
            })
        })
        .catch((err) => {
            res.status(500).json({
                msg: err.message
            })
        });   
    },

    signFb: (req, res) => {
        let token = req.body.token
        let user_info = `https://graph.facebook.com/me?fields=id,name,email&access_token=${token}`
        axios.get(user_info)
        .then((result) => {
           User.findOne({email : result.data.email})
            .then((user) => {
               if(user){
                    let token = jwt.sign({
                        id: user._id,
                        name: user.name,
                        city: 'tasikmalaya',
                        email: user.email
                    },process.env.secret)
                    
                    res.status(200).json({
                       msg: 'login succes',
                       token
                   })
                }else{
                    User.create({
                        name: result.data.name,
                        email: result.data.email,
                        password: result.data.email,
                        city: 'tasikmalaya'
                    })
                    .then((newUser) => {
                        let token = jwt.sign({
                            id: newUser._id,
                            name: newUser.name,
                            email: newUser.email
                        },process.env.secret)

                        res.status(200).json({
                            msg: 'login succes',
                            token
                        })

                    })
                    .catch((err) => {
                        res.status(500).json({
                            msg: err.message
                        })
                    });
                }
            })
            .catch((err) => {
                res.status(500).json({
                    msg: err.message
                })
            });
        })
        .catch((err) => {
            res.status(500).json({
                msg: err.message
            })
        });
    },

    signin:(req, res) => {
        console.log(req.body);
        
        User.findOne({email: req.body.email})
        .then((userLogin) => {
            console.log(userLogin);
           let result =  bcrypt.compareSync(req.body.password, userLogin.password);
           if(result){
               let token = jwt.sign({
                   id: userLogin.id,
                   name: userLogin.name,
                   city: userLogin.city,
                   email: userLogin.email,
                   password: userLogin.password
               },process.env.secret)

               res.status(200).json({
                   msg:'login succes',
                   token
                })
           }else{
               res.status(500).json({
                   msg: 'password wrong'
               })
           }
        })
        .catch((err) => {
            res.status(500).json({
                msg: 'email / password wrong'
            })

        });
    }
};