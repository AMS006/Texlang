const { db } = require("../../../firebase");

exports.getAllProjects = async (req, res) => {
    try {
        const user = req.user;
        if (!user) return res.status(400).json({ message: "Invalid Request" });

        const projectCollection = db.collection('projects');

        let projectQuery = projectCollection.orderBy('createdAt','desc');

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
                customer: data?.user?.email,
                start_date: date,
                end_date: end_date,
                status: data.status
            };
        });
        return res.status(200).json({ projects });
    } catch (error) {
        console.log("Get Projects Error: ", error.message);
        return res.status(500).json({ message: "Something went wrong" });
    }
};

exports.getLatestProject = async (req, res) => {
    try {
        const user = req.user;
        if (!user) return res.status(400).json({ message: "Invalid Request" });

        const projectCollection = db.collection('projects');

        let projectQuery = projectCollection.orderBy('createdAt','desc').limit(5);

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
        console.log("Get Projects Error: ", error.message);
        return res.status(500).json({ message: "Something went wrong" });
    }
};

