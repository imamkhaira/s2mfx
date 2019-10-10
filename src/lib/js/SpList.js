//const sprLib = window.sprlib;

class SpList {
    constructor(GUID){
        this.list = sprLib.list(GUID);
        this.cols = {};
        this.list.cols().then(cols=>{
            cols.forEach(col => {
                col.value = null;
                col.setValue = (value)=>{ col.value = value };
                this.cols[col.dataName] = col;
            });
            this.list.info().then(info=>{
                for (const key in info) this[key] = info[key];
                console.log(`list ${this.Title} is redy.`)
            });
            SpList.currentUser = SpList.currentUser || sprLib.user().info().then(user=>{ SpList.currentUser = user});
        }).catch(err=>console.log(err));
    }

    printInfo(){
        console.log(`Title: ${this.Title}, GUID: ${this.Id}, No. of items: ${this.ItemCount}`);
        console.table(this.cols, ['dispName', 'isRequired', 'dataType', 'choiceValues']);
    }

    submitAction(){
        let values = {};
        for (const key in this.cols) {
            if (this.cols[key].value) values[key] = this.cols[key].value;
        };
        console.log(values);
        this.list.create(values).then(resp=>{
            alert(`Submit Successfull`);
            console.log('Successfully sumbitted following data:');
            console.table([resp]);
        }).catch(resp=>{
            alert(`Submit failed`);
            console.log('Submit failed');
            console.log(resp);
        })
    }
}

const b = new SpList('bc83b8cb-9335-4f74-88ed-7961872b52b1');