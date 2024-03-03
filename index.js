const {app} = require("./app")
const {config} = require("./config/index")
const mongoose = require("mongoose");


mongoose.connect(config.MONGOURL)
.then(()=>{
    console.log("Connected to db");
}).catch(err=>{
    console.log(err);
})
const PORT = process.env.PORT || 3500

app.listen(PORT , ()=>{
    console.log(`the server is running on port ${PORT}`);
})