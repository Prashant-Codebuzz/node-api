import moment from 'moment-timezone';
import knex from "../../common/config/database.config.js"
import { storeAsSync, deleteFile, castToStorage } from "../../common/helper.js"
class JobService {
    async getJobList(query) {
        try {
            const search = query.search || 'all';
            let jobList;

            if (search === 'all') {
                jobList = await knex('jobs').select('id', 'title', 'companyName', 'description', "url", 'createdAt');
            } else {
                jobList = await knex('jobs')
                    .where('title', 'like', `%${search}%`)
                    .select('id', 'title', 'companyName', 'description', "url", 'createdAt');
            }

            jobList.forEach(job => {
                job.createdAt = moment.utc(job.createdAt).tz('Asia/Kolkata').format('YYYY-MM-DD HH:mm:ss');
            });

            return { status: true, message: 'Success', data: jobList };
        } catch (error) {
            return { status: false, message: "Can't fetch job list" };
        }
    }

    async getJobDetails(id) {
        try {
            if (!id) {
                return { status: false, message: 'ID parameter is required' };
            }

            const job = await knex('jobs')
                .where('id', id)
                .first()
                .select('id', 'title', 'companyName', 'description', 'url', 'createdAt');
            if (!job) {
                return { status: false, message: 'Job not found' };
            }

            job.createdAt = moment.utc(job.createdAt).tz('Asia/Kolkata').format('YYYY-MM-DD HH:mm:ss');

            return { status: true, message: 'Success', data: job };
        } catch (error) {
            return { status: false, message: 'Something went wrong' };
        }
    }

    async getLatestJobs() {
        try {
            const latestJobs = await knex('jobs').limit(5).orderBy('id', 'desc');
            return { status: true, message: 'Success', data: latestJobs };
        } catch (error) {
            return { status: false, message: "Can't fetch latest jobs" };
        }
    }

    async getJobsByCategory(categoryId) {
        try {
            if (!categoryId) {
                return { status: false, message: 'Category ID is required' };
            }

            const jobs = await knex('jobs')
                .select('id', 'title', 'companyName', 'description', 'createdAt')
                .where('categoryId', categoryId);

            return { status: true, message: 'Success', data: jobs };
        } catch (error) {
            return { status: false, message: "Can't fetch jobs by category" };
        }
    }

    async jobSearcher(body, files) {
        try {
            const { firstName, lastName, email, phone, time, gender, coverLatter, jobId } = body
            // if(req.file){
            //     var resume =  `/upload/${req.file.filename}`
            // }    
            let file = null;
            if (files) {
                file = storeAsSync(
                    'upload',
                    files.resume.data,
                    files.resume.mimetype,
                );
            }
            const job = await knex('jobs').where('id', jobId).first();
            if (!job) {
                return { status: false, message: 'Job does not exist' };
            }

            const jobSearcherOrNot = await knex('jobsearcher').where('email', email).where('jobId', jobId).first()
            if (jobSearcherOrNot) {
                return ({ status: false, message: "Already applied" })
            }
            await knex('jobsearcher').insert({
                firstName: firstName,
                lastName: lastName,
                email: email,
                phone: phone,
                time: time,
                gender: gender,
                coverLatter: coverLatter,
                jobId: parseInt(jobId),
                resume: file
            })
            return ({ status: true, message: "job search request created successfully" })
        } catch (error) {
            return { status: false, message: "Can't create request" };
        }
    }
}

export default new JobService();