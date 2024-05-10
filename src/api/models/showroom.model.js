module.exports = mongoose => {
    const Schema = mongoose.Schema;
    
    const roomSchema = new Schema({
        Name: { type: String, required: true },
        Address: { type: String, required: true },
        Area_Name: { type: String, required: true },
        Status: { type: String, required: true },
        Schedule: { type: String },
    }, {
        timestamps: true
    });

    roomSchema.method('toJSON', function(){
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    const Room = mongoose.model('Room', roomSchema);
    return Room;
};