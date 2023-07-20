// const AbstractBook = require('../abstraction/abstract-book.entity');



class BrandLogoResponse {
    constructor(presignedUrl) {
      this.presignedUrl = presignedUrl;
    }
  }
  
  module.exports = BrandLogoResponse;






  
// class BrandLogoResponse extends AbstractBook {
//   constructor(title, author, sellingPrice, id) {
//     super(title, author, sellingPrice);
//     this.id = id;
//   }
// }

// module.exports = BrandLogoResponse;