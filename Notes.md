# Pushing new code to heroku prod 

https://dashboard.heroku.com/apps/dateideasapp

https://dateideasapp.herokuapp.com/static/index.html

git add .
git commit -m "new changes"
git push origin HEAD:master

# then push to github 

git push master main 

# Favicon

https://fav-gen.com/converter

# How to deploy

https://towardsdatascience.com/how-to-deploy-your-website-to-a-custom-domain-8cb23063c1ff

For custom domains with google domains, just add a www CNAME with the record that heroku gives you

If you are hosting with dynos, you must enable heroku ACM - heroku certs:auto:enable