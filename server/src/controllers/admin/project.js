const { db } = require("../../../firebase");

exports.getAllProjects = async (req, res) => {
    try {
        const user = req.user;
        if (!user) return res.status(400).json({ message: "Invalid Request" });

        const projectCollection = db.collection('projects');

        let projectQuery = projectCollection.where('companyId','==',user?.companyId).orderBy('createdAt','desc');

        const projectsData = await projectQuery.get();

        const projects = projectsData.docs.map((item) => {
            const id = item.id
            const projectDoc = item.data();

            const start_date_timestamp = {
                seconds: projectDoc.createdAt._seconds,
                nanoseconds: projectDoc.createdAt._nanoseconds
            };
            const end_date_timestamp = {
                seconds: projectDoc.end_date._seconds,
                nanoseconds: projectDoc.end_date._nanoseconds
            }

            const start_date = new Date(start_date_timestamp.seconds * 1000 + start_date_timestamp.nanoseconds / 1000000);
            const end_date = new Date(end_date_timestamp.seconds * 1000 + end_date_timestamp.nanoseconds / 1000000);

            return {
                id,
                name: projectDoc.name,
                customer: projectDoc?.user?.email,
                start_date,
                end_date,
                status: projectDoc.status
            };
        });
        return res.status(200).json({ projects });
    } catch (error) {
        console.log("Get All Projects Error: ", error.message);
        return res.status(500).json({ message: "Something went wrong" });
    }
};

exports.getLatestProject = async (req, res) => {
    try {
        const user = req.user;
        if (!user) return res.status(400).json({ message: "Invalid Request" });

        const projectCollection = db.collection('projects');

        let projectQuery = projectCollection.where('companyId','==',user?.companyId).orderBy('createdAt','desc').limit(5);

        const projectsData = await projectQuery.get();

        const projects = projectsData.docs.map((item) => {
            const id = item.id
            const data = item.data();
            const timestamp = {
                seconds: data.createdAt._seconds,
                nanoseconds: data.createdAt._nanoseconds
            };

            const date = new Date(timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000);
            const end_date = new Date(date);
            end_date.setDate(end_date.getDate() + 2);

            return {
                id,
                name: data.name,
                start_date: date,
                end_date: end_date,
                status: data.status
            };
        });

        return res.status(200).json({ projects });
    } catch (error) {
        console.log("Get Latest Projects Error: ", error.message);
        return res.status(500).json({ message: "Something went wrong" });
    }
};

exports.getProjectDetailsAdmin = async(req,res) =>{
    try {
        const {id} = req.params;
        
        if(!id)
            return res.status(400).json({message:"Invalid Request"})

        const projectCollection = db.collection('projects');

        const data = (await projectCollection.doc(id).get()).data()

        const timestamp = {
            seconds: data?.createdAt._seconds,
            nanoseconds: data?.createdAt._nanoseconds
        };

        const date = new Date(timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000);
        const end_date = new Date(date);
        end_date.setDate(end_date.getDate() + 2);
        const project = {
            id,
            name: data?.name,
            department:data?.department,
            userId: data?.user?.email,
            userName: data?.user?.name,
            totalCost:data?.totalCost,
            start_date: date,
            end_date: end_date,
            status: data?.status
        }
        return res.status(200).json({project})
    } catch (error) {
        console.log("Get Project Error: ", error.message);
        return res.status(500).json({ message: "Something went wrong" });
    }
}

exports.getProjectInvoices = async(req,res) =>{
    try {
        const user = req.user
        if (!user)
            return res.status(401).json({ message: "Unauthorized" })
        
        const projectRef = db.collection('projects').where('companyId','==',user?.companyId).where('status','==','Completed')

        const projectData = (await projectRef.get()).docs;

        const projects = projectData.map((data) =>{
            const project = data.data();
            const id = data.id
            return {
                id,
                name:project?.name,
                department:project?.department,
                createdBy:project?.user.email,
            }
        })
        return res.status(200).json({projects})
    } catch (error) {
        console.log("Get Invoice Error: ", error.message);
        return res.status(500).json({ message: "Something went wrong" });
    }
}