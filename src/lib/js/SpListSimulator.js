const list = {
    create: obj => new Promise(resolve=>{
        setTimeout(()=>{
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
    setValue = v => { this.value = v; console.log(`set value of ${this.dataName}: `, this.value) }
}

const SpListSimulator = async properties => {
    let listObj = {};
    properties.forEach(element => {
        listObj[element.dataName] = element;
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

    return listObj;
}

export default SpListSimulator;