// const AbstractBook = require('../abstraction/abstract-book.entity');

// class BrandLogoRequest extends AbstractBook {
//   constructor(title, author, sellingPrice) {
//     super(title, author, sellingPrice);
//   }
// }

// module.exports = BrandLogoRequest;
class BrandLogoRequest {
    constructor(fileData, uuid, fileName) {
      this.fileData = fileData;
      this.uuid = uuid;
      this.fileName = fileName;
    }
  }
  
  module.exports = BrandLogoRequest;
  