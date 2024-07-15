module.exports = cds.service.impl( async function(){
 
    //Step 1: get the object of our odata entities
    const { EmployeeSet, POs } = this.entities;

    this.before('UPDATE', EmployeeSet, async(req) => {
        
        var salary = parseInt(req.data.salaryAmount);
        if(salary >= 1000000){
            req.error(500,"Ola! sorry no one can get this salary in my org");
        }
    });


    this.after('READ', EmployeeSet, (req)=>{
        req.push ({"ID" : 'NULL'});
    });
 
    this.on('boost', async (req,res) => {
        try {
            //since its instance bound we will get the key of PO
            const ID = req.params[0];
            //Print on console the key
            console.log("Hey Amigo, Your purchase order with id " + req.params[0] + " will be boosted");
            //Start a db transaction suing cds ql - https://cap.cloud.sap/docs/node.js/cds-tx
            const tx = cds.tx(req);
            //UPDATE dbtab set grossamount = current + 20k WHERE ID = key
            await tx.update(POs).with({
                GROSS_AMOUNT: { '+=' : 20000 }
            }).where(ID);
        } catch (error) {
            return "Error " + error.toString();
        }
    });

    this.on('getOrderDefaults', async (req,res) => {
        return {
            "OVERALL_STATUS": "N"
        };
    });

    this.on('largestOrder', async (req,res) => {
        try {
            const tx = cds.tx(req);
           
            //SELECT * UPTO 1 ROW FROM dbtab ORDER BY GROSS_AMOUNT desc
            // const reply = await tx.read(POs).orderBy({
            //     GROSS_AMOUNT: 'desc'
            // }).limit(2);

            const q = await SELECT.from(POs).orderBy(`GROSS_AMOUNT desc`).limit(2);
 
            return q;
        } catch (error) {
            return "Error " + error.toString();
        }
    });
}
);
 