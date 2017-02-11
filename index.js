var express = require('express')
var app = express();
const request = require("tinyreq");
const cheerio = require('cheerio');

var url = 'http://zavetisce-ljubljana.si/sl-SI/1433/iscemo-nov-dom-posvoji-macko';
        // http://zavetisce-ljubljana.si/sl-SI/1433/iscemo-nov-dom-posvoji-macko?ord=1&dir=0&fs=0

// TODO: figure out how not to use pagination

request(url, function (error, html) {
    if (error) {
        console.log('Error while requesting!')
    }
    else {
        const
            $ = cheerio.load(html),
            noOfCats = $('.animal_renderW .AnLi_item .AnLi_itemM');

        var cats = [];

        noOfCats.each(function(i, element) {

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

            isFemaleIgnored = false;

            if (!isFemaleIgnored && gender === 'Samec') {
                cats[i] = {
                    name: name,
                    gender: gender,
                    image: image
                };

                console.log('-----------------------------------------------', i);
                console.log(cats);
            }

            // outputting cats
            app.get('/', function (req, res) {
                var output = '<div>';

                cats.forEach(function(element) {
                    output +=
                        '<div style="display: block; margin-bottom: 30px;">' +
                            '<div>' + element.name + '</div>' +
                            '<div>' + element.gender + '</div>' +
                            '<br />' +
                            '<img src="' + element.image  + '">' +
                        '</div>';
                });

                output += '</div>';

                res.send(output);
            })
        });

        console.log(cats);
        console.log('=================================');
        console.log('Scraped info:');
        console.log('---------------------------------');
        console.log('Cat records: ', cats.length)
    }
});

app.listen(3000, function () {
    console.log('Listening on port 3000.')
});
