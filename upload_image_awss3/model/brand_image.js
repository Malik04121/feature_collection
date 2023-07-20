const mongoose =require("mongoose")

const brandLogoSchema=mongoose.Schema({
    photo: {
        id: {
          type: String,
          required: true,
        },
        secure_url: {
          type: String,
          default:
            "https://eliaslealblog.files.wordpress.com/2014/03/user-200.png?w=700",
          required: true,
        },
      },
})


const brandImageModel=mongoose.model("brandLogo",brandLogoSchema)

module.exports={brandImageModel}