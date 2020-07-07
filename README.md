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

## Installation

1. download this repository
```sh
git clone https://github.com/machinaeXphilip/teachable-machine-image-nodejs-starter image-classifier;
cd image-classifier
```

### Docker
if running from docker:

2. install [docker](https://www.docker.com/) if not already installed

3. build docker image
```sh
docker build -t $USER/image-classifier .
```

4. run docker image (here on port 8888 but you could also replace it with whatever port you like)
```sh
docker run -it -p 8888:80 $USER/image-classifier .
```

### native

2. install [nodejs](https://nodejs.org/) if not already installed

3. install dependencies:
```sh
npm install
``` 

1. if there are issues on npm install, it is likely to be caused by node-canvas. It's [git repository](https://github.com/Automattic/node-canvas#installation) contains information on how to build it from source

2. run it on the port of your liking
```sh
node app.js # prepend 'PORT=<whateveryouwant>' if you don't want it to run on port 80 
```

## Setup

the trained model files (should be three) belongs into `/model`

images can be predicted from a url or (faster) from image files. If you use image files, place them into `/images` which will be interpreted as the default image root directory when you specify "img" within the HTTP POST body (see Usage) without http or https.

## Usage

1. train your model on https://teachablemachine.withgoogle.com, download it and place it inside of `/model`
2. start the service on your machine
```sh
node app.js 
```
3. send a HTTP POST request to endpoint `/PREDICT`, including a JSON with the url or local relative path to the image to be predicted:
```sh
curl --request POST 'http://localhost/predict' \
    -H 'Content-Type: application/json' \
    -d '{
    "img":"https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Rotring_Rapidograph_0.35_mm_Technical_Pen.svg/638px-Rotring_Rapidograph_0.35_mm_Technical_Pen.svg.png"
    }'
```

you should get a response like this:

```JSON
{
    "prediction": [
        {
            "className": "pen",
            "probability": 0.9879598617553711
        },
        {
            "className": "hand",
            "probability": 0.00863911584019661
        },
        {
            "className": "headphones",
            "probability": 0.0024565309286117554
        }
    ]
}

```
---------
original projects README:
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
