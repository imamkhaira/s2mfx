const sprLib = window.sprLib;
// sprLib.baseUrl("/PDS/");

const SpList = async GUID => {
    const list = sprLib.list(GUID);
    let columns = await list.cols();
    let listObj = {};
    columns.forEach(column => {
        column.value = undefined;
        column.setValue = newValue => { column.value = newValue; console.log(column.value); }
        listObj[column.dataName] = column;
    });

    listObj.submitAction = () =>{
        let toSubmit = {};
        for (const key in listObj) {
            if (listObj[key].maxLength && !listObj[key].isReadOnly) {
                toSubmit[key] = listObj[key].value;
            }
        }
        list.create(toSubmit).then(result=>{
            alert(`Submitted successfully `);
            console.log(`SUCCESS submit with message: ${result} `);
            return true;
        })
        .catch(e=>{
            alert(`submit failed: ${e}`);
            console.error(`failed to submit: ${e}`);
            return false;
        });
    }
    return listObj;
}

const getDataName = () =>{

}

// const b = await SpList("99bb42f1-e5ca-46de-8f40-63499c445fc6");
export default SpList;