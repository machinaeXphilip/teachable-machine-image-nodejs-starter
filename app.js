/* 
micro service to predict the content of a picture
using models trained with https://teachablemachine.withgoogle.com/

will be used in the interactive telegram theater performance by https://www.machinaex.com

build from the starter code from https://github.com/traumverloren/teachable-machine-image-nodejs-starter 
a boilerplate/starter that does not require to edit the teachablemachine lib :rocket

explanation: without traumverloren's starter code (s.a.) one had to modify node_modules/@teachablemachine/image/dist/utils/canvas.js to exclude HTMLVideoElement (TODO: PULL REQUEST or issue!!!!)
and emulate the HTML DOM and document and canvas elements within node which her code does within the predict.js module. The proof of concept for that I found at:
https://github.com/tr7zw/teachablemachine-node-example. traumverloren's starter code i found in this issue: 
https://github.com/googlecreativelab/teachablemachine-community/issues/33#issuecomment-612620670

*/

const tf = require('@tensorflow/tfjs-node');
const path = require('path');
const { loadImage } = require('canvas');
const predict = require('./predict');

const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const port = process.env.PORT || 80;
const server = require("http").Server(app);

app.use(bodyParser.json());

// PUT YOUR MODEL.JSON, METADATA.JSON & WEIGHTS.BIN in the Model folder!
const DEFAULT_MODEL_LOCATION = `file:///${__dirname}/model/model.json`;
const DEFAULT_IMAGE_DIR = `../plaiframe/public/files/`;

//const imagepath = path.resolve(__dirname, './pen.png'); // example from filesystem
//const imagepath = "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Rotring_Rapidograph_0.35_mm_Technical_Pen.svg/638px-Rotring_Rapidograph_0.35_mm_Technical_Pen.svg.png";// example from weburl

let model;

async function init() {
  // Load the trained Teachable Machine model
  model = await tf.loadLayersModel(DEFAULT_MODEL_LOCATION);
  // model.summary();
}

async function predictFromPath(path) {
   // Load your image
   const image = await loadImage(path);

   // Get the predictions for an image
   const results = await predict(image, model);

   // Get the top result's name
   const topResult = results[0].className;
   console.log('Prediction:', topResult);
   console.log('Predictions:', results);
   return results
}

///// EXPRESS HTTP WEBSERVER

app.post("/predict", async (req, res) => {
  let imgpath;
  console.log("image from path trigered with ",req.body.img)
  if (!req.body.img.startsWith("http://") && !req.body.img.startsWith("https://")){
    imgpath = path.resolve(__dirname,path.join(DEFAULT_IMAGE_DIR,req.body.img));
  }
  else {
    imgpath = req.body.img;
  }

  console.log(imgpath);
  
  

  predictFromPath(imgpath)
    .then((imageClassification) => {
      res.status(200).send({
        prediction: imageClassification,
      });
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .send("Something went wrong while fetching image from path.");
    });
});


////// MAIN

(async function main() {
  try {
    await init();
    //await predictFromPath(imagepath)
    server.listen(port, (req, res) => {
      console.log(`Server is up and running @ port ${port}`);
    });
    
  } catch (e) {
    console.error(e);
  }
})();
