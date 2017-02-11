const request = require("tinyreq");
const cheerio = require('cheerio')

var url = 'http://zavetisce-ljubljana.si/sl-SI/1433/iscemo-nov-dom-posvoji-macko';

request(url, function (err, html) {
    // console.log(err || html);

    const $ = cheerio.load(html);
    const noOfCats = $('.animal_renderW .AnLi_item .AnLi_itemM');

     var cats = [];

    noOfCats.each(function(i, element) {
        // console.log(i, '===================================');

        // title
        const name = $(this)
            .children()[0]      // .AnLi_Title
            .children[1]        // .AnLi_TitleL
            .children[1]        // a
            .children[0].data;  // name

        // gender
        const gender = $(this)
            .children()[0]      // .AnLi_Title
            .children[3]        // .AnLi_TitleR
            .children[1]        // img
            .attribs['alt'];    // gender

        // image
        const image = $(this)
            .children()[1]      // .AnLi_Img
            .children[1]        // a
            .children[1]        // img
            .attribs['src'];    // src

        isFemaleIgnored = true;

        // if (gender === 'Samec') {
            cats[i] = {
                name: name + '123',
                gender: gender,
                image: image
            };

            console.log('-----------------------------------------------', i);
            console.log(cats);
        // }
    });

    console.log(cats);
    console.log('=================================');
    console.log('Scraped info:');
    console.log('---------------------------------');
    console.log('Cat records: ', cats.length)
});
