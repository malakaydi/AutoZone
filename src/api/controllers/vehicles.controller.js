const slugify = require('slugify');
const db = require('../../database/db.config');
const Vehicle = db.vehicles;

//************************************************* */
exports.create=(req, res)=> {
    const{images,Brand, Model, Body, Place_Number, Door_Number, Cylinders_Number ,Gear_Box ,Color, Status, Showroom, Price} = req.body;
    if(!images||!Brand || !Model || !Body || !Place_Number  || !Door_Number  || !Cylinders_Number || !Gear_Box  || !Color|| !Status|| !Showroom || !Price){
       return res.status(400).send({
        message:'content can not be empty'
       });
}
const slug = slugify(Brand, '-');
const newVehicle = new Vehicle({
    images:images,
    Brand : Brand,
    Model:Model,
    Body: Body ,
    Place_Number:Place_Number,
    Door_Number:Door_Number,
    Cylinders_Number:Cylinders_Number,
    Gear_Box:Gear_Box,
    Color: Color,
    Status: Status,
    Showroom: Showroom,
    Price:Price,
    
});
newVehicle.save(newVehicle).then((data) =>{
    res.status(200).send({
        message: 'seccessufully created new Vehicle'
    });
}) 
.catch(err => {
     console.log(err);
});
}

//************************************************* */


exports.findAll = (req, res) => {
    Vehicle.find({
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
    Vehicle.findByIdAndDelete(id).then((data) => {
    if (!data) {
        res.status(404).send({ message: "Vehicle not Found" });
}
res.status(200).send({ message: "Vehicle was Successfully deleted" });
    })
};

//************************************************* */

exports.findOne=(req, res)=> {
    const id = req.params.id;
    if(!id) {
        res.status(400).send({ message: "content is required" });
    }
    Vehicle.findById(id).then((data) => {
        res.send(data);
    }).catch((err) => {
        console.log(err);
    });
}


//************************************************* */

exports.update =(req, res) =>{
const id = req.params.id;
const {images,Brand, Model, Body, Place_Number, Door_Number, Cylinders_Number ,Gear_Box ,Color, Status, Showroom, Price} = req.body;
if(!id ||! images|| !Brand || !Model || !Body || !Place_Number  || !Door_Number  || !Cylinders_Number || !Gear_Box  || !Color|| !Status|| !Showroom || !Price) {
    res.status(400).send({ message: "content is required "});
    }
    Vehicle.findByIdAndUpdate(id,
    {images:images,Brand: Brand, Model: Model, Body:Body ,Place_Number:Place_Number,Door_Number:Door_Number,Cylinders_Number:Cylinders_Number, Gear_Box:Gear_Box , Color: Color, Status: Status, Showroom: Showroom, Price: Price}, 
    {useFindAndModify: false}).then((data) =>{
        if(!data){
            res.status(404).send({ message: `Can not update Vehicle with id=${id}`});
            }
            res.status(200).send({ message: `Vehicle was successfully updated`});
            }).catch((err) =>{
            console.log(err);
            });
}
