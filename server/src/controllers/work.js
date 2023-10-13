const { bucket } = require('../../firebase');
const {filesize} = require('filesize')
const textract = require('textract')
const PDFParser = require('pdf-parse');
const xlsx = require('xlsx');
const WordExtractor = require('word-extractor')



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
    else if(file.mimetype === 'application/msword'){
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
    else{
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
    }
}
exports.uploadWork = async(req,res) =>{
    try {
        const file = req.file;
        if (!file) {
            return res.status(400).send('No file uploaded');
        }
        const mimetype = file.mimetype
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
        // console.log(value)
        const remoteFileName = `works/${req.body.name}`;
        // const fileUpload = bucket.file(remoteFileName);

        // const blobStream = fileUpload.createWriteStream({
        // metadata: {
        //     contentType: file.mimetype,
        // },
        // });

        // blobStream.on('error', (error) => {
        // console.error('Error uploading file:', error?.message);
        // res.status(500).send('File upload error.');
        // });

        // blobStream.on('finish', async() => {

 
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
        // });

        // blobStream.end(file.buffer);
    } catch (error) {
        console.log("Upload Work : ", error.message)
        return res.status(500).json({message:"Something went wrong"})
    }
}

