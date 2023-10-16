const validator = require('validator')

const {db, admin} = require('../../firebase')
const { getWorksData, formatJobWiseData } = require('./work')

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
        const projectRef = db.collection('projects').doc()
        const jobWiseDataRef = db.collection('metadata').doc('jobWiseData')

         const userDetail = {
            email: user.email,
            name:user.name
        }
        const date = admin.firestore.FieldValue.serverTimestamp()
        
        const projectData = {
            name,
            department,
            totalCost:Number(totalCost),
            createdAt:date,
            description:description?description:'',
            userId:user.id,
            user:userDetail,
            status:"In Progress"
        }

        await db.runTransaction(async(transaction)=>{
            const amount = Number(totalCost)
            const jobWiseDataExists = (await transaction.get(jobWiseDataRef)).exists

            transaction.update(userRef,{totalBilledAmount:admin.firestore.FieldValue.increment(amount)})
            
            transaction.set(projectRef,projectData)

            const projectId = projectRef.id
            const worksData = getWorksData(works,projectId,name)

            worksData.forEach((work) =>{
                const workRef = db.collection('works').doc();
                transaction.set(workRef,work)
            })

            const jobWiseData = formatJobWiseData(works)


            if(jobWiseDataExists){
                for(const field in jobWiseData){
                    const val = Number(jobWiseData[field])

                    transaction.update(jobWiseDataRef,{
                        [field]:admin.firestore.FieldValue.increment(val)
                    })
                }
            }else{
                transaction.set(jobWiseDataRef,jobWiseData)
            }

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

        

        const projectRef = db.collection('projects');

        
        let projectQuery = projectRef
            .where('userId', '==', user.id)
            .orderBy('createdAt','desc');
       
        const projectSnapshot = await projectQuery.get()

        

        const projects = projectSnapshot.docs.map((doc) =>{
            const id = doc.id
            const data = doc.data();
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
        })

        return res.status(200).json({ projects });
    } catch (error) {
        console.log("Get Projects Error: ", error.message);
        return res.status(500).json({ message: "Something went wrong" });
    }
};

exports.getProjectDetailsUser = async(req,res) =>{
    try {
        const {id} = req.params;
        
        if(!id)
            return res.status(400).json({message:"Invalid Request"})

        const projectCollection = db.collection('projects');

        const data = (await projectCollection.doc(id).get()).data()

        if(!data)
            return res.status(404).json({message:"No Project Found"})
        const workCollection = db.collection('works').where('projectId' ,'==',id)
        const worksData = (await workCollection.get()).docs

        const works = worksData.map((data) =>{
            const work = data.data();
            const id = data.id
            return{
                id,
                name:work?.name,
                sourceLanguage:work?.sourceLanguage,
                approvalStatus:work?.approvalStatus,
                currentStatus:work?.currentStatus,
                targetLanguage:work?.targetLanguage

            }
        })

        const project = {
            name: data.name,
        }
        return res.status(200).json({project,works})
    } catch (error) {
        console.log("Get Project Error: ", error.message);
        return res.status(500).json({ message: "Something went wrong" });
    }
}

