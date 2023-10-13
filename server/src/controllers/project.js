const {db} = require('../../firebase')
const admin = require('firebase-admin')
const validator = require('validator')

exports.addProject = async(req,res) =>{
    try {
        const {name,department,works,totalCost,description} = req.body
        

        if(validator.isEmpty(name) || validator.isEmpty(department)){
            return res.status(400).json({message:"Plzz provide all Fields"})
        }
        if(!works || works.length == 0)
            return res.status(400).json({message:"Invalid Request"})

        const user = req.user
        if(!user)
            return res.status(401).json({message:"Invalid Request"})
        const userRef =  db.collection('users').doc(user.id)
        const userData = (await userRef.get()).data()
        userRef.update({totalBilledAmount:userData.totalBilledAmount+totalCost})
        const userDetail = {
            email: user.email,
            name:user.name
        }
        const date = admin.firestore.FieldValue.serverTimestamp()
        
        const data = {
            name,
            department,
            totalCost,
            createdAt:date,
            description:description?description:'',
            userId:user.id,
            user:userDetail,
            status:"In Progress"
        }
        const docRef = await db.collection('projects').add(data)

        works.forEach(async (work) => {
            const workData = {...work,projectId:docRef.id,projectName:name}
            await db.collection('works').add(workData)
        })
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

        let projectQuery = projectCollection
            .where('userId', '==', user.id)
            .orderBy('createdAt','desc');

        if (pageNumber && pageNumber > 1) {
            const previousPageQuery = await projectQuery
                .limit((pageNumber - 1) * recordsPerPage)
                .get();

            const lastDocument = previousPageQuery.docs[previousPageQuery.docs.length - 1];

            projectQuery = projectQuery.startAfter(lastDocument);
        }

        projectQuery = projectQuery.limit(Number(recordsPerPage));

        const projectSnapshot = await projectQuery.get();

        if (projectSnapshot.empty) {
            return res.status(404).json({ message: "No Projects Found" });
        }

        const projects = projectSnapshot.docs.map((item) => {
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
                name: data?.name,
                userId: data?.user?.email,
                start_date: date,
                end_date: end_date,
                status: data?.status
            };
        });

        return res.status(200).json({ projects });
    } catch (error) {
        console.log("Get Projects Error: ", error.message);
        return res.status(500).json({ message: "Something went wrong" });
    }
};

exports.getProject = async(req,res) =>{
    try {
        const {id} = req.params;
        
        if(!id)
            return res.status(400).json({message:"Invalid Request"})

        const projectCollection = db.collection('projects');

        const data = (await projectCollection.doc(id).get()).data()

        const timestamp = {
            seconds: data.createdAt._seconds,
            nanoseconds: data.createdAt._nanoseconds
        };

        const date = new Date(timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000);
        const end_date = new Date(date);
        end_date.setDate(end_date.getDate() + 2);
        const project = {
            id,
            name: data.name,
            department:data?.department,
            userId: data?.user?.email,
            userName: data?.user?.name,
            totalCost:data?.totalCost,
            start_date: date,
            end_date: end_date,
            status: data.status
        }
        return res.status(200).json({project})
    } catch (error) {
        console.log("Get Project Error: ", error.message);
        return res.status(500).json({ message: "Something went wrong" });
    }
}

