module.exports = mongoose => {
    const Schema = mongoose.Schema;

    // Define the schema for the gallery
    const gallerySchema = new Schema({
        name: {
            type: String
        }
    });

    
    const AgentSchema = new Schema({
        First_Name: { type: String, required: true },
        Last_Name: { type: String, required: true },
        Email: { type: String, required: true },
        Phone_Number: { type: Number, required: true },
        Showroom: { type: Schema.Types.ObjectId, ref: 'Room', required: true },
        gallery: [gallerySchema] // Use the defined gallery schema here
        
    }, {
        timestamps: true
    });

    
    AgentSchema.method('toJSON', function(){
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    
    const Agent = mongoose.model('Agent', AgentSchema);
    return Agent;
};
