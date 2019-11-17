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

    listObj.submitAction = async () => {
        let toSubmit = {};
        for (const key in listObj) {
            if (listObj[key].value) {
                toSubmit[key] = listObj[key].value;
                
            }
        }
        alert('submit success');
        console.log("submitted the following: ");
        console.log(toSubmit);
    }

    return listObj;
}

export default SpListSimulator;