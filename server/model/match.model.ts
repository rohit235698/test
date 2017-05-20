import * as  mongoose  from  'mongoose';
let Schema = mongoose.Schema;

// create a schema
let matchSchema = new Schema({
								id: {type:Number},
								season: {type : String},
								city: {type : String},
								date: {type :Date},
								team1: {type : String},
								team2: {type : String},
								toss_winner: {type : String},
								toss_decision: {type : String},
								result: {type : String},
								dl_applied: {type : Number},
								winner: {type : String},
								win_by_runs: {type : Number},
								win_by_wickets: {type : Number},
								player_of_match: {type : String},
								venue: {type : String},
								umpire1: {type : String},
								umpire2: {type : String},
								umpire3: {type : String}
							})

let Match = mongoose.model('Match', matchSchema,'matches');
export { Match }