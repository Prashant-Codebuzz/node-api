import moment from 'moment-timezone';
import knex from "../../common/config/database.config.js"
import { storeAsSync, deleteFile, castToStorage } from "../../common/helper.js"

class BlogService {
    async getBlogList(query) {
        try {
            const search = query.search || 'all';
            let blogList;

            if (search === 'all') {
                blogList = await knex('blog').select('id', 'title', 'image', 'description', 'authorname', 'created_at');
            } else {
                blogList = await knex('blog')
                    .where('title', 'like', `%${search}%`)
                    .select('id', 'title', 'image', 'description', 'authorname', 'created_at');
            }

            blogList.forEach(blog => {
                blog.createdAt = moment.utc(blog.createdAt).tz('Asia/Kolkata').format('YYYY-MM-DD HH:mm:ss');
                blog.image = castToStorage(blog.image);
            });

            return { status: true, message: 'Success', data: blogList };
        } catch (error) {
            console.log(error)
            return { status: false, message: "Can't fetch job list" };
        }
    }

    async getBlogDetails(id) {
        try {
            if (!id) {
                return { status: false, message: 'ID parameter is required' };
            }

            const blog = await knex('blog')
                .where('id', id)
                .first()
                .select('id', 'title', 'image', 'description', 'authorname', 'created_at');
            if (!blog) {
                return { status: false, message: 'Blog not found' };
            }

            blog.createdAt = moment.utc(blog.createdAt).tz('Asia/Kolkata').format('YYYY-MM-DD HH:mm:ss');
            blog.image = castToStorage(blog.image);


            return { status: true, message: 'Success', data: blog };
        } catch (error) {
            return { status: false, message: 'Something went wrong' };
        }
    }
}

export default new BlogService();