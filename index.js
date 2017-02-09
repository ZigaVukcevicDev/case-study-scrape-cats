var osmosis = require('osmosis');

osmosis
    .get('http://zavetisce-ljubljana.si/sl-SI/1433/iscemo-nov-dom-posvoji-macko?ord=1&dir=0&fs=0')
    .log(console.log)
    .find('h1')
    .log(console.log)
    .set('title')
    .log(console.log)
    .find('.AnLi_TitleL a')
    .set('link')
    .log(console.log)
    .find('.AnLi_TitleL a img[href]')
    .set('test')
    .log(console.log)
    .data(function(listing) {
        console.log(listing);
    })


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
