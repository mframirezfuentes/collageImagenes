const express = require('express')
const app = express();
const expressFileUpload = require('express-fileupload')
const fs=require('fs')

app.listen(3000, () => console.log("Servidor encendido en el puerto 3000"))
app.use(express.static("public"))
app.use(expressFileUpload({
    limits: {
        fileSize: 5000000
    },
    abortOnLimit: true,
    responseOnLimit: "El peso de la imagen supera los limites permitidos"
}))
//me muestra el formulario para ingresar las imagenes
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/formulario.html")
})
app.get("/collage", (req, res) => {
    res.sendFile(__dirname + "/collage.html")
})
//me envia la información de la imagen por POST, ruta /imagen
app.post("/imagen", (req, res) => {  
    const {
        target_file
    } = req.files;
    const {
        posicion
    } = req.body
    let {
        name
    } = target_file
    name=`imagen-${posicion}.jpg`   
    target_file.mv(`${__dirname}/imgs/${name}`, (err) => {
        res.sendFile(__dirname+"/collage.html")
    })
})


//muestro la información del formulario
app.get("/deleteImg/:nombre",function(req,res){
    const{nombre}=req.params;
    fs.unlink(`${__dirname}/imgs/${nombre}`,(err)=>{
        res.send(`imagen ${nombre} fue eliminada con exito`)
    })  
})