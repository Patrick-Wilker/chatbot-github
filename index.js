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

    let repos = []

    for(let i in response.data){
        if(response.data[i].language === 'C#'){
            repos.push(response.data[i])
        }
    }

    return res.json(repos).send('Ok')
 
})

app.listen(PORT)