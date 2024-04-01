const Item = require("../models/itemModel");
const cloudinary = require("cloudinary").v2;

function isFileTypeSupported(type, supportedTypes){
    return supportedTypes.includes(type);
}

async function uploadFileToCloudinary(file, folder){
    const options = { folder };
    return await cloudinary.uploader.upload(file.tempFilePath, options);
}

exports.itemSubmit = async(req, res) => {
    try{
        console.log("hello=> ", req.body);
        const { itemName, itemPrice, itemType, itemMode } = req.body;
        console.log("check=> ", itemName, itemPrice, itemType, itemMode);

        const file = req.files?.imageFile;
        console.log("file is here");

        //validation
        const supportedTypes = ["jpg", "jpeg", "png"];
        const fileType = file.name.split('.')[1];
        console.log("filetype=> ", fileType);

        if(!isFileTypeSupported(fileType, supportedTypes)){
            return res.status(400).json({
                success: false,
                message: 'File format not supported',
            })
        }

        //file format supported
        //upload in cloudinary
        console.log("uploading...")
        let response;
        try{
            response = await uploadFileToCloudinary(file, "JWTAuth");
        } catch(err){
           throw new Error(err);
        }
        
        console.log("response=> ", response);

        const itemData = await Item.create({
            itemName,
            itemPrice, 
            itemType, 
            imageFile: response.secure_url,
            itemMode
        });

        return res.status(200).json({
            success: true,
            message: "Item Submitted Successfully",
            itemData
        })

    }catch(error){
        console.log("error=> ", error);
        return res.status(400).json({
            success: false,
            message: "Unable to submit the form"
        })
    }
}

exports.getItemData = async(req, res) => {
    try{
        const item = await Item.find({});

        if(!item)
        {
            return res.status(401).json({
                success: false,
                message: "Item Data not found in db"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Item fetched successfully",
            item
        });
        
    }catch(err)
    {
        console.log("error=> ", error);
        return res.status(400).json({
            success: false,
            message: "Unable to get the item data"
        })
    }
}
