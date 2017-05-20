import * as  mongoose  from  'mongoose';
let Schema = mongoose.Schema;

// create a schema
let eventSchema = new Schema({
  eventName: String,
  datAndTime: { type: Date ,required : true },
  location : { type :String ,required : true },
  eventType: { type: String, required: true },
  participants : { type :Number, default : 0 }
});

// the schema is useless so far
// we need to create a model using it
let EventModel = mongoose.model('Event', eventSchema);
export { EventModel }
// make this available to our users in our Node applications