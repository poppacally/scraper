const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');
const writeStream = fs.createWriteStream('post.csv');

//Write Headers
writeStream.write(`Title,Link \n`);

request('https://www.amazon.co.uk/gp/bestsellers/computers/430587031/ref=pd_zg_hrsr_computers', (error, responce, html) => {
    if(!error && responce.statusCode == 200){
        const $ = cheerio.load(html);

        $('#zg-item-immersion').each((i, el) => {
            const productTitle = $(el)
            .find('.p13n-sc-truncated')
            .text()
            .replace(/\s\s+/g, '');

            const link = $(el)
            .find('#a-link-normal')
            .attr('href');

            console.log(productTitle, link)

            //Write Row To CSV
            writeStream.write(`${productTitle}, ${link} \n`);
        });

        console.log("Scrape complete")
    }
});
