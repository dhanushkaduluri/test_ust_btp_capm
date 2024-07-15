module.exports = async (srv) => {
 
    //implementation code
    srv.on('greetings', (req,res)=>{
        return "good morning ! " + req.data.name ;
    })

    srv.on('multiply', (req,res)=>{
        let c = req.data.a * req.data.b;
        return c ;
    })
 
}