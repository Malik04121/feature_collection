const BrandLogoRequest = require('../request/brandLogo.request');
const BrandLogoResponse = require('../response/brandLogo.response');

class BrandLogoMapper {
  static requestToEntityMapper(requestPayload) {
    const { fileData, uuid, fileName } = requestPayload;
    return new BrandLogoRequest(fileData, uuid, fileName);
  }

  static entityToResponseMapper(presignedUrl) {
    return new BrandLogoResponse(presignedUrl);
  }
}

module.exports = BrandLogoMapper;