import jobService from "./job.service.js";

class JobController {
    /**
     * Job add
     * @param {*} req 
     * @param {*} res 
     * @returns 
     */
    async add(req, res) {
        const { title, description, category, companyName, url } = req.body;
        const data = await jobService.add({ title, description, category, companyName, url });
        return res.json(data);
    }
    /**
     * Job List
     * @param {*} req 
     * @param {*} res 
     * @returns 
     */
    async list(req, res) {
        const data = await jobService.list(req.query);
        return res.json(data);
    }

    
    /**
     * Job edit
     * @param {*} req 
     * @param {*} res 
     * @returns 
     */
    async edit(req, res) {
        const { id } = req.params;
        const { title, description, category, companyName, url } = req.body;
        const data = await jobService.edit(id, { title, description, category, companyName, url });
        return res.json(data);
    }
    /**
     * Job Delete
     * @param {*} req 
     * @param {*} res 
     * @returns 
     */
    async delete(req, res) {
        const { id } = req.params;
        const data = await jobService.delete(id);
        return res.json(data);
    }
    /**
     * Job seekers
     * @param {*} req 
     * @param {*} res 
     * @returns 
     */
    async jobseekers(req, res) {
        const { jobId } = req.params;
        if (!jobId) {
            return res.json({ status: false, message: "Job ID is required" });
        }
        const data = await jobService.jobseekers(jobId);
        return res.json(data);
    }
}

export default new JobController();