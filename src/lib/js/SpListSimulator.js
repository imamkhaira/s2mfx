class SpListSimulator{
    constructor(GUID = ["id", "firstName", "lastName"]){
        this.list = GUID;
        this.cols = {};
        SpListSimulator.currentUser = {id: 0, LoginName: 'the.batman', Title: 'The Dark Knight', Email: 'batman@gotham.gov', IsSiteAdmin: true};
        GUID.forEach(item => {
            const obj = {
                dataName: item,
                value: null,
                setValue: (v)=>{obj.value = String(v)}
            };
            this.cols[item] = obj;
        });        
    }

    printInfo(){
        console.table(this.cols);
    }

    submitAction = () =>{
        let values = {};
        for (const key in this.cols) {
            if (this.cols[key].value) values[key] = this.cols[key].value;
        };
        alert(`Submit Successfull`);
        console.log('Successfully sumbitted following data:');
        console.log(values);   
    }
}

export default SpListSimulator;