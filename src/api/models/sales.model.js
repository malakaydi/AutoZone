module.exports = mongoose => {
    const Schema =mongoose.Schema;
    let SalesSchema = new Schema({
        Amount:{type: Number, required: true},
        Agent_Name:{type: String, required: true},
        Showroom:{type: String, required: true},
        Vehicle_ID:{type: String, required: true},
        Date: { type: Date,  required: true }
    }, {
        timestamps: true
    }
    );

    SalesSchema.method('toJSON', function(){
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    })    
    const Sales = mongoose.model('Sales', SalesSchema);
    return Sales;
}
