import * as  mongoose  from  'mongoose';
let Schema = mongoose.Schema;


let deliverySchema = new Schema({
match_id : {type : Number},
inning : {type : Number},
batting_team : {type : String},
bowling_team : {type : String},
over : {type : Number},
ball : {type : Number},
batsman : {type : String},
non_striker : {type : String},
bowler : {type : String},
is_super_over : {type : Number},
wide_runs : {type : Number},
bye_runs : {type : Number},
legbye_runs : {type : Number},
noball_runs : {type : Number},
penalty_runs : {type : Number},
batsman_runs : {type : Number},
extra_runs : {type : Number},
total_runs : {type : Number},
player_dismissed : {type : String},
dismissal_kind : {type : String },
fielder : {type :String}
})

let Delivery = mongoose.model('Delivery', deliverySchema,'deliveries');
export { Delivery }