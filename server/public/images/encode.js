const { json } = require('express');
const fs = require('fs');


const hcmencode =  fs.readFileSync('./HCM.jpg', {encoding: 'base64'});
const dnencode =  fs.readFileSync('./Da Nang.jpg', {encoding: 'base64'});
const hnEncode = fs.readFileSync('./Ha Noi.jpg', {encoding : 'base64'});

const hcm = 'data:image/png;base64,' + hcmencode;
const dn = 'data:image/png;base64,' + dnencode;
const hn = 'data:image/png;base64,' + hnEncode;

const arrayImage = {
   HCM : hcm,
   DaNang : dn,
   HaNoi : hn
}

// console.log(hcm);
fs.writeFileSync('image.json', JSON.stringify(arrayImage));

