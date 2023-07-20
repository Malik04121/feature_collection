// book.entity.js
const AbstractBrandLogo = require('../abstraction/brandLogo.abstraction');


  class BrandLogoEntity extends AbstractBrandLogo {
    constructor(fileData, uuid, fileName) {
      super(fileData, uuid, fileName);
    }
  }
  
  module.exports = BrandLogoEntity;