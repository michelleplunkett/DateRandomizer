from flask import Flask, jsonify, request
import random

app = Flask(__name__)

@app.route("/get_date_night", methods=["POST"])
def get_date_night():
    formality = request.json["formality"]
    budget = request.json["budget"]
    alcohol = request.json["alcohol"]
    location = request.json["location"]
    preparation = request.json["preparation"]

    # You can write your logic to select the random activity, food, treat and dress based on the preferences
    activity = random.choice(activity_options[activity_pref])
    food = random.choice(food_options[food_pref])
    treat = random.choice(treat_options[treat_pref])
    dress = random.choice(dress_options[dress_pref])
   
    return jsonify(activity=activity, food=food, treat=treat, dress=dress)

if __name__ == "__main__":
    activity_options = {'Outdoor': ['Hiking','Bike riding','Picnic'],'Indoor':['Movie','Board Games','Puzzles']}
    food_options = {'Italian': ['Pizza','Spaghetti','Lasagna'],'Chinese':['Fried Rice','Noodles','Wonton']}
    treat_options = {'Dessert': ['Ice Cream','Cake','Cookies'],'Drink':['Coffee','Tea','Soda']}
    dress_options = {'Casual': ['Jeans','T-Shirt','Sneakers'],'Fancy':['Suit','Dress','Heels']}
    app.run(debug=True)
