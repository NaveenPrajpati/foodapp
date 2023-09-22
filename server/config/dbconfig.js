const mongoose=require('mongoose')
const baseurl=''

const dbconnect=()=>{
    mongoose.connect(baseurl,{
        newUrlParser:true,
        unifiedTopology:true
    })
}

module.exports=dbconnect
