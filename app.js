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

// PUT YOUR MODEL.JSON, METADATA.JSON & WEIGHTS.BIN in the Model folder!
const DEFAULT_MODEL_LOCATION = `file:///${__dirname}/model/model.json`;

let model;

(async function main() {
  try {
    // Load your image
    const image = await loadImage(path.resolve(__dirname, './cup.jpg'));

    // Load the trained Teachable Machine model
    model = await tf.loadLayersModel(DEFAULT_MODEL_LOCATION);
    // model.summary();

    // Get the predictions for an image
    const results = await predict(image, model);

    // Get the top result's name
    const topResult = results[0].className;
    console.log('Prediction:', topResult);
    console.log('Predictions:', results);
  } catch (e) {
    console.error(e);
  }
})();
