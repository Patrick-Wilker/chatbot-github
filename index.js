const express = require("express")
const cors =  require('cors');
require('dotenv/config')
const fetch = require("node-fetch");
const { default: axios } = require("axios");

const app = express()
const PORT = process.env.PORT || 8080

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get("/api", async(req, res) => {

    let response = await axios.get('https://api.github.com/orgs/takenet/repos')

    let repos = {"status": "ok", "results": []}

    for(let i in response.data){
        if(response.data[i].language === 'C#'){
            repos.results.push({"Title": response.data[i].name, "Text": response.data[i].description, "Uri": response.data[i].owner.avatar_url})

        }
    }

    return res.json(repos).send('Ok')
 
})

app.listen(PORT)