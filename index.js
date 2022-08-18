const express = require('express');
const multer = require('multer');
const app = express();

//middleware destino de los archivos y nombre con extension
storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './archivos');
    },
    filename:(req,file,cb)=>{
        cb(null, Date.now()+'-'+file.originalname);
    }
    
})
upload = multer({ storage });



app.get('/', (req, res) => {
    res.sendFile('/index.html', { root: __dirname })
})

app.post('/subir', upload.single('archivo'), (req, res) => {
    console.log(req.file);
    res.send('El archivo se envio correctamente');
})

app.post('/multiple',upload.array('archivo',2),(req,res)=>{
    console.log(req.files);
    res.send('Multipleas archivos se subieron exitosamente');
})



app.listen(3000, () => {
    console.log('server on port:3000')
});