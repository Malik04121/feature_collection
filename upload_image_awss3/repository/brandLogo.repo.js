
// const BookModel = require('../frameworks/mongoDB/models/book.model');
const { brandImageModel } = require('../model/brand_image');



class BrandLogoRepository {
//   static findAllBooks() {
//     return BookModel.find().exec();
//   }

//   static findBookById(id) {
//     return BookModel.findById(id).exec();
//   }

//   static deleteBook(id) {
//     return BookModel.findByIdAndDelete(id).exec();
//   }
 

  static async addBrandLogo(brandLogoEntity) {
        const { fileData, uuid, fileName } = brandLogoEntity
        try {
          // Save the Brand Logo data to the database
          const brandLogo = new brandImageModel({
            photo: {
              id: uuid,
              secure_url: fileData,
            },
          });
    
          return await brandLogo.save();
        } catch (error) {
          console.error('Error adding Brand Logo to the database:', error);
          throw error;
        }

  }
  static async deleteBrandLogo(id){

    try{
        await brandImageModel.deleteOne({ 'photo.id': id });
    }
    catch(err){
        throw err
    }
  }
}

module.exports = BrandLogoRepository;