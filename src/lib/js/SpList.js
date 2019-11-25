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

    listObj.submitAction = async (doOnSuccess = undefined) => {
        if (listObj.tabulator){
            for (const rows of listObj.tabulator) {
                let toSubmit = {};
                for (const key in rows) {
                    if (rows[key].value) {
                        toSubmit[key] = rows[key].value;
                    }
                }
                const result = await list.create(toSubmit);
                console.log(result);
            }
            if (typeof(doOnSuccess)=== "function") { doOnSuccess("cek lah sendiri"); }
        }
        else {
            let toSubmit = {};
            for (const key in listObj) {
                if (!listObj[key].isReadOnly && listObj[key].value) {
                    toSubmit[key] = listObj[key].value;
                }
            }
            try {
                const result = await list.create(toSubmit);
                if (typeof(doOnSuccess)=== "function") { doOnSuccess(result); }
                console.log(`SUCCESS submit with message:`, result);
            } catch (error) {
                alert("failed to submit, check message");
                console.error(`failed to submit:`, error);
            }
        }
    }

    listObj.generateDataObj = () =>{
        let dataname = [];
        let dataObj = [];
        columns.forEach(element=>{
            dataname.push(element.dataName);
            dataObj.push(`new DataObj("${element.dataName}", "${element.dispName}"), ${element.choiceValues ? "//choices": ""}`);
        });
        console.table(columns);
        console.log(dataname);
        console.log(dataObj);
    }

    return listObj;
}

export default SpList;