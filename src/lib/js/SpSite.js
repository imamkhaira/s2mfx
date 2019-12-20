// SpSite.js - a JavaScript interface to SharePoint site
// created 2019/19/12 by batman

const sprLib = window.sprLib || {baseUrl: ()=>null};
const { webServerRelativeUrl, userId, userLoginName, userEmail, userDisplayName } = window._spPageContextInfo || {};
const sp = window.SP ? true : false;


/* ==================================== Column ========================================== */


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


/**
 * Create an interface to connect to SharePoint List
 * @date 2019-12-19
 * @param {String} listName Name of the list in SharePoint
 * @param {String} url (siteAbsoluteUrl) the url of the site/subsite
 * @param {Array} dataObjects (null) an array of Column objects
 * @returns {Promise}
 */
export async function SpList(varName, listName, dataObjects=[], url=webServerRelativeUrl) {
    let [ columns, list, cols ] = [ {}, {}, undefined ];

    columns.tabulator = undefined;

    if (sp){
        // if sharepoint is detected, load real list and current user information
        list = sprLib.list({
            name: listName,
            baseUrl: url,
        });
        window.user = {
            id: userId,
            loginName: userLoginName,
            email: userEmail,
            dispName: userDisplayName
        };
    } else {
        // if not in sharepoint, create fake objects that imitates list function and user data.
        list = {
            cols: () => Promise.resolve(dataObjects),
            create: (data) => Promise.resolve(data)
        };
        window.user = {
            id: 6969,
            loginName: "BROMELAYU\\batman",
            email: "bromelayu@mail.com",
            dispName: "The Batman"
        };
    }

    try {
        // try to get the columns, if the list exist
        cols = await list.cols();
    } catch (error) {
        // if list not exist, exit function immediately
        return Promise.reject(`CANNOT FIND LIST ${listName}`);
    };

    // maps each Column object from Sharepoint
    // then give it a value & setValue properties
    cols.forEach( (column) => {
        const { isReadOnly } = column;
        column.value = undefined;
        column.setValue = (value) => {
            column.value = value;
            if (sp) console.log(column.value);
        };
        if (!isReadOnly) columns[column.dataName] = column;
    });

    /**
     * find a row in a list that mathced the filter.
     * @date 2019-12-19
     * @param {String} filter OData-style filter. MUST USE ``
     * @param {String} queryOrderby (undefined) column to order the query result
     * @param {Number} queryLimit (undefined) limit of result to be returned
     * @returns {Array} array containing the result
     */
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

    /**
     * update a record with ID that matches the supplied ID
     * @date 2019-12-19
     * @param {String} id the id of the row to be updated
     * @param {Object} data an object with at least one dataName: value prop
     * @returns {Object} updated Column item
     */
    columns.update = async (id, data) => {
        try {
            let result = await list.update({ ID: id, ...data });
            return Promise.resolve(result);
        } catch (err) {
            console.error("CANNOT UPDATE");
            return Promise.reject(err);
        }
    }

    /**
     * submit every data in this object property to SharePoint
     * @date 2019-12-19
     * @returns {Promise} success, failed
     */
    columns.submitAction = async () => {
        let toSubmit = {};
        if (columns.tabulator){
            columns.tabulator.forEach( row => {
                
            });
        }

        for (const dataName in columns) {
            let { value } = columns[dataName];
            if (value) toSubmit[dataName] = columns[dataName].value;
        }

        try {
            let result = await list.create(toSubmit);
            console.log("SUCCESSFULLY SUBMITTED");
            return Promise.resolve(result);
        } catch (err) {
            console.error("FAILED SUBMITTED");
            return Promise.reject(err);
        }
    };
    
    columns.varName = varName;
    return Promise.resolve(columns);
}


/* ==================================== SPFile ========================================== */


/**
 * create ain interface to connect to sharepoint document library
 * @date 2019-12-20
 * @param {String} varName a global variable name to be assigned
 * @param {String} address relative url of the folder
 * @param {String} prefix (undefined) the prefix to be added to uploaded file name
 * @returns {any}
 */
export async function SpFile(varName, address, prefix = undefined) {
    let spFolder = {};

    if (sp) {
        spFolder = sprLib.folder(String(address));
    } else {
        spFolder = {
            upload: async (filedata) => Promise.resolve(filedata),
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
        try {
            let result = await spFolder.upload(createFile);
            return Promise.resolve(result);
        } catch (err) {
            console.error("CANNOT UPLOAD FILE");
            return Promise.reject(err);
        }
    };

    spFolder.createFile = createFile;
    spFolder.varName = varName;
    
    try{
        await spFolder.info();
        return Promise.resolve(spFolder);
    } catch (err) {
        console.error("CANNOT OPEN FOLDER");
        return Promise.reject(err);
    }
}


/* ==================================== SPSite ========================================== */


class SpSite {
    constructor(url=webServerRelativeUrl){
        window.SPSite = {};
        sprLib.baseUrl(url);
        this.listArray = undefined;
    }
    
    load(SPListArray){
        this.listArray = SPListArray;
    }

    async ready(){
        try {
            let result = await Promise.all(this.listArray);
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
