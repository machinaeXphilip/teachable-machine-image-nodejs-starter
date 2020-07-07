# Teachable Machina image predition microservice in Nodejs / Express & Tensorflow.js

micro service to predict the content of a picture
using models trained with https://teachablemachine.withgoogle.com/

planned to be used in an interactive telegram theater performance by https://www.machinaex.com

build from the starter code from https://github.com/traumverloren/teachable-machine-image-nodejs-starter 
a boilerplate/starter that does not require to edit the teachablemachine lib :rocket

explanation: without traumverloren's starter code (s.a.) one had to modify node_modules/@teachablemachine/image/dist/utils/canvas.js to exclude HTMLVideoElement (TODO: PULL REQUEST or issue!!!!)
and emulate the HTML DOM and document and canvas elements within node which her code does within the predict.js module. The proof of concept for that I found at:
https://github.com/tr7zw/teachablemachine-node-example. traumverloren's starter code i found in this issue: 
https://github.com/googlecreativelab/teachablemachine-community/issues/33#issuecomment-612620670

---------
# Basic Starter README

# Teachable Machine image prediction in Node.js & Tensorflow.js

Basic starter setup for getting an image classification model trained on [Teachable Machine](https://teachablemachine.withgoogle.com/train) to classify an image in Node.js with Tensorflow.js.

This is only a bit of starter code to help others get started that want to use their Teachable Machine trained model in a nodejs project. I found it challenging to figure out how to use my trained model in nodejs, so I hope this helps! <3

## 🏫 Train your image classification model:

- Go to [https://teachablemachine.withgoogle.com/train](https://teachablemachine.withgoogle.com/train).
- Train model and export the model files.

## ✨ Setup:

- `npm install`
- Add your Teachable Machine model files to the `model` folder. This should include `model.json`, `metadata.json`, & `weights.bin`.
- Add the image file you want to classify to the project folder.
- Run `node app.js` or `npm run predict` & the result will be logged.
