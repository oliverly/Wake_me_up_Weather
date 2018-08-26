const chromecasts = require('chromecasts')
const GoogleHomePlayer = require('google-home-player');
const getTheWeather = require('get-the-weather')
const express = require('express')

const config = require("./config.json")

const app = express()
app.use(express.static('audio_files'))
app.get('/', (req, res) => res.send('Hello World!'))
app.listen(3000, () => console.log('Example app listening on port 3000!'))


var chromecast_searcher = chromecasts()

chromecast_searcher.on('update', function (player) {
	console.log("my player", player)
	
	if (player.name === "Family Room Speaker"){
		var googleHome = new GoogleHomePlayer(player.host, 'en', 1)

		getTheWeather({
			zip: "92107",
			DarkSkyKey: "32d60f17af514de2e43f6ca33362d163",
			ZipCodeApiKey: "hVQPgds2BbR8m7nE8OhAuyQehm0CZ4NsyLqFzzPQknSU1NwtyxNXEDcrLfzBhO5i"
		}).then(function(results) {
			// console.log("weather results", JSON.stringify(results, null, 4))

			googleHome.say(results.daily.summary)
			.then(function(){
				if (results.daily.icon === "clear-day")
					googleHome.play('http://192.168.1.70:3000/here_comes_the_sun.mp3')
				else
					googleHome.play('http://192.168.1.70:3000/good_day_sunshine.mp3')
			})
		})
	}
})

// getTheWeather({
// 	zip: "92107",
// 	DarkSkyKey: "32d60f17af514de2e43f6ca33362d163",
// 	ZipCodeApiKey: "hVQPgds2BbR8m7nE8OhAuyQehm0CZ4NsyLqFzzPQknSU1NwtyxNXEDcrLfzBhO5i"
// }).then(function(results) {
// 	console.log("weather results", JSON.stringify(results, null, 4))
// })