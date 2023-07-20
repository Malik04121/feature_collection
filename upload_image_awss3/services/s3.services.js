const dotenv = require("dotenv");
dotenv.config();
const {AWS_ACCESS_KEY_ID,AWS_SECRET_ACCESS_KEY,bucketName}=process.env
const {S3Client,GetObjectCommand,PutObjectCommand, DeleteObjectCommand} =require("@aws-sdk/client-s3")
const {getSignedUrl} =require("@aws-sdk/s3-request-presigner")


  class s3Services{
    static client=new S3Client({
        region: "ap-south-1",
        credentials:{
          accessKeyId: AWS_ACCESS_KEY_ID,
          secretAccessKey: AWS_SECRET_ACCESS_KEY
        }
      })
      static async uploadFileToS3(bucketName,filename,fileData){
        try {
            const command = new PutObjectCommand({
              Bucket: bucketName,
              Key: filename,
              ContentType: "image/jpg",
              Body: fileData,
            });
      
            await this.client.send(command);
          } catch (error) {
            console.log(error, "Error while uploading file");
            throw error;
          }
      }
      static async createPresignedUrl(bucketName,key,expiresIn){
        try {
            const command = new GetObjectCommand({ Bucket: bucketName, Key: key });
            return getSignedUrl(this.client, command, { expiresIn: expiresIn });
        } catch (error) {
            console.error("failed signing URL ->" + error)
        }
      }
  
  static async postData(fileData, uuid, file_name) {
    const expirationInSeconds = 3600;
    const objectKey = uuid+".jpg";
    // The file data is received as a base64 encoded string
    const binaryFileData = Buffer.from(fileData, 'base64');
    const uniqueFileName = uuid + ".jpg";

    try {
      await this.uploadFileToS3(bucketName, uniqueFileName, binaryFileData);
      const presignedUrl = await this.createPresignedUrl(bucketName, objectKey, expirationInSeconds);
      return presignedUrl;
    } catch (error) {
      throw error;
    }
    }
    static async deleteData(id){
        try{
        const bucketName = 'gms-imageupload';
      const objectKey = id+".jpg"; // Assuming the object key is constructed like this

      const deleteCommand = new DeleteObjectCommand({ Bucket: bucketName, Key: objectKey });
         await this.client.send(deleteCommand);
        }
        catch(err){
            throw err
        }
    }

  }
  module.exports=s3Services