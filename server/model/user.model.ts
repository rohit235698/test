import * as  mongoose  from  'mongoose';
let Schema = mongoose.Schema;

// create a schema
let userSchema = new Schema({
  name: String,
  username: { type: String, required: true, unique: true },
  email : { type :String ,required : true },
  password: { type: String, required: true },
  salt : { type : String }
});

// the schema is useless so far
// we need to create a model using it
let User = mongoose.model('User', userSchema);
export { User }
// make this available to our users in our Node applications