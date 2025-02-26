// import { Job } from "../models/job.model.js";
// //here admin will post the job
// export const postJob = async (req, res) => {
//     try {
//         const { title, description, requirements, salary, location, jobType, experience, position, companyId } = req.body;
//         const userId = req.id;

//         if (!title || !description || !salary || !location || !location || !jobType || !experience || !position || !companyId) {
//             return res.status(400).json({
//                 message: "Something is missing",
//                 status: false
//             })
//         };
//         const job = await Job.create({
//             title,
//             description,
//             requirements: requirements ? requirements.split(",") : [],
//             salary: Number(salary),
//             location,
//             jobType,
//             experienceLevel: experience,
//             position,
//             company: companyId,
//             created_by: userId
//         });
//         return res.status(201).json({
//             message: "New Job created successfully",
//             job,
//             status: true
//         });

//     } catch (error) {
//         console.log(error);
//         return res.status(500).json({ message: "An error occurred", status: false });
//     }
// }
// // for student 
// export const getAllJobs = async (req, res) => {
//     try {
//         const keyword = req.query.keyword || "";
//         const query = {
//             $or: [
//                 { title: { $regex: keyword, $options: "i" } },
//                 { description: { $regex: keyword, $options: "i" } },
//             ]
//         };
//         const jobs = await Job.find(query).populate({
//             path: "company"
//         }).sort({ createdAt: -1 });
//         if (!jobs) {
//             return res.status(404).json({
//                 message: "No jobs found",
//                 status: false
//             })
//         };
//         return res.status(200).json({
//             message: "Jobs found successfully",
//             jobs,
//             status: true
//         })

//     } catch (error) {
//         console.log(error);
//     }
// }
// // for user or student
// export const getJobById = async (req, res) => {
//     try {
//         const jobId = req.params.id;
//         const job = await Job.findById(jobId).populate({
//             path:"applications"
//         });
//         if (!job) {
//             return res.status(404).json({
//                 message: "Job not found",
//                 status: false
//             })
//         };
//         return res.status(200).json({ job, success: true });

//     } catch (error) {
//         console.log(error);
//     }
// }
// //job created by admin till yet
// export const getAdminJobs = async (req, res) => {
//     try {
//         const adminId = req.id;
//         const jobs = await Job.find({ created_by: adminId });
//         if (!jobs) {
//             return res.status(404).json({
//                 message: "No jobs found",
//                 status: false
//             })
//         };
//         return res.status(200).json({
//             jobs,
//             success: true
//         })
//     } catch (error) {
//         console.log(error);
//     }
// }
import { Job } from "../models/job.model.js";

// admin post krega job
export const postJob = async (req, res) => {
    try {
        const { title, description, requirements, salary, location, jobType, experience, position, companyId } = req.body;
        const userId = req.id;

        if (!title || !description || !requirements || !salary || !location || !jobType || !experience || !position || !companyId) {
            return res.status(400).json({
                message: "Somethin is missing.",
                success: false
            })
        };
        const job = await Job.create({
            title,
            description,
            requirements: requirements.split(","),
            salary: Number(salary),
            location,
            jobType,
            experienceLevel: experience,
            position,
            company: companyId,
            created_by: userId
        });
        return res.status(201).json({
            message: "New job created successfully.",
            job,
            success: true
        });
    } catch (error) {
        console.log(error);
    }
}
// student k liye
export const getAllJobs = async (req, res) => {
    try {
        const keyword = req.query.keyword || "";
        const query = {
            $or: [
                { title: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } },
            ]
        };
        const jobs = await Job.find(query).populate({
            path: "company"
        }).sort({ createdAt: -1 });
        if (!jobs) {
            return res.status(404).json({
                message: "Jobs not found.",
                success: false
            })
        };
        return res.status(200).json({
            jobs,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}
// student
export const getJobById = async (req, res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({
            path: "applications"
        });


        if (!job) {
            return res.status(404).json({
                message: "Jobs not found.",
                success: false
            })
        };
        return res.status(200).json({ job, success: true });
    } catch (error) {
        console.log(error);
    }
}
// admin kitne job create kra hai abhi tk
export const getAdminJobs = async (req, res) => {
    try {
        const adminId = req.id;
        const jobs = await Job.find({ created_by: adminId }).populate({
            path: 'company',
            createdAt: -1
        });
        if (!jobs) {
            return res.status(404).json({
                message: "Jobs not found.",
                success: false
            })
        };
        return res.status(200).json({
            jobs,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}
