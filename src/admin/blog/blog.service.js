import moment from 'moment-timezone';
import knex from "../../common/config/database.config.js"
import { castToStorage, storeAsSync } from '../../common/helper.js';

class BlogService {
    async add(body, files) {
        const { title, image, description, authorname } = body;

        let file = null;
        if (files?.image?.data) {
            file = storeAsSync(
                'upload',
                files.image.data,
                files.image.mimetype,
            );
        }

        const isBlog = await knex('blog').where('title', title).first()
        if (isBlog) {
            return ({ status: false, message: "Blog already exist!" })
        }

        await knex('blog').insert({
            title: title,
            image: file,
            description: description,
            authorname: authorname,
        })
        // .returning('id', 'name');
        return ({ status: true, message: "successfully blog created" });
    }

    async list(query) {
        const { perPage, page } = query;
        const qb = knex('blog')
        if (query.search) {
            qb.where('title', 'like', `%${query.search}%`);
        }

        const data = await qb
        // .paginate({
        //     perPage: perPage ? parseInt(perPage) : 10,
        //     currentPage: page ? parseInt(page) : 1,
        //     isLengthAware: true,
        // });

        data.forEach(i => {
            i.createdAt = moment.utc(i.createdAt).tz('Asia/Kolkata').format('YYYY-MM-DD HH:mm:ss');
            i.image = castToStorage(i.image);
        });

        return ({
            status: true, message: "Success",
            data: data,
        });
    }

    async edit(id, body, files) {
        const { title, image, description, authorname } = body;

        const isBlog = await knex('blog').where('id', id).first();

        let file = null;
        if (files?.image?.data) {
            file = storeAsSync(
                'upload',
                files.image.data,
                files.image.mimetype,
            );
        }

        if (isBlog) {
            const isalreadyexist = await knex('blog').where('title', title).whereNot('id', isBlog.id).first();
            if (isalreadyexist) {
                return ({ status: false, message: "blog name already exist choose another one!" })
            }


            await knex('blog').where('id', id).update({
                title: title || isBlog.title,
                image: file || isBlog.image,
                description: description || isBlog.description,
                authorname: authorname || isBlog.authorname,
                // updatedAt: knex.fn.now()
            });

            return ({ status: true, message: "Blog updated!" })
        }
    }

    async delete(id) {
        const isBlog = await knex("blog").where({ id }).first()
        if (isBlog) {
            await knex("blog").where({ id }).del()
            return ({ status: "success", message: "Blog deleted successfully" });
        } else {
            return ({ status: false, message: "blog id not found" })
        }

    }
}

export default new BlogService();
