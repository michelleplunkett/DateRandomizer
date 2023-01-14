from flask import Flask, jsonify, request, render_template
from flask_cors import CORS
import pandas as pd

app = Flask(__name__)
CORS(app)

@app.route("/")
def home():
    return render_template("index.html")

@app.route('/about/')
def about():
    return render_template('about.html')

@app.route("/generate", methods=["POST"])
def generate():
    data = request.get_json()

    formality = data.get("formality")
    budget = data.get("budget")
    alcohol = data.get("alcohol")
    location = data.get("location")
    preparation = data.get("preparation")

    # Define the logic here 
    def generate_activity(formality, budget, alcohol, location, preparation):
        df = pd.read_csv('static/item_list.csv')

        budget_map = {
            'Free': 0,
            '$': 1,
            '$$': 2,
            '$$$': 3
        }
        
        # For activity, food, treat, dress (unique category) 
        # filter the df and return a random value 
        ff = (df['Formality'] == formality)
        bf = (df['Budget_Value'] <= budget_map[budget])
        lf = (df['Location'] == location)

        df = df.loc[ff & bf & lf]

        if alcohol == False:
            af = (df['Alcohol'] == alcohol)
            df = df.loc[af]
        
        if preparation == False:    
            pf = (df['Preparation_Required'] == preparation)
            df = df.loc[pf]

        # Randomly select a row
        activity = df[df["Category"] == "Activity"].sample(1)["Item"].values[0]
        food = df[df["Category"] == "Food"].sample(1)["Item"].values[0]
        treat = df[df["Category"] == "Treat"].sample(1)["Item"].values[0]
        dress = df[df["Category"] == "Dress"].sample(1)["Item"].values[0]        
        
        return {
            "activity": activity,
            "food": food,
            "treat": treat,
            "dress": dress
        }

    # Use the form data to generate the date night suggestions
    res = generate_activity(formality, budget, alcohol, location, preparation)

    return jsonify({
        "activity": res['activity'],
        "food": res['food'],
        "treat": res['treat'],
        "dress": res['dress']
    })


if __name__ == "__main__":
    app.run()
