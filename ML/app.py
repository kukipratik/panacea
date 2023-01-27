import os
import numpy as np
import json
from flask import Flask, jsonify, request
from keras.models import load_model
from PIL import Image
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
app.config['UPLOAD_FOLDER'] = "./ML"

@app.route('/predict', methods=['POST'])
def apicall():
    image = request.files.getlist('files[]')[0]
    im = Image.open(image)
    im = im.resize((150,150))
    modelName = request.form.get("model")
    classifiers = request.form.get("classifier").split(',')
    print(classifiers,"classifiers")
    test = np.array(im)
    test = np.expand_dims(test, axis=0)
    
    model = load_model(f'./ML/{modelName}')
    try:
        prediction = model.predict(test)
    except ValueError :
        im = Image.open(image)
        test = np.array(im)
        test = np.expand_dims(test, axis=0)
        prediction = model.predict(test)
    predictions = prediction.tolist()[0]
    prediction = np.argmax(predictions)
    percentage = predictions[prediction]
    responses = jsonify(prediction=json.dumps(classifiers[prediction]), percentage=json.dumps(percentage))
    responses.status_code = 200

    return (responses)
    
@app.route('/addModel',methods=["POST"])
def model_upload():
    if 'model' not in request.files :
        responses = jsonify(message="please send a file in the request")
        responses.status_code = 400
        return(responses)
    model = request.files['model']
    if model.filename == '':
        responses = jsonify(message="please send a file in the request")
        responses.status_code = 400
        return(responses)
    if model and model.filename.rsplit('.',1)[1] == "h5":
        model.save(os.path.join(app.config["UPLOAD_FOLDER"],model.filename))
        responses = jsonify(message="Successfully added model",status=True)
        responses.status_code = 200
        return (responses)


app.run()