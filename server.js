const express = require('express')
const app = express();
const cors = require('cors')
const PORT = 4000

app.use(express.json())

const API_KEY = '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'

app.use(cors({
  origin: 'http://localhost:3000'
}));
app.post('/completions',async(req,res) => {
  try { 
    const options = {
        method : 'POST',
       headers : {
        Authorization : `Bearer ${API_KEY}`,
        'Content-Type' :'application/json'
       },
        body : JSON.stringify({
            model : 'gpt-3.5-turbo',
            messages : [{
               role :'user',
               content : req.body.message
            }]
        })
    }

    const data = await fetch('https://api.openai.com/v1/chat/completions',options)
    const response = await data.json()
    console.log("response",response)
    res.status(200).json(response)
}
  
  catch(err) {
    console.log("err")
    res.status(500).json(err)
  }
})



app.listen(PORT, () => {
    console.log(`Server is running port : ${PORT}`)
})