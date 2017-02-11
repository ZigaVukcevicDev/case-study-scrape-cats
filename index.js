// https://www.codementor.io/johnnyb/how-to-write-a-web-scraper-in-nodejs-du108266t

var osmosis = require('osmosis');

osmosis
    .get('http://zavetisce-ljubljana.si/sl-SI/1433/iscemo-nov-dom-posvoji-macko?ord=1&dir=0&fs=0')
    .log(console.log)
    .find('.AnLi_TitleL a')
    .set('name')
    .find('.AnLi_Img')
    .set('image')
    .data(function(listing) {
        console.log(listing);
    })
    .done(function(){
        console.log('Done.');
    })


    .get('http://someUrl.com')
    .log(console.log)
    .find('.name')
    .set('name')
    .find('img')
    .set(image)
    ...



    // .set('name')
    //.log(console.log)


    //.log(console.log)
    // .data(function(cats) {
    //    console.log(cats);
    //})

/*
.find('h1 + div a')
.set('location')
.follow('@href')
.find('header + div + div li > a')
.set('category')
.follow('@href')
.paginate('.totallink + a.button.next:first')
.find('p > a')
.follow('@href')
.set({
    'title':        'section > h2',
    'description':  '#postingbody',
    'subcategory':  'div.breadbox > span[4]',
    'date':         'time@datetime',
    'latitude':     '#map@data-latitude',
    'longitude':    '#map@data-longitude',
    'images':       ['img@src']
})
.data(function(listing) {
    // do something with listing data
})
.log(console.log)
.error(console.log)
.debug(console.log)
*/




