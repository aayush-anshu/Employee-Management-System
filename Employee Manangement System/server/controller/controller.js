var UserDb = require('../model/model')


// create and save new user
exports.create=(req,res)=>{
    // validate request

    if(!req.body){
        res.status(400).send({message:"Content can not be empty!"});
        return;
    }

    // new user
    const user = new UserDb({
        name:req.body.name,
        email:req.body.email,
        gender:req.body.gender,
        status:req.body.status
    })

    // save user in data base
    user
        .save(user)
        .then(data =>{
            // res.send(data)
            res.redirect('/add-user')
        })
        .catch(err=>{
            res.status(500).send({message:err.message || "Some error "});
        });

}

// retrieve and return all user / retrive and return a single user
exports.find=(req,res)=>{

    if(req.query.id){

        const id = req.query.id;

        UserDb.findById(id)
            .then(data=>{
                if(!data){
                    res.status(404).send({message: "Not found user with id" +id})
                }
                else
                {
                    res.send(data)
                }
            })
            .catch(err=>{
                res.status(500).send({message:"Err retrieving user with id" +id})
            })

    }

    else{

        UserDb.find()
        .then(user=>{
            res.send(user)
        })
        .catch(err=>{
            res.status(500).send({message:err.message || "Error Occur"})
        })

    }

   
    
}

// update a new identified user by user id
exports.update=(req,res)=>{
    if(!req.body)
    {
        return res
            .status(400)
            .send({message: "Data to update can not be empty"})
    }
    
    const id = req.params.id;
    UserDb.findByIdAndUpdate(id,req.body,{useFindAndModify:false})
        .then(data=>{
            if(!data){
                res.status(404).send({message:`Cannot Update user with ${id}. Maybe user not found`})
            }
            else{
                res.send(data)
            }
        })
        .catch(err=>{
            res.status(500).send({message:"Error Update user information"})
        })

}

// Delete a user with specified user id in the request

exports.delete=(req,res)=>{

    const id = req.params.id


    UserDb.findByIdAndDelete(id)
        .then(data =>{
            if(!data){
                res.status(404).send({message: `Cannot Delete with id ${id}. Maybe id is wrong`})
            }
            else
            {
                res.send({message:"User was deleted succesfully! "})
            }
        })
        .catch(err=>{
            res.status(500).send({
                message:"Could not delete user with id ="+id
            });
        });


    
}