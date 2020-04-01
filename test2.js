const request = require('request');
const cheerio = require('cheerio');
const axios = require('axios');
const fs = require('fs');
const readline = require('readline-sync');

let link = readline.question("Insert First Link: ");

//c-productlist
let div = readline.question("Insert Div Element: ");
div = "." + div

//c-productlist__header
let title = readline.question("Insert Title Element: " );
title = "." + title

//c-productlist__title
let Url = readline.question("Insert URL Element: " );
Url = "." + Url

axios.get(link)
    .then((res) =>{
        if (res.status === 200) {
            const html = res.data;
                const $ = cheerio.load(html);
                //post the data (testing)
                //console.log(res.data);
                let products = [];
                $(div).each(function(i, elem) {
                    products[i] = {
                        title: $(this).find(title).text().trim(),
                        url: $(this).children(Url).attr('href')
                    }      
                });
                const productsListTrimmed = products.filter(n => n != undefined )
                fs.writeFile('testing.json', 
                              JSON.stringify(productsListTrimmed, null, 4), 
                              (err)=> console.log('File successfully written!'))
        }

    }, (error) => console.log(err)  );