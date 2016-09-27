# Autopub
## Start
### Download seed.sh
    curl -o seed.sh https://raw.githubusercontent.com/rio84/autopub/master/bin/seed.sh
##### then exec. you need to specify install path
    sh seed.sh /home/localhost
##### autopub app listen at port: 11100
    11100
##### you could remove after use
    rm seed.sh
## Repository setting
### set webhook
* https://github.com/:owner/:repo/settings/hooks
	
* payload Url is `http://YOUR_SERVER_HOST:11100/githook`


## oAuth on github
    http://YOUR_SERVER_HOST:11100/oauth.html

* ** api document: ** https://developer.github.com/v3/oauth/

* see your github: https://github.com/settings/developers

## Push to publish
### `package.json` specify start script: eg.
	{
	 ...
	 "scripts": {
        "start": "node app.js" 
      },
      ...
	}
### `autopub.json` in your repository content eg.

	{
  		"name":"ReposName",
  		"port":8000,
  		"deployDir":"/home/admin",
  		"logsDir":"/root/logs"
	}


### git tag name must be `rls/x.y.z`
	git tag rls/1.0.0
	git push origin rls/1.0.0


### ENJOY :)