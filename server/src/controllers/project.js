const {db} = require('../../firebase')
const admin = require('firebase-admin')

exports.addProject = async(req,res) =>{
    try {
        const {name,department,work,description} = req.body
        const user = req.user
        
        if(!user)
            return res.status(401).json({message:"Invalid Request"})
        const userDetail = {
            email:user.email
        }
        if(!name || !department || !work){
            return res.status(400).json({message:"Plzz provide all Fields"})
        }
        const date = admin.firestore.FieldValue.serverTimestamp()
        
        const data = {
            name,
            department,
            createdAt:date,
            description,
            userId:user.id,
            user:userDetail,
            status:"In Progress",
            work
        }
        await db.collection('projects').add(data)

        return res.status(201).json({message:"Project Added"})
    } catch (error) {
        console.log("Add New Project : ", error.message)
        return res.status(500).json({message:"Something went wrong"})
    }
}

exports.getProjects = async (req, res) => {
    try {
        const user = req.user;
        if (!user) return res.status(400).json({ message: "Invalid Request" });

        const { pageNumber, recordsPerPage } = req.query;
        const projectCollection = db.collection('projects');
        const startAtDocument = (Number(pageNumber) - 1) * Number(recordsPerPage);
        
        const projectSnapshot = await projectCollection
            .where('userId', '==', user.id)
            .orderBy('createdAt')
            .startAt(startAtDocument)
            .limit(Number(recordsPerPage))
            .get();

        if (projectSnapshot.empty) {
            return res.status(404).json({ message: "No Projects Found" });
        }

        const projects = projectSnapshot.docs.map((item) => {
            const data = item.data()
            const timestamp = {
                seconds: data.createdAt._seconds,
                nanoseconds: data.createdAt._nanoseconds
            }
            const date = new Date(timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000);
            const end_date = new Date(date);
            end_date.setDate(end_date.getDate() + 2);
           
            return{
                name:data.name,
                userId:data?.user?.email,
                start_date: date,
                end_date: end_date,
                status:data.status
            }
        });
        
        return res.status(200).json({ projects });
    } catch (error) {
        console.log("Get Projects Error: ", error.message);
        return res.status(500).json({ message: "Something went wrong" });
    }
}
