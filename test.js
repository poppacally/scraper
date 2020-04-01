const request = require('request');
const cheerio = require('cheerio');
const axios = require('axios');
const fs = require('fs');
const ObjectsToCsv = require('objects-to-csv')

axios.get('https://www.amazon.co.uk/Best-Sellers-Business-Industry-Science-Desktop-Thermal-Label-Printers/zgbs/industrial/10257141031/ref=zg_bs_pg_2?_encoding=UTF8&pg=2')
    .then((res) =>{
        if (res.status === 200) {
            const html = res.data;
                const $ = cheerio.load(html);
                //post the data (testing)
                //console.log(res.data);
                let products = [];
                $('.aok-inline-block').each(function(i, elem) {
                    products[i] = {
                        title: $(this).find('.p13n-sc-truncate').text().trim(),
                        url: $(this).children('.a-link-normal').attr('href')
                    } 
                    writeToCSV(products);
                });
                /*const productsListTrimmed = products.filter(n => n != undefined )
                fs.writeFile('products.json', 
                              JSON.stringify(productsListTrimmed, null, 4), 
                              (err)=> console.log('File successfully written!'))*/
        }

    }, (error) => console.log(err)  );

    async function writeToCSV(){
        const csv = new ObjectsToCsv(products);
        await csv.toDisk('scrape.csv')
        console.log('File successfully written!');
    };    