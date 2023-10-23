const validator = require('validator')

const {db, admin} = require('../../firebase')
const { getWorksData, formatJobWiseData } = require('./work')

exports.addProject = async(req,res) =>{
    try {
        const {name,department,works,totalCost,description} = req.body
        const user = req.user
        
        if(!user)
            return res.status(401).json({ message: "Invalid Request" })
        
        if(validator.isEmpty(name) || validator.isEmpty(department)){
            return res.status(400).json({message:"Plzz provide all Fields"})
        }
        if(!works || works.length == 0)
            return res.status(400).json({message:"Invalid Request"})


        const userRef =  db.collection('users').doc(user.id)
        const projectRef = db.collection('projects').doc()
        const jobWiseDataRef = db.collection('metadata').doc(`${user.companyName.split(' ').join('_')}_jobWiseData`)

         const userDetail = {
            email: user.email,
            name:user.name
        }
        const start_date = admin.firestore.FieldValue.serverTimestamp()
        const twoDaysInSeconds = 2 * 24 * 60 * 60; // 2 days in seconds
        const date = new Date();
        date.setSeconds(date.getSeconds() + twoDaysInSeconds);
        const end_date = admin.firestore.Timestamp.fromDate(date);

        

        const projectData = {
            name,
            department,
            totalCost:Number(totalCost),
            createdAt: start_date,
            end_date,
            description:description?description:'',
            userId:user.id,
            user: userDetail,
            companyId: user?.companyId,
            companyName: user?.companyName,
            status: "In Progress",
        }

        // Transaction to Update the billed amount of user to add Project and associated work with it and to update JobWiseData
        await db.runTransaction(async(transaction)=>{
            const amount = Number(totalCost)
            const jobWiseDataExists = (await transaction.get(jobWiseDataRef)).exists

            transaction.update(userRef,{totalBilledAmount:admin.firestore.FieldValue.increment(amount)})
            
            transaction.set(projectRef,projectData)

            const projectId = projectRef.id
            const worksData = getWorksData(works,projectId,name)

            worksData.forEach((work) =>{
                const workRef = db.collection('works').doc();
                transaction.set(workRef,{...work})
            })

            const jobWiseData = formatJobWiseData(works)

            if(jobWiseDataExists){
                for(const field in jobWiseData){
                    const val = Number(jobWiseData[field])

                    transaction.update(jobWiseDataRef, {
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

        let projectQuery = projectRef.where('userId', '==', user.id).orderBy('createdAt','desc');
       
        const projectSnapshot = await projectQuery.get()
        
        const projects = projectSnapshot.docs.map((doc) =>{
            const id = doc.id
            const projectDoc = doc.data();
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
                name: projectDoc?.name,
                userId: projectDoc?.user?.email,
                start_date,
                end_date,
                status: projectDoc?.status
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

