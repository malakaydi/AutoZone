module.exports = mongoose => {
    const Schema =mongoose.Schema;
    let VehiculeSchema = new Schema({
        images: [{ type: String }], 
        Brand: { type: String, required: true },
        Model: { type: String, required: true },
        Body: { type: String, required: true },
        Place_Number: { type: Number, required: true },
        Door_Number: { type: Number, required: true },
        Cylinders_Number: { type: Number, required: true },
        Gear_Box: { type: String, required: true },
        Color: { type: String, required: true },
        Status: { type: String, required: true },
        Showroom: { type: Schema.Types.ObjectId, ref: 'Room' },
        Price: { type: Number, required: true },


    }, {
        timestamps: true
    }
    );

    VehiculeSchema.method('toJSON', function(){
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    })    
    const Vehicle = mongoose.model('Vehicules', VehiculeSchema);
    return Vehicle;
}
