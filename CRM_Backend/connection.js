const mongoose = require('mongoose')

const connectionString = process.env.DATABASE

mongoose.connect(connectionString).then(()=>{
    // console.log(connectionString);
    console.log('Mongodb running successfully');
    
}).catch((error)=>{
    console.log(`not connected due to ${error}`);
    
})

    
