import BlogService from "./blog.service.js";

class blogController {
    async blogList(req, res) {
        try {
            const data = await BlogService.getBlogList(req.query);
            return res.json(data);
        } catch (error) {
            return res.json({ status: false, message: 'Something went wrong' });
        }
    }

    async blogDetails(req, res) {
        try {
            const { id } = req.params;
            const data = await BlogService.getBlogDetails(id);
            return res.json(data);
        } catch (error) {
            return res.json({ status: false, message: 'Something went wrong' });
        }
    }
}

export default new blogController();