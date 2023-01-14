About
=====

Welcome to the **Date Night Randomizer**!

This app is designed to help couples, friends, or anyone looking for fun date ideas. With this app, you can input your preferences and we will randomly generate a date night for you, including an activity, food, treat, and dress code.

The app is built using HTML, CSS, JavaScript and Python. The front-end is built using HTML and CSS, with Bootstrap to make it responsive and user-friendly. The JavaScript is used to handle the user input, make the API call to the back-end, and display the results. The back-end is built using Python, specifically using the Flask framework, which allows for easy handling of HTTP requests and responses. The back-end also uses the Pandas library to read and filter a CSV file containing the date night options.

The app allows the user to select their preferences for formality, budget, alcohol preference, location, and preparation preference. The user can also filter the options by checking or unchecking the checkboxes. After the user submits the form, the JavaScript sends a POST request to the back-end with the user preferences, the back-end filters the options and returns the result in a JSON format, the JavaScript then displays the result on the screen.

I hope that the Date Night Randomizer will help inspire new and exciting date ideas for you and your significant other. Have fun exploring new activities and trying new foods, and don't forget to dress up for the occasion!

In the future, I plan on adding more features such as user authentication, so that users can save their favorite date ideas, and a search feature, so that users can search for specific date ideas. I also plan on adding more options to the CSV file and converting it into a MySQL backend, so that there will be more options for the users to choose from.

If you have any questions or feedback, please feel free to [contact me](emailto:michellep1994@gmail.com)!

Fun Fact
--------

Did you know that over 75% of the code for this website was written in partnership with ChatGPT, the amazing language model AI? That's right, our trusty AI companion helped us power through the boring and tedious parts of coding (including writing this About page 😉), leaving me more time to focus on the fun and creative aspects. Thanks ChatGPT, you're the real MVP!

Running Locally
---------------

The app is designed to be run locally, meaning that you can run it on your own computer rather than having to access it through a website. To run the app locally, you will need to have Python and the required libraries installed on your computer. Once you have Python installed, you can use the command pip install -r requirements.txt to install the necessary libraries. After that, you can run the app using the command python app.py and the app will be available in your web browser at http://localhost:5000/.