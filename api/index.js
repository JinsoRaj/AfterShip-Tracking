const cheerio = require('cheerio');
const axios = require("axios")
const express = require('express');
const app = express();

app.use(express.json());

async function getDetails(url){
    let list = [];
    const body = await axios.get(url);
    let $ = cheerio.load(body.data);
    $('.sc-5t1owe-0').find('li').each(function () {
        var date = $(this).find('div > div > p:first-child').text();
        var time = $(this).find('div > div > p:nth-child(2)').text();
        var status = $(this).find('div:last-child > p > span:first-child').text();
        var place = $(this).find('div:nth-child(3) > p:nth-child(2)').text();
        var items = { time, date, status, place };
        list.push(items);
    });
    return list;  
}


app.get('/:provider/:id', async(req, res) => {
    
    try{
        var turl = `https://m.aftership.com/${req.params.provider}/${req.params.id}`;
        var result = await getDetails(turl);   
        res.send(result);
    }
    catch(err){
        console.log(err)
        res.send(err)
    }
    
});


app.get('/', (req, res) => {
    res.send({url:"INVALID", check_github:"https://github.com/JinsoRaj/Courier-Tracking"});
});


    
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));

module.exports = app;