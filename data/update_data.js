const fs = require('fs');
optionsList = [
    "https://www.nih.gov/sites/default/files/news-events/research-matters/2017/20170502-eye.jpg",
    "https://www.centerforeyecare.com/wp-content/uploads/2017/04/diabetic-eye-exam.jpg",
    "https://www.physiciansweekly.com/wp-content/uploads/2019/05/a-retina-with-severe-non-proliferative-diabetic-retinopathy.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSF8NJJvv8v3PZ47TSTQXJKksOFJX6ZcF2l1ZBJECiPIH0YkN_s5I7CFLCmHGn78HjN574&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRz2MhMb6LkaBaRhjF3wjrzU8_ASBC8mW7r3tFdRTSvKEH3nPtQ8rH2qQP-RrgRhcKqcA&usqp=CAU",
    "https://media.istockphoto.com/id/530338547/photo/retina-of-diabetic-diabetic-retinophaty.jpg?s=612x612&w=0&k=20&c=BtAqsIDMmSaQFymMrCggRGECP3Y7xObbiBh8dxbzQOg=",
    "https://d2jx2rerrg6sh3.cloudfront.net/image-handler/picture/2017/1/Retinal_Image_of_diabetic_retinpathy_-_Santibhavank_P_89eadd4c14f94269a80a3675124bfbf2-620x480.jpg",
    "https://img.medscapestatic.com/pi/meds/ckb/10/31110tn.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT47t5HvT15n48uyzF8Iy6T3AmwwrZeUoA6S0UUU85NSdixz0Xnhkwsy8mPS1zCp9PXVyU&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNoJKOna4caX9yPG7xHcD5BMm176JhD70TDswhS02T1HroGcpNpctkWwH2Q6BTGWgRdDg&usqp=CAU",
    "https://www.eyephysiciansoflancaster.com/wp-content/uploads/2013/12/diabetic-retinopathy.jpg",
    "https://www.thelancet.com/cms/attachment/1c0db906-6d8b-4d8a-9651-8549a05d3fe5/fx1_lrg.jpg",
    "https://www.verywellhealth.com/thmb/squOtUFELBZBC4j0Jf6mwgH17F4=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-509686269-94dfdb40e429405ba1af44c01e4140a9.jpg",
    "https://d2jx2rerrg6sh3.cloudfront.net/image-handler/picture/2017/1/Retinal_Image_of_diabetic_retinpathy_-_Santibhavank_P_89eadd4c14f94269a80a3675124bfbf2-620x480.jpg",
    "https://www.reviewofoptometry.com/CMSImagesContent/2019/05/DR1.jpg",
    "https://img.medscapestatic.com/pi/meds/ckb/17/31117tn.jpg",
    "https://www.clinicaladvisor.com/wp-content/uploads/sites/11/2019/02/diabeticretinopathyg50968626_1359822.png",
    "https://d31g6oeq0bzej7.cloudfront.net/Assets/image/jpeg/4c18115e-b288-433b-98dc-a55fbbe30516.jpg",
    "https://media.springernature.com/lw685/springer-static/image/chp%3A10.1007%2F978-3-319-20460-4_58/MediaObjects/332944_1_En_58_Fig1_HTML.jpg",
    "https://www.ncbi.nlm.nih.gov/books/NBK278967/bin/diab-retinopathy-Image004.jpg",
    "https://eyerounds.org/tutorials/Diabetic-Retinopathy-Med-Students/smaller/pdr2.jpg",
    "https://www.nih.gov/sites/default/files/news-events/research-matters/2017/20170502-eye.jpg",
    "https://www.ncbi.nlm.nih.gov/books/NBK278967/bin/diab-retinopathy-Image001.jpg",
    "https://decisionmakerplus.net/wp-content/uploads/DG3620703.jpg",
    "https://decisionmakerplus.net/wp-content/uploads/CR7Pic16.jpg",
    "https://d31g6oeq0bzej7.cloudfront.net/Assets/image/jpeg/4c18115e-b288-433b-98dc-a55fbbe30516.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLwJlU0DmKmpnKFac8Tz2tYKYowUNCsI9G-k9-9B_q04Sx6ptoClFxo7LSozWQf2PDuOY&usqp=CAU",
    "https://www.iowaretina.com/wp-content/uploads/2017/02/pdr__prh_1-300x192.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_5NpQXM5JFrABrKcnY5TUKEvZRRXFWcWNVoNsIrbZUXV3VRGKMmfvEROMhNNNXSjLuYQ&usqp=CAU",
    "https://www.theoptometrygroup.net/uploads/1/7/1/5/17159106/published/ret.jpg?1602255176",
    "https://images.squarespace-cdn.com/content/v1/5aaaa26d3c3a53488b6e70d9/1521500608182-DBQW2XP02WEIPSJDJ4B9/diabetic-retinopathy_420.jpg",
    "https://www.pennmedicine.org/-/media/academic%20departments/ophthalmology/summer%202020/maguire%20dr%20treatment_teaser.ashx?mw=620&mh=408",
    "https://d2jx2rerrg6sh3.cloudfront.net/image-handler/picture/2017/1/Retinal_Image_of_diabetic_retinpathy_-_Santibhavank_P_89eadd4c14f94269a80a3675124bfbf2-620x480.jpg",
    "https://www.northsuburbaneye.com/wp-content/uploads/2019/05/iStock-530338547.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwewot0Ig5FYVQUH2tfmzrEz-fdkFYxgDUEA&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQY-a-a68xNmwyb045s2n88jZEOyUkBwz7aOMte2DMRfkjP5s6-r10IcSN389gV-kMA2pA&usqp=CAU",
    "https://www.corkeyeclinic.ie/files/UserFiles/PRP.jpg",
    "https://static.wixstatic.com/media/f8668d_b3cfdcba197448c9b5e9654c66ab103d~mv2.jpg/v1/fill/w_1016,h_883,al_c/f8668d_b3cfdcba197448c9b5e9654c66ab103d~mv2.jpg",
    "https://images.ctfassets.net/x0s5vw77vftn/6iQ1N5nJcfXIhAI5QeL8y/52070f2019f4d8d7daa05ecc841caf87/ASRS-RIB-Image-5343.jpg"


]
// optionsList = [
//     "No Glaucoma", "No Glaucoma", "No Glaucoma", "No Glaucoma", "No Glaucoma", "No Glaucoma", "No Glaucoma", "No Glaucoma", "Suspected Glaucoma", "Suspected Glaucoma", "Suspected Glaucoma", "No Glaucoma", "No Glaucoma", "No Glaucoma", "No Glaucoma", "No Glaucoma", "No Glaucoma", "No Glaucoma", "No Glaucoma", "Suspected Glaucoma", "Suspected Glaucoma", "Suspected Glaucoma",
//     "No Glaucoma", "No Glaucoma", "No Glaucoma", "No Glaucoma", "No Glaucoma", "No Glaucoma", "No Glaucoma", "No Glaucoma", "Suspected Glaucoma", "Suspected Glaucoma", "Suspected Glaucoma", "No Glaucoma", "No Glaucoma", "No Glaucoma", "No Glaucoma", "No Glaucoma", "No Glaucoma"
// ]
// optionsList = [
//     "Good", "Bad", "Good", "Good", "Good", "Good", "Good", "Bad", "Bad", "Bad", "Bad", "Bad", "Good", "Bad", "Good", "Bad",
//     "Good", "Bad", "Good", "Good", "Good", "Good", "Good", "Bad", "Bad", "Bad", "Bad", "Bad", "Good", "Bad", "Good", "Bad",
//     "Good", "Bad", "Good", "Good", "Good", "Good", "Good"
// ]

fs.readFile('eyes-data.json', 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading JSON file:', err);
        return;
    }

    try {
        const jsonData = JSON.parse(data);

        // Proceed with the next steps using the `jsonData` variable
        const updatedData = jsonData.map((obj, index) => {
            // ... Perform the necessary updates on each object
            const updatedObj = { ...obj }; // Create a copy of the original object

            // Update the "option" field with the corresponding element from the list
            updatedObj['URL'] = optionsList[index];

            // Perform other modifications or updates to the object as needed

            return updatedObj;
        });

        // Write the updated data to a new JSON file using fs.writeFile
        // ...
        // Assuming you have the updatedData array from the previous step

        const updatedDataJSON = JSON.stringify(updatedData, null, 2);

        fs.writeFile('eyes-data.json', updatedDataJSON, 'utf8', (err) => {
            if (err) {
                console.error('Error writing JSON file:', err);
            } else {
                console.log('Updated data saved to updatedData.json');
            }
        });

    } catch (error) {
        console.error('Error parsing JSON:', error);
    }
});




