import JobService from "./job.service.js";

class JobController {
    async jobList(req, res) {
        try {
            const data = await JobService.getJobList(req.query);
            return res.json(data);
        } catch (error) {
            return res.json({ status: false, message: 'Something went wrong' });
        }
    }

    async jobDetails(req, res) {
        try {
            const { id } = req.params;
            const data = await JobService.getJobDetails(id);
            return res.json(data);
        } catch (error) {
            return res.json({ status: false, message: 'Something went wrong' });
        }
    }

    async latestJobs(req, res) {
        try {
            const data = await JobService.getLatestJobs();
            return res.json(data);
        } catch (error) {
            return res.json({ status: false, message: 'Something went wrong' });
        }
    }

    async categoryJobs(req, res) {
        try {
            const { id } = req.params;
            const data = await JobService.getJobsByCategory(id);
            return res.json(data);
        } catch (error) {
            return res.json({ status: false, message: 'Something went wrong' });
        }
    }
    
    async jobSearcher(req,res){
        try {
            const data = await JobService.jobSearcher(req.body,req.files);
            return res.json(data);
        } catch (error) {
            return res.json({ status: false, message: 'Something went wrong' });
        }
    }
}

export default new JobController();