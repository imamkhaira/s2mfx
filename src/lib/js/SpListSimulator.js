const list = {
    create: obj => new Promise(resolve=>{
        setTimeout(()=>{
            console.log("success submit");
            resolve(obj);
        }, 600);
    })
}

export class DataObj {
    constructor(dataName, dispName = undefined, choiceValues = undefined, value = undefined){
        this.dataName = dataName;
        this.dispName = dispName;
        this.choiceValues = choiceValues;
        this.value = value;
    }
    setValue = v => { this.value = v }
}

const SpListSimulator = async properties => {
    let listObj = {};
    properties.forEach(element => {
        listObj[element.dataName] = element;
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

    return listObj;
}

export default SpListSimulator;