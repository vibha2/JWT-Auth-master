import axios_api from "../axios";

const ItemService = {

    itemDataSubmit: async function(formData){
        try{
            const response = axios_api.post("/upload/itemSubmit", formData);
            console.log("response in service=> ", response, " ", response?.data);
            //Content-Type application/x-www-form-urlencoded
            return response?.data;

        }catch(error){
            console.log("error in itemSubmit api call=> ", error)
        }
    }
}

export default ItemService;