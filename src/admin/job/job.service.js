// import moment from "moment/moment.js";
import moment from 'moment-timezone';
import knex from "../../common/config/database.config.js"
import JobseekersResource from "./resource/jobseekers.resource.js";

class JobService {
    async add({ title, description, category, companyName, url }) {

        try {
            const existingCategory = await knex('category').where('id', category).first();
            if (!existingCategory) {
                return { status: false, message: "Category ID does not exist" };
            }
            await knex('jobs').insert({
                title,
                description,
                categoryId: category,
                companyName: companyName,
                url: url || null,
            });
            return { status: true, message: "Job added successfully" };
        } catch (error) {
            console.error("Error adding job:", error);
            return { status: false, message: "Internal Server Error" };
        }
    }

    async list() {
        try {
            const jobs = await knex('jobs')
                .leftJoin('category', 'jobs.categoryId', '=', 'category.id')
                .leftJoin('jobsearcher', 'jobs.id', '=', 'jobsearcher.jobId')
                .select('jobs.id', 'jobs.title', 'jobs.description', 'jobs.companyName', 'jobs.url', 'category.name as categoryName',
                    'jobs.createdAt',
                    knex.raw('COUNT(jobsearcher.id) as applicantCount'))
                .groupBy('jobs.id', 'jobs.title', 'jobs.description', 'jobs.companyName', 'category.name', 'jobs.createdAt');


            jobs.forEach(job => {
                // job.createdAt = moment.utc(job.createdAt).local().format('YYYY-MM-DD HH:mm:ss');
                job.createdAt = moment.utc(job.createdAt).tz('Asia/Kolkata').format('YYYY-MM-DD HH:mm:ss');
            });

            return { status: true, message: "Jobs fetched successfully", data: jobs };
        } catch (error) {
            console.error("Error fetching jobs:", error);
            return { status: false, message: "Internal Server Error" };
        }
    }

    async edit(id, { title, description, category, companyName, url }) {
        try {
            if (category) {
                const existingCategory = await knex('category').where('id', category).first();
                if (!existingCategory) {
                    return { status: false, message: "Category ID does not exist" };
                }
            }
            
            const job = await knex('jobs').where('id', id).first();
            if (!job) {
                return { status: false, message: "Job not found" };
            }

            await knex('jobs').where('id', id).update({
                title: title || job.title,
                description: description || job.description,
                categoryId: category || job.categoryId,
                companyName: companyName || job.companyName,
                url: url || null,
            });

            return { status: true, message: "Job updated successfully" };
        } catch (error) {
            console.error("Error updating job:", error);
            return { status: false, message: "Internal Server Error" };
            // throw new Error("Internal Server Error");
        }
    }

    async delete(id) {
        try {
            const job = await knex('jobs').where('id', id).first();
            if (!job) {
                return { status: false, message: "Job not found" };
            }

            await knex('jobs').where('id', id).delete();
            return { status: true, message: "Job deleted successfully" };
        } catch (error) {
            console.error("Error deleting job:", error);
            return { status: false, message: "Internal Server Error" };
        }
    }

    async jobseekers(jobId) {
        try {
            const job = await knex('jobs').where('id', jobId).first();
            if (!job) {
                return { status: false, message: "Job ID does not exist" };
            }
            const jobseekers = await knex('jobsearcher').where('jobId', jobId);
            const resource = jobseekers.map(jobseeker => new JobseekersResource(jobseeker));


            resource.forEach(i => {
                i.createdAt = moment.utc(i.createdAt).tz('Asia/Kolkata').format('YYYY-MM-DD HH:mm:ss');
            });

            return { status: true, message: "Jobseekers fetched successfully", data: resource };
        } catch (error) {
            return ({ status: false, message: "Something went wrong can't get jobseekers" })
        }
    }
}

export default new JobService();