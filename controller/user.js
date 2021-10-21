const router = require('express').Router();
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const {check,validationResult, Result}  = require('express-validator');
const User= require('../models/user.js');
const user = require('../models/user.js');




router.use(bodyParser.json());
router.use(bodyParser.urlencoded(true));

router.get('/users',(req,res)=>{
    res.send('Controller working fine');
});

router.get('/find/:name',(req,res)=>{
    User.find({name:req.params.name},{password:0},(error,result)=>{
        if(error)
        {
           return res.json({
                error
            })
        }
        
        return res.json({
            result
        })
    })
})

router.put('/update/:name',(req,res)=>{
    User.update({name:req.params.name},{name:'Syed Ammar Hussain'},(error,result)=>{
        if(error)
        {
            return res.json({
                error
            })
        }
        return res.json({
            result
        })
    })
})

router.delete('/remove/:name',(req,res)=>{
    User.remove({name:req.params.name},(error,result)=>{
        if(error)
        {
            return res.json({error});
        }
        return res.json({
            result
        });
    })
})


router.post('/insert',
[
    check('name').not().isEmpty().trim().escape(),
    check('password').not().isEmpty().trim().escape(),
    check('email').isEmail().normalizeEmail()
    
]
,(req,res)=>{
    const errors = validationResult(req);
    if(errors.isEmpty())
    {
        const hashed = bcrypt.hashSync(req.body.password,10);
        // User.create({
        //     name:req.body.name,
        //     email:req.body.email,
        //     password:hashed
        // },
        // ((error,result)=>{
        //     if(error)
        //     {
        //        return res.json({
        //            type : "Androoni",
        //            ourErrors : error
        //        });
        //     }
        //     return res.json({
        //         data:result
        //     })
        // }))

        var user1 = new User({
            name:req.body.name,
            password:bcrypt.hashSync(req.body.name,10),
            email:req.body.email
        });
        user1.save((error,result)=>{
            if(error)
            {
               return res.json({
                    type:'Androoni',
                    error
                })
            }

            return res.json({
                type:'Success',
                result
            })
        })

    //    return res.json({
    //         status:true,
    //         message:'User Data Ok ',
    //         data:req.body,
    //         hashed
    //     })
    }
    else
    {
        
    return res.json({
        type:'Main',
        ourErrors:errors.array()
        
    })

    }

})

module.exports = router;