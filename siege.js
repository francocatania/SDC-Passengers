const siege = require('siege');

siege()
  .on(3000)
  .concurrent(20)
  .for(120).seconds
  .get(`/driver?userId=123&origX=123&origY=232&destinX=232&destinY=1231`)
  .attack();