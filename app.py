from flask import Flask, jsonify, request, render_template
from flask_cors import CORS
import pandas as pd
import yelpapi
import os 
import random

app = Flask(__name__)
CORS(app)

@app.route("/")
def home():
    return render_template("index.html")

@app.route('/about/')
def about():
    return render_template('about.html')

@app.route('/saved/')
def saved():
    return render_template('saved.html')

@app.route("/generate", methods=["POST"])
def generate():
    data = request.get_json()

    formality = data.get("formality")
    budget = data.get("budget")
    alcohol = data.get("alcohol")
    location = data.get("location")
    geo = data.get("geo")
    preparation = data.get("preparation")

    # Define the logic here 
    def generate_activity(formality, budget, alcohol, location, geo, preparation):
        df = pd.read_csv('static/item_list.csv')

        # Budget map dict 
        budget_map = {
            'Free': 0,
            '$': 1,
            '$$': 2,
            '$$$': 3
        }
        
        # Logic to call the Yelp API 
        if (budget != 'Free') and (location != 'Home') and (geo != ''):
            print(os.getenv('YELP_API_KEY'))
            yelp_api = yelpapi.YelpAPI(os.getenv('YELP_API_KEY'))

            def get_restaurants(latitude, longitude, budget):
                response = yelp_api.search_query(term="restaurants", latitude=latitude, longitude=longitude, radius=16093, price=budget_map[budget]+1, open_now=True, limit=10) # 16093.4 meters in 10 miles
                restaurants = response["businesses"]
                return restaurants

            lat = float(geo.split(',')[0].strip())
            long = float(geo.split(',')[1].strip())

            res = get_restaurants(lat, long, '$')
            
            # select random result
            final = res[random.randint(0, len(res) - 1)]

            # function to get HTML from response
            def parse_restaurant(res):
                name = res['name']
                url = res['url']
                return '<a href="' + url + '">' + name + '</a>'

            food = parse_restaurant(final)
        else: 
            food = df[df["Category"] == "Food"].sample(1)["Item"].values[0]
        
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
        treat = df[df["Category"] == "Treat"].sample(1)["Item"].values[0]
        dress = df[df["Category"] == "Dress"].sample(1)["Item"].values[0]        
        
        return {
            "activity": activity,
            "food": food,
            "treat": treat,
            "dress": dress
        }

    # Use the form data to generate the date night suggestions
    res = generate_activity(formality, budget, alcohol, location, geo, preparation)

    return jsonify({
        "activity": res['activity'],
        "food": res['food'],
        "treat": res['treat'],
        "dress": res['dress']
    })


if __name__ == "__main__":
    app.run()
