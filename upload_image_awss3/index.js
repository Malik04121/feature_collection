

const cors=require('cors')
const express=require('express')
const app = express();
const { connection } = require('./config');
const BrandLogoService = require("./services/brandLogo.service");
const BrandLogoRequest = require("./request/brandLogo.request");

app.use(cors());
app.use(express.json());
app.get("/",(req,res)=>{
    res.send("Welcome")
})

app.post('/get-signed-url',async(req,res)=>{
  const {fileData , uuid,  fileName } = req.body;
  try {
    const requestPayload = new BrandLogoRequest(fileData, uuid, fileName);
    const presignedUrl = await BrandLogoService.addBrandLogo(requestPayload);
    res.status(200).json({ message: 'File is uploaded.', presignedUrl });
      } 
  catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal server error' });
}
})
app.delete("/get-signed-url/:id",async(req,res)=>{
  const id = req.params.id;
  try{
    await BrandLogoService.deleteBrandLogo(id)
    res.status(200).json({message:"Successfully deleted"})   
  }
  catch(err){
    console.log(err)
  }
})
app.patch('/get-signed-url/:id',async(req,res)=>{
  const {fileData , uuid,  file_name } = req.body;
  try{
    const presignedUrl = await BrandLogoService.updateBrandLogo(fileData, uuid, file_name);
    res.status(200).json({ message: 'File is uploaded.', presignedUrl });
  }
  catch(err){
     console.log(err)
  }
})
app.listen(4000,async(req,res)=>{
  try{
    await connection
    console.log("connected to db")
 }
 catch(err){
     console.log(err)
 }
  console.log("server is running on 4000")
})










// const dotenv = require("dotenv");
// dotenv.config();
// const {AWS_ACCESS_KEY_ID,AWS_SECRET_ACCESS_KEY,bucketName}=process.env
// const {S3Client,GetObjectCommand,PutObjectCommand, DeleteObjectCommand} =require("@aws-sdk/client-s3")
// const {getSignedUrl} =require("@aws-sdk/s3-request-presigner")

// const { brandImageModel } = require('./model/brand_image');


// const client=new S3Client({
//     region: "ap-south-1",
//     credentials:{
//       accessKeyId: AWS_ACCESS_KEY_ID,
//       secretAccessKey: AWS_SECRET_ACCESS_KEY
//     }
//   })

  // async function uploadFiletoS3(bucketName,filename,fileData){
  //   try{
  //     const command=new PutObjectCommand({
  //         Bucket:bucketName,
  //         Key:filename,
  //         ContentType:"image/jpg",
  //         Body:fileData
  //       })
  //     await client.send(command)
  //   }
  //   catch(err){
  //     console.log(err,"error while uplolading file")
  //   }
  // }

  // async function postData(fileData,uuid,file_name){
  //   const expirationInSeconds=3600
  //   const downloadPath = 'uploads/download.jpg';
  //   const objectKey=uuid+".jpg"
  //  // The file data is received as a base64 encoded string
  //  const binaryFileData = Buffer.from(fileData, 'base64');
  //  const uniqueFileName = uuid + ".jpg"
  //  await uploadFiletoS3(bucketName,uniqueFileName,binaryFileData)
  //  const presignedUrl = await createPresignedUrl(bucketName, objectKey, expirationInSeconds);
  //      console.log('Presigned URL:', presignedUrl);
  //      return presignedUrl

  // }


//   async function createPresignedUrl(bucket_name, key, expiresIn = 3600) {
//     try {
//         const command = new GetObjectCommand({ Bucket: bucket_name, Key: key });
//         return getSignedUrl(client, command, { expiresIn: expiresIn });
//     } catch (error) {
//         console.error("failed signing URL ->" + error)
//     }
// };
// async function getFileObject(bucket_name, file_key, out_path) {
//   try {
//       const getObjectRequest = {
//           Bucket: bucket_name,
//           Key: file_key
//       }
//       const fileStream = fs.createWriteStream(out_path)
//       const command = new GetObjectCommand(getObjectRequest);
//       // const command = new delete(getObjectRequest);
//       const response = await client.send(command);
//       const content = await response.Body.pipe(fileStream)
//       console.log(content,"content of file",out_path)
//       return content

//   } catch (error) {
//       console.log(error)
//       console.log("failed to retrive file")
//   }
// }

  // app.post('/get-signed-url', async (req, res) => {
  //    try{
  //     const {fileData , uuid,  file_name }= req.body;
  //      const presignedUrl=await postData(fileData,uuid,file_name);
      
  //      const brand_logo=new brandImageModel({
  //       photo: {
  //         id: uuid,
  //         secure_url: presignedUrl,
  //       },
  //      })
  //      await brand_logo.save()
  //     //  await getFileObject(bucketName, objectKey, downloadPath);
  //     return res.status(200).json({ message: 'File is uploaded.' });
  //    }
  //    catch(err){
  //     console.log(err)
  //     return res.status(500).json({"error": "internal server error" })
  //    }
  // })

  // app.delete('/get-signed-url/:id',async(req,res)=>{
  //   const id = req.params.id;
  //   try{
  //     const brandLogo = await brandImageModel.findOne({ 'photo.id': id });
  //     if (!brandLogo) {
  //       return res.status().json({message: 'Brand logo image not found'});
  //     }
  //     // Delete the document from MongoDB
  //     await brandImageModel.deleteOne({ 'photo.id': id });
  //     const bucketName = 'gms-imageupload';
  //     const objectKey = id+".jpg"; // Assuming the object key is constructed like this

  //     const deleteCommand = new DeleteObjectCommand({ Bucket: bucketName, Key: objectKey });
  //     await client.send(deleteCommand);
  //     return res.status(200).json({ message: 'File is deleted.' });
  //     // res.end()
  //   }
  //   catch(err){
  //     console.log(err)
  //   }
  // })

  // app.patch('/get-signed-url/:id',async(req,res)=>{
  //   try{
  //   const id = req.params.id;
  //   const {fileData , uuid,  file_name }= req.body;
  //   const payload = {
  //     fileData: fileData,
  //     uuid: uuid,
  //     file_name: file_name
  //   };
  //      postData(fileData,uuid,file_name)

  //      await brandImageModel.findOneAndUpdate({"photo.id":id},payload)
  //     return res.status(200).json({ message: 'File is updated.' });
  //   }
  //   catch(err){
  //     console.log(err)
  //   }
  // })
  
  
  







  // const filePath = path.join(__dirname, 'uploads', uniqueFileName);
      // Write the file to disk
      // fs.writeFileSync(filePath, fileBuffer);