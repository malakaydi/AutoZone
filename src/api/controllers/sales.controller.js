const slugify = require('slugify');
const db = require('../../database/db.config');
const Sales = db.sales;

//************************************************* */
exports.create=(req, res)=> {
    const{Amount, Agent_Name, Showroom,Vehicle_ID, Date} = req.body;
    if(!Amount || !Agent_Name  || ! Showroom || !Vehicle_ID || !Date){
       return res.status(400).send({
        message:'content can not be empty'
       });
}
const slug = slugify(Date, '-');
const newSales = new Sales({
    Amount : Amount,
    Agent_Name: Agent_Name ,
    Showroom:Showroom,
    Vehicle_ID: Vehicle_ID,
    Date: Date
    
});
newSales.save(newSales).then((data) =>{
    res.status(200).send({
        message: 'seccessufully created new Sale'
    });
}) 
.catch(err => {
     console.log(err);
});
}

//************************************************* */


exports.findAll = (req, res) => {
    Sales.find({
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
    Sales.findByIdAndDelete(id).then((data) => {
    if (!data) {
        res.status(404).send({ message: "Sale not Found" });
}
res.status(200).send({ message: "Sale was Successfully deleted" });
    })
};

//************************************************* */

exports.findOne=(req, res)=> {
    const id = req.params.id;
    if(!id) {
        res.status(400).send({ message: "content is required" });
    }
    Sales.findById(id).then((data) => {
        res.send(data);
    }).catch((err) => {
        console.log(err);
    });
}


//************************************************* */

exports.update =(req, res) =>{
const id = req.params.id;
const {Amount, Agent_Name, Showroom,Vehicle_ID, Date} = req.body;
if(!id || !Amount || !Agent_Name ||! Showroom|| !Vehicle_ID || !Date) {
    res.status(400).send({ message: "content is required "});
    }
    Sales.findByIdAndUpdate(id,
    {Amount: Amount, Agent_Name: Agent_Name, Showroom: Showroom,Vehicle_ID: Vehicle_ID , Date: Date}, 
    {useFindAndModify: false}).then((data) =>{
        if(!data){
            res.status(404).send({ message: `Can not update Sale with id=${id}`});
            }
            res.status(200).send({ message: `Sale was successfully updated`});
            }).catch((err) =>{
            console.log(err);
            });
}
