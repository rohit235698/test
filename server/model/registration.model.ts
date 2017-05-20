import * as  mongoose  from  'mongoose';
let Schema = mongoose.Schema;

// create a schema
let registerSchema = new Schema({

  			 			   fullName : {type : String},
                           mobile :{ type : Number },
                           eMail : { type : String ,lowercase :true},
                           iDCard: { data: Buffer, contentType: String },
                           registrationType : { type : String },
                           noTickets: { type :Number}
});

// the schema is useless so far
// we need to create a model using it
let Register = mongoose.model('User', registerSchema);
export { Register }
// make this available to our users in our Node applications