import express from "express";
import axios from "axios";

const app = express();
const port = 3000;

const yourUsername = "Prem";
const yourPassword = "PremMallela";
const yourAPIKey = "83fe784a-f866-4792-a082-243b04eadc0a";
const yourBearerToken = "778b362d-1841-404b-a9e0-45301f73949c";

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "API Response." });
});

app.get("/noAuth", async (req, res) => {
  const response = await axios.get("https://secrets-api.appbrewery.com/random")
  const data = await response.data;
  const stringData = JSON.stringify(data)
  res.render("index.ejs",{
      content :stringData
  })
});

app.get("/basicAuth", async (req, res) => {
         const response = await axios.get("https://secrets-api.appbrewery.com/all?page=2", {
                   auth: {
                          username: yourUsername,
                          password: yourPassword
                     },
                 });
  const data = await response.data;
  const stringData = JSON.stringify(data);
  res.render("index.ejs",{
      content :stringData
  })       
});

app.get("/apiKey", async (req, res) => {
     const response = await axios.get(`https://secrets-api.appbrewery.com/filter?score=5&apiKey=${yourAPIKey}`)
     const data = await response.data
     const stringData = JSON.stringify(data);
     res.render("index.ejs",{
      content :stringData
  })
});

app.get("/bearerToken", async(req, res) => {
    const response = await axios.get("https://secrets-api.appbrewery.com/secrets/42",{
       headers :{
        Authorization : "Bearer " + yourBearerToken
       }
    })
     const data = response.data
     const stringData = JSON.stringify(data);
     res.render("index.ejs",{
      content :stringData
  })
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

