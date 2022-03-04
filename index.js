const express = require('express')
const videoCompressor = require('video-compressor')
const fileUpload = require('express-fileupload')
const app = express()
const port = 3000
const input = "src/public";
const ouput = "src/public/videos";

videoCompressor(input,ouput)

app.use(fileUpload({
  createParentPath: true
}));

app.get('/', (req, res) => {
  res.send("hello")
})

app.post('/video', (req, res) => {
  try {
    if (!req.files && req.originalUrl=="/video") {
      res.status(500);
      res.send({
          control: true,
          status: 'ERROR'
      });
    } else {
        if(req.files.video){
            if ((req.files.video.mimetype === 'video/3gpp' || req.files.video.mimetype === 'video/mp4' || req.files.video.mimetype === 'video/mpeg'
                || req.files.video.mimetype === 'video/ogg' || req.files.video.mimetype === 'video/quicktime' || req.files.video.mimetype === 'video/webm'
                || req.files.video.mimetype === 'video/x-m4v' || req.files.video.mimetype === 'video/ms-asf' || req.files.video.mimetype === 'video/x-ms-wmv'
                || req.files.video.mimetype === 'video/x-msvideo')) {
                let avatar = req.files.video;
                let videoPath = (input+'/'+req.files.video.name)
                avatar.mv(videoPath);
                res.status(200);
                res.send({
                    control: true,
                    status: 'OK'
                }); 

            }
            else {
              res.status(500);
              res.send({
                  control: true,
                  status: 'ERROR'
              }); 
            }
        }
    }
  } catch (e) {
      res.status(500);
      res.send({
          control: true,
          status: 'ERROR'
      });
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})