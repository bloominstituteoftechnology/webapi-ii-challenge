const introduce=(req,res)=>{
    const person=req.params.person;
    res.json({hello:person})
};
module.exports=introduce;