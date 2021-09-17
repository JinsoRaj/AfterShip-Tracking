const cheerio = require('cheerio');
const request = require('request');
const express = require('express');
const app = express();
const list=[];
app.use(express.json());

async function getDetails(provider, id){
    const url = `https://m.aftership.com/${provider}/${id}`;
    request({
        method: 'GET',
        url: url
    }, (err, res, body) => {

        if (err){
            return console.error(err);
        }

        let $ = cheerio.load(body);
        list.length =0;

        $('.sc-5t1owe-0').find('li').each(function() {
            var date = $(this).find('div > div > p:first-child').text();
            var time = $(this).find('div > div > p:nth-child(2)').text();
            var status = $(this).find('div:last-child > p > span:first-child').text();
            var place = $(this).find('div:nth-child(3) > p:nth-child(2)').text();
            var items = {time, date, status, place}
            list.push(items);
        });
    return list;
    });
}


app.get('/:provider/:id', async(req, res) => {
    
    try{
        await getDetails(req.params.provider, req.params.id)
        res.send(list);
    }
    catch(err){
        console.log(err)
        res.send(err)
    }
    
});


app.get('/', (req, res) => {
    res.send({url:"INVALID", check_github:"https://github.com/JinsoRaj/AfterShip-Tracking"});
});


    
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));

module.exports = app;