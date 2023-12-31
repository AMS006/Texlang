const xlsx = require('xlsx');
const {filesize} = require('filesize')
const PDFParser = require('pdf-parse')
const WordExtractor = require('word-extractor');
const textract = require('textract');
const { db } = require('../../firebase');

const countWords = async(file) =>{
    if (file.mimetype === 'application/pdf') {
       try {
            const pdfData = await PDFParser(file.buffer);
            const text = pdfData.text;
            const wordCount = text.split(/\s+/).length;
            
            return wordCount;
       } catch (error) {
            console.log("An Error Occured",error?.message)
            throw new Error("Something went wrong")
       }
    }
    else if(file.mimetype === 'application/msword' || file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'){
        try {
            const extractor = new WordExtractor();
            const extracted = await extractor.extract(file.buffer);
            
            const text = extracted.getBody()
            
            const wordCount = text.split(/\s+/).length;
           
            return wordCount;
        } catch (error) {
            console.log("An Error Occured",error?.message)
            throw new Error("Something went wrong")
        }
    }
    else if(file.mimetype === 'text/csv' ||
            file.mimetype === 'application/vnd.ms-excel' || 
            file.mimetype === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'){
        
        const workbook = xlsx.read(file.buffer, { type: 'buffer' });
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        let wordCount = 0;

        for (const cellAddress in sheet) {
            const cell = sheet[cellAddress];
            if (cell.v) {
                let text = "" +cell.v;
                wordCount += text.split(/\s+/).length;
            }
        }
        return wordCount;
    }
    else if(file.mimetype === 'text/plain'){
        const text = file.buffer.toString('utf8');
        const wordCount = text.split(/\s+/).length;
        return wordCount;
    }
    else if(file.mimetype === 'application/vnd.ms-powerpoint' || file.mimetype === 'application/vnd.openxmlformats-officedocument.presentationml.presentation'){
        return new Promise((resolve, reject) => {
            textract.fromBufferWithMime(file.mimetype, file.buffer, (err, text) => {
                if (err) {
                    reject(err);
                } else {
                    const wordCount = text.split(/\s+/).length;
                    resolve(wordCount);
                }
            });
        });
    }else{
        return 0;
    }
}
exports.uploadWork = async(req,res) =>{
    try {
        const file = req.file;
        const user = req.user;
        if(!user){
            return res.status(401).json({message:"Unauthorized"})
        }
        if (!file) {
            return res.status(400).send('No file uploaded');
        }
        const mimetype = file.mimetype;
        let value = 0, wordCount = 0;
        if(mimetype.startsWith('image')){
            value = 1;
        }

        else if(mimetype.startsWith('video') || mimetype.startsWith('audio')){
            value = req.body?.value
        }
        else{
            wordCount = await countWords(file)
        }
        const remoteFileName = `${user.companyName.split(' ').join('_')}/${user.id}/${req.body.timeStamp}/${req.body.name}`;

 
        const fileName = file.originalname;
        let size = filesize(file.size, { base: 2, standard: "jedec" });
        let format = fileName.split('.').pop()
       
        
        res.status(200).json({ 
                filePath:remoteFileName, 
                name:req.body.name,
                wordCount,
                value,
                size,
                format,
                sourceLanguage:"English",
                targetLanguage:[],
                contentType:"translation"
            });

    } catch (error) {
        console.log("Upload Work : ", error.message)
        return res.status(500).json({message:"Something went wrong"})
    }
}
exports.getWorksData = async(works,projectId,projectName,companyId) =>{
  
    const worksData = []
    const languageRate = db.collection('metadata').doc(`${companyId}_languageRates`)
    const languageRateData = (await languageRate.get()).data()
    console.log(languageRateData)
    works.forEach( (work) => {

        let cost = 0;
        let sourceLanguage = String(work.sourceLanguage).toLowerCase();
        let wordCount = Number(work.wordCount);

        work.targetLanguage.forEach((language) =>{
            let targetLanguage = String(language.lang).toLowerCase()
            if(languageRateData && languageRateData.hasOwnProperty(`${sourceLanguage}-${targetLanguage}`)){
                if(wordCount > 0)
                    cost += (languageRateData[`${sourceLanguage}-${targetLanguage}`] * wordCount)
                else
                    cost += (languageRateData[`${sourceLanguage}-${targetLanguage}`] * work.value)
            }
            else{
                work.wordCount > 0 ? cost += (3 * wordCount) :
                cost += (3 * work.value)
            }
        })
        
        worksData.push({
            ...work,
            cost:Number(cost),
            projectId,
            projectName:projectName,
            approvalStatus:"Yes",
            currentStatus:"In Progress"
        })
    })
    
    return worksData
}
exports.formatJobWiseData = (works) =>{
    const jobWiseData = {}

    works.forEach((work) =>{
        if(jobWiseData.hasOwnProperty(work.contentType)){
            jobWiseData[work.contentType] += 1;
        }else{
            jobWiseData[work.contentType] = 1;
        }
    })
    return jobWiseData;
}
exports.addComment = async(req,res) =>{
    try {
        const {id} = req.params
        const {comment} = req.body
        if(!comment || comment.length === 0)
            return res.status(400).json({message:'Invalid Request'})
        if(!id)
            return res.status(400).json({message:"Invalid Request"})

        const workRef =  db.collection('works').doc(id)

        const workData = (await workRef.get()).data()

        let comments = []
        if(workData?.comments && workData?.comments?.length>0){
            comments = [...workData.comments,comment]
        }else{
            comments = [comment]
        }

        await workRef.update({comments})

        return res.status(200).json({message:"Comment Added"})
        
    } catch (error) {
         console.log("Add Comment : ", error.message)
        return res.status(500).json({message:"Something went wrong"})
    }
}

