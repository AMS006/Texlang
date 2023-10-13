const { db } = require("../../../firebase");

exports.getWorks = async(req, res) => {
    try {
        const { projectId } = req.params

        if (!projectId)
            return res.status(404).json({ message: "Invalid Request" })
        
        const workQuery = db.collection('works').where('projectId', '==', projectId)

        const works = await workQuery.get()
        if (works.empty)
            return res.status(404).json({ message: "No Work Found" })
        
        const worksData = works.docs.map((item) => {
            const work = item.data()
            return work
        })
    
        return res.status(200).json({works:worksData})
        
    } catch (error) {
        console.log("Get-Works: ", error.message);
        return res.status(500).json({ message: "Something went wrong" });
    }
}

exports.getJobWiseData = async(req,res) =>{
    try {
        const worksData = await db.collection('works').get()
        let count = {}
        worksData.docs.map((doc) =>{
            const contentType = doc.data()['contentType']
            if(contentType){
                count[contentType] = (count[contentType] || 0) + 1;
            }
        })
        return res.status(200).json({jobs:count})
    } catch (error) {
        console.log("Job Wise Data: ", error.message);
        return res.status(500).json({ message: "Something went wrong" });
    }
}