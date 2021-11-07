const fs = require('fs');

const rawdata = fs.readFileSync('metadata.json');
let metadata = JSON.parse(rawdata);

const attributeMap = {
   "Background" : {},
   "Cat Fur": {},
   "Mouth": {},
   "Eyes": {},
   "Head Accessory": {},
   "Eye Accessory": {},
   "In Cup Accessory": {},
   "Cup": {},
   "Lucky Charm": {}
};

metadata.forEach(cupcat => {
   cupcat.attributes.forEach(attribute => {
      attributeMap[attribute.trait_type][attribute.value] = attributeMap[attribute.trait_type][attribute.value] || [];
      attributeMap[attribute.trait_type][attribute.value].push(cupcat.tokenId);
   });
});

const ordered = Object.keys(attributeMap).sort().reduce(
    (obj, key) => {
       obj[key] = attributeMap[key];
       return obj;
    },
    {}
);

for(const prop in ordered) {
   ordered[prop] = Object.keys(ordered[prop]).sort().reduce(
       (obj, key) => {
          obj[key] = ordered[prop][key];
          return obj;
       },
       {}
   );
}

fs.writeFileSync('metadata-map.json', JSON.stringify(ordered));
