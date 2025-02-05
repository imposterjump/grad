import os
import pickle
import numpy as np
from flask import Flask, request, jsonify
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.sequence import pad_sequences
from collections import Counter 
from flask_cors import CORS

app = Flask(__name__)
CORS(app, origins=["http://localhost:3000"])


@app.route("/predict/text", methods=["POST"])
def predict():
    """
    Predict the label for the provided text sentence using pre-trained models.

    This function accepts a POST request containing a JSON payload with a "sentence" field.
    It loads pre-trained models, tokenizers, and label encoders from the server's file system,
    processes the input sentence, and returns predictions for each model, as well as the final prediction
    based on majority voting from all models.

    Parameters:
    - Request body (JSON):
      {
        "sentence": <string>  # The text sentence to classify.
      }

    Returns:
    - JSON:
      {
        "predictions": {model_name: predicted_label, ...},  # Predictions from each model.
        "final_prediction": <string>  # The final predicted label based on majority voting.
      }

    Raises:
    - 400 Bad Request: If an error occurs while processing the request or making predictions.
    
    Example:
    >>> POST /predict/text
    {
        "sentence": "This is a test sentence."
    }
    Response:
    {
        "predictions": {
            "model1": "positive",
            "model2": "negative"
        },
        "final_prediction": "positive"
    }
    """
    try:
        # Define the model directory
        MODELS_DIR = "../models/text/exported_files/"
        models_dict = {}

        # Load models, tokenizers, and label encoders
        for file in os.listdir(MODELS_DIR):
            if file.endswith(".h5"):
                model_name = file.replace(".h5", "")
                model_path = os.path.join(MODELS_DIR, file)
                tokenizer_path = os.path.join(MODELS_DIR, f"{model_name}_tokenizer.pkl")
                label_encoder_path = os.path.join(MODELS_DIR, f"{model_name}_label_encoder.pkl")

                # Load model, tokenizer, and label encoder
                model = load_model(model_path)

                with open(tokenizer_path, "rb") as tokenizer_file:
                    tokenizer = pickle.load(tokenizer_file)

                with open(label_encoder_path, "rb") as label_encoder_file:
                    label_encoder = pickle.load(label_encoder_file)

                models_dict[model_name] = {
                    "model": model,
                    "tokenizer": tokenizer,
                    "label_encoder": label_encoder,
                }

        # Get the input data
        input_data = request.get_json()
        sentence = input_data["sentence"]

        predictions = {}
        all_labels = []

        # Make predictions for each model
        for model_name, data in models_dict.items():
            tokenizer = data["tokenizer"]
            label_encoder = data["label_encoder"]
            model = data["model"]

            # Preprocess the sentence
            sequence = tokenizer.texts_to_sequences([sentence])
            padded_sequence = pad_sequences(sequence, maxlen=100)

            # Get model prediction
            prediction = model.predict(padded_sequence)
            predicted_class = np.argmax(prediction, axis=1)
            predicted_label = label_encoder.inverse_transform(predicted_class)[0]

            all_labels.append(predicted_label)
            predictions[model_name] = predicted_label

        # Final prediction by majority voting
        final_prediction = Counter(all_labels).most_common(1)[0][0]

        return jsonify({
            'predictions': predictions,
            'final_prediction': final_prediction
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 400





@app.route("/", methods=["GET"])
def home():
    return "Server is running"


if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5001)
