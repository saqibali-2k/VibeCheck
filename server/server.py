# Imports the Google Cloud client library
from google.cloud import language_v1, speech
from flask import Flask
from flask import request
from flask import jsonify
from flask_cors import CORS, cross_origin

import cv2

import base64
import numpy as np
from PIL import Image
import tensorflow as tf
import io
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from tensorflow.keras.preprocessing.image import img_to_array

# Instantiates a client
client = language_v1.LanguageServiceClient()

app = Flask(__name__)

def load_model():
    global model
    model = tf.keras.models.load_model("vgg16.h5")
    print("--------------------MODEL LOADED.----------------------", flush=True)

load_model()
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'


@app.route('/textanalysis', methods=['GET'])
@cross_origin()
def analyse_text():
    # The text to analyze
    text = request.args.get('text')
    document = language_v1.Document(content=text, type=language_v1.Document.Type.PLAIN_TEXT)

    # Detects the sentiment of the text
    sentiment = client.analyze_sentiment(request={'document': document}).document_sentiment
    response = {
        "score": sentiment.score,
        "magnitude": sentiment.magnitude
    }
    return jsonify(response)


@app.route('/textanalysis', methods=['GET'])
@cross_origin()
def analyse_text():
    # The text to analyze
    text = request.args.get('text')
    document = language_v1.Document(content=text, type=language_v1.Document.Type.PLAIN_TEXT)

    # Detects the sentiment of the text
    sentiment = client.analyze_sentiment(request={'document': document}).document_sentiment
    response = {
        "score": sentiment.score,
        "magnitude": sentiment.magnitude
    }
    return jsonify(response)

@app.route('/imageanalysis', methods=['GET'])
@cross_origin()
def analyse_image():
    # Image to analyse
    base64encoding = request.args.get('img')
    base64_bytes = base64.b64decode(base64encoding)
    resized_image = preprocess_image(base64_bytes)

    if resized_image == -1:
        response = {
            "NoFace": True
        }
        return jsonify(response)

    prediction = model.predict(resized_image)

    # Softmax to probabilities
    probabilities = np.exp(prediction) / np.sum(np.exp(prediction))
    output = probabilities.tolist()

    response = {
        "prediction": {
            'angry': output[0][0],
            'disgust': output[0][1],
            'fear': output[0][2],
            'happy': output[0][3],
            'neutral': output[0][4],
            'sad': output[0][5],
            'surprise': output[0][6],
        }
    }
    return jsonify(response)


def preprocess_image(base64_bytes, target_size=(48, 48)):
    image = cv2.imread(io.BytesIO(base64_bytes))
    image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    # image = image.convert("L")
    # image = image.resize(target_size)
    # image = img_to_array(image)

    faceCascade = cv2.CascadeClassifier(cv2.data.haarcascades + "haarcascade_frontalface_default.xml")
    faces = faceCascade.detectMultiScale(
        image,
        scaleFactor=1.3,
        minNeighbors=3,
        minSize=(30, 30)
    )

    if len(faces) == 0:
        return -1

    for (x, y, w, h) in faces:
        cv2.rectangle(image, (x, y), (x + w, y + h), (0, 255, 0), 2)
        face = image[y:y + h, x:x + w]
        break  # Only detect first face

    cv2.resize(face, target_size)
    if face.shape[2] == 1:
        face = np.repeat(face[:, :, np.newaxis], 3, axis=2)

    face = np.expand_dims(face, axis=0)
    return face