const swaggerJsDoc=require('swagger-jsdoc');
const swaggerUi=require('swagger-ui-express');

const options={
    definition:{
        openai:"3.0.0",
        info:{
            title:"Blog API",
            version:"1.0.0",
            descripyion:"REST API for Blog Application"
        },
        server:[{
            url:'http://localhost:3000'
        }]
    },
    apis:['./src/routes/*.js'] // ->* means take all names
}

const swaggerSpec=swaggerJsDoc(options);

module.exports={
    swaggerUi,swaggerSpec
}