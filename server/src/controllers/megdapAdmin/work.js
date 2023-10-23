const { db, admin } = require("../../../firebase");

const getDownloadUrl = async (path) => {
    const bucket = admin.storage().bucket();
    const file = bucket.file(path);
    const [url] = await file.getSignedUrl({
        action: 'read',
        expires: '01-01-2100'
    });
    return url;
}
exports.getProjectWorks = async (req, res) => {
    try {
        const { projectId } = req.params;
        console.log(projectId)
        if (!projectId) return res.status(400).json({
            message: "Invalid Request"
        });
        const workRef = db.collection('works');
        const workQuery = workRef.where('projectId', '==', projectId);
        const workSnapshot = await workQuery.get();
        if (workSnapshot.empty)
            return res.status(200).json({
                works: []
            });
        
        
        const works = await Promise.all(workSnapshot.docs.map(async (doc) => {
            const id = doc.id;
            const workDoc = doc.data();
            const downloadUrl = await getDownloadUrl(workDoc?.filePath);
            return {
                id,
                sourceLanguage: workDoc?.sourceLanguage,
                downloadUrl
            };
        }));
        console.log(works)
        return res.status(200).json({works});
    } catch (error) {
        console.log("Get Work Error: ", error.message);
        return res.status(500).json({
        message: "Something went wrong"
        });
    }
    }