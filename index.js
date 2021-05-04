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

    let repos = {
        id: '',
        type: "application/vnd.lime.collection+json",
        to: "128271320123982@messenger.gw.msging.net",
        content:{
            itemType: "application/vnd.lime.document-select+json",
            items: []
        }
    }

    for(let i in response.data){
        if(response.data[i].language === 'C#'){
            repos.content.items.push(
                {   
                    header:{
                        type: "application/vnd.lime.media-link+json",
                        value:{
                            title: response.data[i].name, 
                            text: response.data[i].description, 
                            type: "image/jpeg",
                            uri: response.data[i].owner.avatar_url  
                        }
                    },
                    options: []
                }
            )

        }
    }

    // let repos = {"status": "ok", "results": []}

    // for(let i in response.data){
    //     if(response.data[i].language === 'C#'){
    //         repos.results.push({"Title": response.data[i].name, "Text": response.data[i].description, "Uri": response.data[i].owner.avatar_url})

    //     }
    // }

    return res.json(repos).send('Ok')
 
})

app.listen(PORT)