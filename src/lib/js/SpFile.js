const sprLib = window.sprLib;
const sp = window.SP;

export const SpFileWriter = async (address, prefix = undefined)=>{
    let folder = {};
    
    if (sp) {
        folder = sprLib.folder(address);
    } else {
        folder.upload = async (data) => Promise.resolve(data);
        folder.files = async() => Promise.resolve("lets pretend that the folder exists");
    }

    const uploadObj = {
        prefix: prefix ? `${prefix}_` : "",
        name: undefined,
        data: undefined,
        setName: (n) => {
            uploadObj.name = `${uploadObj.prefix}${n}`;
            sp || console.log("name:", uploadObj.name);
        },
        setData: (d) => {
            uploadObj.data = d;
            sp || console.log("data:", uploadObj.data);
        }
    }

    folder.uploadObj = uploadObj;
    folder.submitAction = async(data = undefined) => {
        try {
            const result = await folder.upload(data || {
                name: uploadObj.name,
                data: uploadObj.data,
                overwrite: true 
            });
            return Promise.resolve(result);
        } catch (error) {
            return Promise.reject(error);
        }
    }

    try {
        await folder.files();
        return Promise.resolve(folder);
    } catch (error) {
        console.error("wrong url blyat");
        return Promise.reject(error);
    }
}
