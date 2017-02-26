var express = require('express')
var app = express();
var request = require('tinyreq');
var cheerio = require('cheerio');

var url = 'http://zavetisce-ljubljana.si/sl-SI/1433/iscemo-nov-dom-posvoji-macko';
        // http://zavetisce-ljubljana.si/sl-SI/1433/iscemo-nov-dom-posvoji-macko?ord=1&dir=0&fs=0
        // http://zavetisce-ljubljana.si/sl-SI/1433/iscemo-nov-dom-posvoji-macko?ord=1&dir=0&page=2

// first request to get number of pages
request(url, function (error, html) {
    if (error) {
        console.log('Error while requesting!')
    }
    else {
        const $ = cheerio.load(html),
              noOfPages = $('.pagenum');

        var cats = [];
        var output = '<div>';

        // request per page
        noOfPages.each(function(index) {
            console.log('>>> Page:', index + 1)
            var increasedIndex = index + 1;

            url = 'http://zavetisce-ljubljana.si/sl-SI/1433/iscemo-nov-dom-posvoji-macko?ord=1&dir=0&page=' + increasedIndex;
            console.log('>>> Url:', url);

            request(url, function (error, html) {
                if (error) {
                    console.log('Error while requesting!');
                }
                const
                    $ = cheerio.load(html),
                    noOfCats = $('.animal_renderW .AnLi_item .AnLi_itemM');

                noOfCats.each(function (i, element) {

                    // name
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

                    // isFemaleIgnored = false;

                    // if (!isFemaleIgnored && gender === 'Samec') {
                        cats[i] = {
                            name: name,
                            gender: gender,
                            image: image
                        };
                    // }

                    cats.forEach(function (element) {
                        output +=
                            '<div style="display: block; margin-bottom: 30px;">' +
                            '<div>' + element.name + '</div>' +
                            '<div>' + element.gender + '</div>' +
                            '<br />' +
                            '<img src="' + element.image + '">' +
                            '</div>';
                    });
                });

                console.log(cats);
                console.log('=================================');
                console.log('Scraped info:');
                console.log('---------------------------------');
                console.log('Cat records: ', cats.length)
            })
        }); // end for each of noOfPages

        // outputting cats
        app.get('/', function (req, res) {
            output += '</div>';
            res.send(output);
        });
    }
});

app.listen(3000, function () {
    console.log('Listening on port 3000.')
});
