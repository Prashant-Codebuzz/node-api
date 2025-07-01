import knex from "../../common/config/database.config.js"

class CategoryService {
    async list(){
        try{
            const category = await knex('category')
            return ({status:true,message:"success",data:category})
        }catch(err){
            return ({status:false,message:"can't get category list"})
        }
    }
}

export default new CategoryService();
