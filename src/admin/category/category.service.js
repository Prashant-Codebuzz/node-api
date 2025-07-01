import moment from 'moment-timezone';   
import knex from "../../common/config/database.config.js"

class CategoryService {
    async add({ name }) {
        const isCategory = await knex('category').where('name', name).first()
        if (isCategory) {
            return ({ status: false, message: "Category already exist!" })
        }
        await knex('category').insert({ name }).returning('id', 'name');
        return ({ status: true, message: "successfully category created" });
    }

    async list(query) {
        const { perPage, page } = query;
        const qb = knex('category')
        if (query.search) {
            qb.where('name', 'like', `%${query.search}%`);
        }

        const data = await qb
        // .paginate({
        //     perPage: perPage ? parseInt(perPage) : 10,
        //     currentPage: page ? parseInt(page) : 1,
        //     isLengthAware: true,
        // });

        data.forEach(i => {
            i.createdAt = moment.utc(i.createdAt).tz('Asia/Kolkata').format('YYYY-MM-DD HH:mm:ss');
        });

        return ({
            status: true, message: "Success",
            data: data,
            // pagination: data.pagination
        });
    }

    async edit(id, { name }) {
        const isCategory = await knex('category').where('id', id).first()
        if (isCategory) {
            const isalreadyexist = await knex('category').where('name', name).whereNot('id', isCategory.id).first()
            if (isalreadyexist) {
                return ({ status: false, message: "category name already exist choose another one!" })
            }
            await knex('category')
                .where({ id })
                .update({ name, updatedAt: knex.fn.now() });
            return ({ status: true, message: "Category updated!" })
        }
    }

    async delete(id) {
        const isCategory = await knex("category").where({ id }).first()
        if (isCategory) {
            await knex("category").where({ id }).del()
            return ({ status: "success", message: "Category deleted successfully" });
        } else {
            return ({ status: false, message: "category id not found" })
        }

    }
}

export default new CategoryService();
