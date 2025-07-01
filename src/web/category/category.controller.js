import categoryService from "./category.service.js";

class CategoryController {
    /**
     * category list
     * @param {*} req 
     * @param {*} res 
     * @returns 
     */
    async list(req, res) {
        const data = await categoryService.list();
        return res.json(data);
    }
}

export default new CategoryController();