const slugify = require('slugify');
const db = require('../../database/db.config');
const Agent = db.agents;

//************************************************* */
exports.create=(req, res)=> {
    const{First_Name, Last_Name, Email, Phone_Number, Showroom} = req.body;
    let gallery = [];
    if (req.files && req.files.length > 0) {
        gallery = req.files.map(file => ({ name: file.filename }));
    }

    if (!First_Name || !Last_Name || !Email || !Phone_Number || !Showroom) {
        return res.status(400).send({
            message: 'Content can not be empty'
        });
    }
const slug = slugify(First_Name, '-');
const newAgent = new Agent({
    First_Name : First_Name,
    Last_Name: Last_Name ,
    Email: Email,
    Phone_Number: Phone_Number,
    Showroom: Showroom,
    gallery: gallery 
    
});
newAgent.save().then((data) => {
    res.status(200).send({
        message: 'Successfully created new agent',
        data: data 
    });
}) 
.catch(err => {
     console.log(err);
     
});
}

//************************************************* */


exports.findAll = (req, res) => {
    Agent.find({
    }).then((data) => {
        res.send(data);
    }).catch((err) =>{
        console.log(err);
    });
}


//************************************************* */

exports.delete = (req, res) => {
    const id = req.params.id;
    if(!id){
        res.status(400).send({ message: "content is required" });
    }
    Agent.findByIdAndDelete(id).then((data) => {
    if (!data) {
        res.status(404).send({ message: "Agent not Found" });
}
res.status(200).send({ message: "Agent was Successfully deleted" });
    })
};

//************************************************* */

exports.findOne=(req, res)=> {
    const id = req.params.id;
    if(!id) {
        res.status(400).send({ message: "content is required" });
    }
    Agent.findById(id).then((data) => {
        res.send(data);
    }).catch((err) => {
        console.log(err);
    });
}


//************************************************* */

exports.update =(req, res) =>{
const id = req.params.id;
const {First_Name, Last_Name, Email, Phone_Number, Showroom} = req.body;
if(!id || !First_Name || !Last_Name || !Email || !Phone_Number || !Showroom) {
    res.status(400).send({ message: "content is required "});
    }
    Agent.findByIdAndUpdate(id,
    {First_Name: First_Name, Last_Name: Last_Name, Email: Email, Phone_Number: Phone_Number, Showroom: Showroom}, 
    {useFindAndModify: false}).then((data) =>{
        if(!data){
            res.status(404).send({ message: `Can not update Agent with id=${id}`});
            }
            res.status(200).send({ message: `Agent was successfully updated`});
            }).catch((err) =>{
            console.log(err);
            });
}
