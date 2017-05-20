import { json, urlencoded } from "body-parser";
import { signupRouter } from './routes/signup';
import { loginRouter } from './routes/login';
import { dashboardRouter } from './routes/dashboardRouter';
import { protectedRouter } from "./routes/protected";
import { Match } from './model/match.model'; 
import { Delivery } from './model/delivery.model';
import * as compression from "compression";
import * as express from "express";
import * as path from "path";
import * as mongoose  from 'mongoose';
import * as fs from 'fs';
import * as parse from 'csv-parse';

const app: express.Application = express();
mongoose.connect('mongodb://localhost/loginapp');

app.disable("x-powered-by");


app.use(json());
app.use(compression());
app.use(urlencoded({ extended: true }));
/*
app.use(function (req, res,next) {
  res.setHeader("access-control-allow-headers","Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader("access-control-allow-methods","GET, POST, PUT");
  res.setHeader("access-control-allow-origin", "*");
  res.setHeader("server"," cloudflare-nginx");
  next();
});
*/
/****************************************
***********	To read matches.csv file 
*****************************************/

/*
fs.readFile('matches.csv','utf-8',  (err, data)=> {
	//console.log(data);
  parse(data, {columns: true}, (err, rows) =>{
  	//console.log(rows);
    rows.forEach((row)=>{

    	let match = new Match(row);
    	match.save((err,match)=>{
    		if(err)
    			throw err;
    	})
    })
  })
})
*/
app.use("/action/login", loginRouter);
app.use("/action/signup",signupRouter);
app.use("/action" ,protectedRouter);
app.use("/action",dashboardRouter);
// in production mode run application from dist folder
//app.use(express.static(path.join(__dirname, "/../client")));

// catch 404 and forward to error handler
app.use((req: express.Request, res: express.Response, next) => {
  const err = new Error("Not Found");
  next(err);
});

// production error handler
// no stacktrace leaked to user
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {

  res.status(err.status || 500);
  res.json({
    error: {},
    message: err.message,
  });
});

export { app };
