import Company from "../models/company.model.js";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";
export const registerCompany = async (req, res) => {
    try {
        // console.log('Registering new company...');
        // console.log('Request body:', req.body);
        const { companyName } = req.body;
        if (!companyName) {
            // console.log('Company name is missing in request');
            return res.status(400).json({
                message: "Company name is required",
                success: false
            });
        }
        // console.log('Checking if company exists:', companyName);
        let company = await Company.findOne({ name: companyName });
        if (company) {
            // console.log('Company already exists:', companyName);
            return res.status(400).json({
                message: "Company already exists, so you can't register the same company.",
                success: false
            });
        }

        // console.log('Creating new company:', companyName);
        company = await Company.create({
            name: companyName,
            userId: req.id
        });
        // console.log('Company created successfully:', company);
        return res.status(201).json({
            message: "Company created successfully",
            company,
            success: true
        });

    } catch (error) {
        console.error('Error registering company:', error.message);
        console.error('Error stack:', error.stack);
        return res.status(500).json({
            message: "An error occurred while registering the company.",
            success: false,
            error: error.message
        });

    }
};

export const getCompany = async (req, res) => {
    try {
        const userId = req.id;
        const companies = await Company.find({ userId }); // Corrected the find method
        if (!companies || companies.length === 0) {
            return res.status(404).json({
                message: "Companies not found.",
                success: false
            });
        }
        return res.status(200).json({
            companies,
            success: true
        });
    } catch (error) {
        // console.log(error);
        return res.status(500).json({
            message: "An error occurred while fetching the companies.",
            success: false
        });
    }
};

// Get company by id
export const getCompanyById = async (req, res) => {
    try {
        const companyId = req.params.id;
        const company = await Company.findById(companyId);
        if (!company) { // Corrected variable name
            return res.status(404).json({
                message: "Company not found.",
                success: false
            });
        }
        return res.status(200).json({
            company,
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "An error occurred while fetching the company.",
            success: false
        });
    }
};

export const updateCompany = async (req, res) => {
    try {
        const { name, description, website, location } = req.body;
        const file = req.file;
        // cloudinary 
        console.log('File object:', file); // Log the file object for debugging
        const fileUri = getDataUri(file); 

        const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
        const logo = cloudResponse.secure_url;
        const updateData = { name, description, website, location, logo };
        const company = await Company.findByIdAndUpdate(req.params.id, updateData, { new: true });
        if (!company) {
            return res.status(404).json({
                message: "Company not found.",
                success: false
            });
        }
        return res.status(200).json({
            message: "Company information updated.",
            success: true,
            company // Return the updated company
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "An error occurred while updating the company.",
            success: false
        });
    }
};
// import Company from "../models/company.model.js";
// export const registerCompany = async (req, res) => {
//     try {
//         const { companyName } = req.body;
//         if (!companyName) {
//             return res.status(400).json({
//                 message: "Company name is required",
//                 success: false
//             });
//         }
//         let company = await Company.findOne({ name: companyName });
//         if (company) {
//             return res.status(400).json({
//                 message: "Company already exists So you can't register same Company",
//                 success: false
//             })
//         };
//         company = await Company.create({
//             name: companyName,
//             userId: req.id
//         });
//         return res.status(201).json({
//             message: "Company created successfully",
//             company,
//             success: true
//         })
//     } catch (error) {
//         console.log(error);
//     }
// }
// export const getCompany = async (req, res) => {
//     try {
//         const userId = req.id;
//         const companies = await Company.find("userId");
//         if (!companies) {
//             return res.status(404).json({
//                 message: "Companies not found.",
//                 success: false
//             });
//         }
//         return res.status(200).json({
//             companies,
//             success: true
//         });
//     } catch (error) {
//         console.log(error);
//     }
// };
// // get company by id
// export const getCompanyById = async (req, res) => {
//     try {
//         const companyId = req.params.id;
//         const company = await Company.findById(companyId);
//         if (!companies) {
//             return res.status(404).json({
//                 message: "Company not found.",
//                 success: false
//             });
//         }
//         return res.status(200).json({
//             company,
//             success: true
//         });

//     } catch (error) {
//         console.log(error);

//     }
// };
// export const updateCompany = async (req, res) => {
//     try {
//         const { name, description, website, location } = req.body;
//         const file = req.file;
//         // cloudinary

//         const updateData = { name, description, website, location };
//         const company = await Company.findByIdAndUpdate(req.params.id, updateData, { new: true });
//         if (!company) {
//             return res.status(404).json({
//                 message: "Company not found.",
//                 success: false
//             });
//         }
//         return res.status(200).json({
//             message: "Company information updated.",
//             success: true
//         });


//     } catch (error) {
//         console.log(error);

//     }
// };
