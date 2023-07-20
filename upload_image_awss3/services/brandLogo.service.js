// const BookRepo = require('../repositories/book.repo');
// const BookMapper = require('../mappers/book.mapper');
// const { BookResponse } = require('../response/book.response');
// const BrandLogoMapper = require('../mappers/brandLogo.mapper');
const BrandLogoMapper = require('../mappers/brandLogo.mapper');
const BrandLogoRepository = require('../repository/brandLogo.repo');
const s3Services = require('./s3.services');

class BrandLogoService {
  static async addBrandLogo(requestPayload) {
    const brandLogoRequest = BrandLogoMapper.requestToEntityMapper(requestPayload);
   
    await BrandLogoRepository.addBrandLogo(brandLogoRequest);

    const presignedUrl = await s3Services.postData(
      brandLogoRequest.fileData,
      brandLogoRequest.uuid,
      brandLogoRequest.fileName
    );
    const brandLogoResponse = BrandLogoMapper.entityToResponseMapper(presignedUrl);
    return brandLogoResponse;
  }

  static async deleteBrandLogo(id) {
    await s3Services.deleteData(id);
    return 'success';
  }

  static async updateBrandLogo(fileData,uuid,fileName) {
    const presignedUrl = await s3Services.postData(
      fileData,
      uuid,
      fileName
    );
    return presignedUrl;
  }

}

module.exports = BrandLogoService;