const { PrismaClient }=require("../../generated/prisma");

const prisma=new PrismaClient();

module.exports=prisma;
 
/* No manual connection like mongoose required */