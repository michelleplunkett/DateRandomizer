# Pushing new code to heroku prod 

https://dashboard.heroku.com/apps/dateideasapp

https://dateideasapp.herokuapp.com/static/index.html

git add .
git commit -m "new changes"
git push origin HEAD:master

^^^ This last line isn't needed because any push in vs code will update the prod heroku app too

# then push to github 

git push master main 

# Favicon

https://fav-gen.com/converter

# How to deploy (1st time only)

https://towardsdatascience.com/how-to-deploy-your-website-to-a-custom-domain-8cb23063c1ff

heroku domains:add www.dateideas.app

For custom domains with google domains, just add a www CNAME with the record that heroku gives you

If you are hosting with dynos, you must enable heroku ACM - heroku certs:auto:enable

# How to run locally

1. python3 app.py
2. go to http://127.0.0.1:5000
3. ctrl-c to close out local server

# Google ouath 

https://flask-dance.readthedocs.io/en/latest/

To get a client ID and secret for Google OAuth, you need to create a project in the Google Developers Console and configure it for OAuth. Here are the basic steps:

Go to the Google Developers Console at https://console.developers.google.com/
Create a new project by clicking on the "Select a project" dropdown in the top bar and then click on the "New Project" button.
Give your project a name and click on the "Create" button.
In the sidebar, click on the "Credentials" option.
Click on the "Create Credentials" button, and select "OAuth client ID"
Select "Web application" as the application type.
Enter a name for your OAuth client ID, and add your localhost URLs in the "Authorized JavaScript Origins" and "Authorized redirect URIs" fields.
Click on the "Create" button to generate your client ID and secret.
Your client ID and secret will be displayed in the "Credentials" section of the Google Developers Console.

# Getting and storing env vars for heroku 


