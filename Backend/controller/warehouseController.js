import OutboundCompany from "../model/outCompany.js";

export const SaveCompanyDetails = async (req , res)=>{

    try 
       {
        const {CompanyName,CompanyAddress,CompanyPhone,CompanyEmail,CompanyDocuments,warehouse} = req.body;
        if(!CompanyName || !CompanyAddress || !CompanyPhone || !CompanyEmail || !CompanyDocuments || !warehouse){
            return res.status(403).json({message:"All fields are required"});
        }
        const upload = new Cloudinary
        const savedCompany = await OutboundCompany.create({CompanyName,CompanyAddress,CompanyPhone,CompanyEmail,CompanyDocumentsURL,GSTIN});
        res.status(200).json({message:"Company details saved successfully",savedCompany});
    } 
    catch (error)
    {
        console.log(error.message);
        res.status(500).json({message:"Something went wrong"});
    }
}