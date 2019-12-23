// SpSite.js - a JavaScript interface to SharePoint site
// created 2019/19/12 by batman

const sprLib = window.sprLib || {baseUrl: ()=>null};
const { webServerRelativeUrl, userId, userLoginName, userEmail, userDisplayName } = window._spPageContextInfo || {};
const sp = window.SP ? true : false;


/* ==================================== Column ========================================== */
/* ====================================================================================== */


/**
 * Define a column in a SharePoint List.
 * @date 2019-12-19
 * @param {String} dataName OData-style name of the column
 * @param {String} dispName display name of the column
 * @param {Array} choiceValues=null
 * @returns {Object} a Column Object
 */
export function Column (dataName, dispName, choiceValues=null) {
    return {
        dataName: dataName,
        dispName: dispName,
        isReadOnly: false,
        choiceValues: choiceValues
    };
}


/* ==================================== SPList ========================================== */
/* ====================================================================================== */


/**
 * Create an interface to connect to SharePoint List
 * @date 2019-12-19
 * @param {String} listName Name of the list in SharePoint
 * @param {String} url (siteAbsoluteUrl) the url of the site/subsite
 * @param {Array} dataObjects (null) an array of Column objects
 * @returns {Promise}
 */
async function SpList(varName, listName, dataObjects=[], url) {
    let columns = {};
    let list = {};
    let cols = {};

    // if sharepoint is detected, load real list and current user information.
    // if not in sharepoint, create fake objects that imitates list function and user data.
    if (sp){
        try {
            list = sprLib.list({ name: listName, baseUrl: url });
            cols = await list.cols();
        } catch (error) {
            return Promise.reject(`CANNOT FIND LIST ${listName}`);
        };
    } else {
        list = {
            cols: async () => Promise.resolve(dataObjects),
            create: async (data) => { console.log(`Submit ${listName}:`, data); return Promise.resolve(data); },
        };
        cols = await list.cols();
    }
    
    // maps each Column object from Sharepoint
    // then give it a value & setValue properties
    cols.forEach( (column) => {
        if (!column.isReadOnly) {
            column.value = undefined;
            column.setValue = (value) => {
                column.value = value;
                if (!sp) console.log(column.value);
            };
            columns[column.dataName] = column;
        }
        
    });

    // find a row that matches the filter param
    columns.find = async (filter, queryOrderby=undefined, queryLimit=undefined) => {
        try {
            let result = await list.items({
                queryFilter: filter,
                queryOrderby,
                queryLimit
            });
            return Promise.resolve(result);
        } catch (err) {
            console.error("CANNOT FOUND");
            return Promise.reject(err);
        }
    };

    // update a row that matches the id param with the data param
    columns.update = async (id, data) => {
        try {
            let result = await list.update({ ID: id, ...data });
            return Promise.resolve(result);
        } catch (err) {
            console.error("CANNOT UPDATE");
            return Promise.reject(err);
        }
    }

    columns.submitAction = async () => {
        let toSubmit = {};
        
        for (const dataName in columns) {
            if (typeof(columns[dataName]) === "object") {
                if (columns[dataName].value) toSubmit[dataName] = columns[dataName].value;
            }
            
        }
        try {
            if (columns.tabulator) {
                let temp = [];

                for (const row of columns.tabulator) {
                    let toSubmit = {};

                    for (const dataName in row) {
                        if (row[dataName].hasOwnProperty("value")){
                            const {value} = row[dataName];
                            if (value) toSubmit[dataName] = value;
                        }
                    }
                    if (Object.keys(toSubmit).length > 1) {
                        if (!sp) console.log("Tosubmit Length: ", Object.keys(toSubmit).length);
                        temp.push( list.create(toSubmit) );
                    }
                    
                    
                }
                return Promise.all(temp);

            } else {
                let result = await list.create(toSubmit);
                return Promise.resolve(result);
            }
        } catch (err) {
            console.error("CANNOT CREATE LIST ITEM");
            return Promise.reject(err);
        }
    };
    
    columns.tabulator = undefined;
    columns.varName = varName;
    return Promise.resolve(columns);
}


/* ===================================== SPFile ========================================== */
/* ======================================================================================= */


/**
 * create an interface to connect to sharepoint document library
 * @date 2019-12-20
 * @param {String} varName a global variable name to be assigned
 * @param {String} address relative url of the folder
 * @param {String} prefix (undefined) the prefix to be added to uploaded file name
 * @returns {any}
 */
async function SpFile(varName, address, prefix) {
    let spFolder = undefined;

    if (sp) {
        try{
            spFolder = sprLib.folder(String(address));
            await spFolder.info();
        } catch (err) {
            console.error("CANNOT OPEN FOLDER");
            return Promise.reject(err);
        }
    } else {
        spFolder = {
            upload: async (filedata) => { console.log(`Submit Folder ${varName}:`, filedata); return Promise.resolve(filedata);},
            info: async () => Promise.resolve("Pretending that the folder exist")
        }
    };

    let createFile = {
        name: undefined,
        data: undefined,
        overwrite: true 
    };

    spFolder.setName = (name) => {
        createFile.name = prefix ? `${prefix}_${name}`: name;
        if (!sp) console.log(createFile.name);
    };

    spFolder.setData = (data) => {
        createFile.data = data
        if (!sp) console.log(createFile.data);
    };
    
    spFolder.submitAction = async () => {
        if (createFile.data) {
            try {
                let result = await spFolder.upload(createFile);
                return Promise.resolve(result);
            } catch (err) {
                console.error("CANNOT UPLOAD FILE");
                return Promise.reject(err);
            }
        } else {
            return Promise.resolve("-no file selected-");
        }
    };

    spFolder.createFile = createFile;
    spFolder.varName = varName;
    return Promise.resolve(spFolder);
}


/* ==================================== SPSite ========================================== */
/* ====================================================================================== */


class SpSite {
    constructor(url=webServerRelativeUrl){
        this.listPromises = [];
        this.url = url;
        sprLib.baseUrl(this.url);
        
        window.user = {
            id: userId || 6969,
            loginName: userLoginName || "the.batman",
            email: userEmail || "batman@gotham.gov",
            dispName: userDisplayName || "The Batman"
        };
        window.SPSite = {};
    }
    
    loadList(varName, listName, dataObjects){
        return this.listPromises.push( SpList(varName, listName, dataObjects, this.url) );
    }

    loadFolder(varName, address, prefix=undefined){
        return this.listPromises.push( SpFile(varName, address, prefix) );
    }

    async ready(){
        try {
            let result = await Promise.all(this.listPromises);
            result.forEach( (list) =>{
                window.SPSite[list.varName] = list;
            })
            return Promise.resolve(result);
        } catch (err) {
            console.error("FAILED TO COMMUNICATE WITH SHAREPOINT SERVER");
            return Promise.reject(err);
        }
    }

}

export default SpSite;
