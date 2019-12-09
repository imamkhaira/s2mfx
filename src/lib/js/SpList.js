const sprLib = window.sprLib;

const SpList = async GUID => {
    const list = sprLib.list(GUID);
    let columns = await list.cols();
    let listObj = {};
    columns.forEach(column => {
        column.value = null;
        column.setValue = newValue => { column.value = newValue;};
        listObj[column.dataName] = column;
    });

    listObj.submitAction = async () => {
        let result = {};
        if (listObj.tabulator){
            for (const rows of listObj.tabulator) {
                let toSubmit = {};
                for (const key in rows) {
                    if (rows[key].value) {
                        toSubmit[key] = rows[key].value;
                    }
                }
                result = await list.create(toSubmit);
                console.log(result);
            }
            return Promise.resolve(result);
        }
        else {
            let toSubmit = {};
            for (const key in listObj) {
                if (!listObj[key].isReadOnly && listObj[key].value) {
                    toSubmit[key] = listObj[key].value;
                }
            }
            try {
                result = await list.create(toSubmit);
                console.log(`SUCCESS submit with message:`, result);
                return Promise.resolve(result);
            } catch (error) {
                alert("failed to submit, check message");
                console.error(`failed to submit:`, error);
                return Promise.reject(result);
            }
        }
    }

    listObj.generateDataObj = () =>{
        let dataname = [];
        let dataObj = [];
        columns.forEach(element=>{
            const {dataName, dispName, choiceValues} = element;
            dataname.push(element.dataName);
            dataObj.push(`new DataObj("${dataName}", "${dispName}"), ${choiceValues ? `//choice   ` : ''}`);
        });
        console.table(columns);
        console.log(dataname);
        console.log(dataObj);
    }

    return listObj;
}

// sprLib.baseUrl('/PDS/');
// const b = await SpList("a07c5f04-151f-4b39-ba21-6e392c4903b1");
export default SpList;