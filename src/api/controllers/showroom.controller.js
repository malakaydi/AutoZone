const slugify = require('slugify');
const db = require('../../database/db.config');
const Room = db.showrooms;

exports.create = (req, res) => {
    const { Name, Address, Area_Name, Status, Schedule } = req.body;
    if (!Name || !Address || !Area_Name || !Status || !Schedule) {
        return res.status(400).send({
            message: 'Content can not be empty'
        });
    }
    const slug = slugify(Name, '-');
    const newRoom = new Room({
        Name: Name,
        Address: Address,
        Area_Name: Area_Name,
        Status: Status,
        Schedule: Schedule,
    });
    newRoom.save().then((data) => {
        res.status(200).send({
            message: 'Successfully created new room'
        });
    }).catch(err => {
        console.log(err);
        res.status(500).send({
            message: 'Some error occurred while creating the room.'
        });
    });
};

exports.findAll = (req, res) => {
    Room.find({}).then((data) => {
        res.send(data);
    }).catch((err) => {
        console.log(err);
        res.status(500).send({
            message: err.message || 'Some error occurred while retrieving rooms.'
        });
    });
};

exports.delete = (req, res) => {
    const id = req.params.id;
    if (!id) {
        res.status(400).send({ message: "Content is required" });
    }
    Room.findByIdAndDelete(id).then((data) => {
        if (!data) {
            res.status(404).send({ message: "Room not found" });
        }
        res.status(200).send({ message: "Room was successfully deleted" });
    }).catch(err => {
        console.log(err);
        res.status(500).send({
            message: err.message || 'Some error occurred while deleting the room.'
        });
    });
};

exports.findOne = (req, res) => {
    const id = req.params.id;
    if (!id) {
        res.status(400).send({ message: "Content is required" });
    }
    Room.findById(id).then((data) => {
        res.send(data);
    }).catch((err) => {
        console.log(err);
        res.status(500).send({
            message: err.message || 'Some error occurred while retrieving room.'
        });
    });
};

exports.update = (req, res) => {
    const id = req.params.id;
    const { Name, Address, Area_Name, Status, Schedule } = req.body;
    if (!id || !Name || !Address || !Area_Name || !Status || !Schedule) {
        res.status(400).send({ message: "Content is required" });
    }
    Room.findByIdAndUpdate(id,
        { Name: Name, Address: Address, Area_Name: Area_Name, Status: Status, Schedule: Schedule },
        { useFindAndModify: false }).then((data) => {
            if (!data) {
                res.status(404).send({ message: `Can not update Room with id=${id}` });
            }
            res.status(200).send({ message: `Room was successfully updated` });
        }).catch((err) => {
            console.log(err);
            res.status(500).send({
                message: err.message || 'Some error occurred while updating the room.'
            });
        });
};