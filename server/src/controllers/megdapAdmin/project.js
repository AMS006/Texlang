const { db } = require("../../../firebase");

exports.getUserProjects = async (req, res) => {
    try {
        const { userId } = req.params
        if (!userId)
            return res.status(400).json({ message: "Invalid Request" })
        
        const projectRef = db.collection('projects');
        const projectQuery = projectRef.where('userId', '==', userId).orderBy('createdAt', 'desc');
        
        const projectSnapshot = await projectQuery.get()
        if(projectSnapshot.empty)
            return res.status(200).json({ projects: [] });

        const projects = projectSnapshot.docs.map((doc) => {
            const id = doc.id
            const projectDoc = doc.data();
            return {
                id,
                name: projectDoc?.name,
            }
        })
        return res.status(200).json({ projects });
    } catch (error) {
        console.log("Get Projects Error: ", error.message);
        return res.status(500).json({ message: "Something went wrong" });
    }
}