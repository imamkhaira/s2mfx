/**
 * Generates a Column() function call for every column in a a given list.
 * requires sprLib version 1.8.0 and above.
 * @date 2019-12-19
 * @param {String} listname name of the list
 * @param {String} listUrl (null) URL of the site that contains the list.
 */
async function GenerateColumn(listname, listUrl=null) {
    const { sprLib } = window;
    const { webServerRelativeUrl } = window._spPageContextInfo;
    const columns = await sprLib.list({
        name: listname,
        baseUrl: listUrl || webServerRelativeUrl
    }).cols();

    console.table(columns);
    let print = columns.map( column => {
        let { dataName, dispName, choiceValues, isReadOnly } = column;
        if (choiceValues) {
            choiceValues = choiceValues.map(element=>`"${element}"`);
        }
        if (!isReadOnly) return (`Column("${dataName}", "${dispName}"${choiceValues ? `, [${choiceValues}]`: ""}),`);
    });
    console.log(print);
}

//usage 


/* 
== How to use?==

1. create an empty page in the sharepoint site.
2. add a Script Editor web part (SEWP).
3. edit the content of the SEWP,
4. create empty <script></script> tag
5. put the content of MicrosoftAjax.js inside the script tag you just created.
6. save and reload the page, then press F12.
7. copy paste all of this file into chrome console.
8. Call GenerateDataColumn("List Name"), like so:
    GenerateColumn("Proposal Pre-Screening")
9. profit.
10. you can also use a CDN to load sprLib.

*/