import React from 'react';
import '../lib/css/flexbox.css';
import * as MS from 'office-ui-fabric-react';

window.s2mfx = {};
MS.initializeIcons();

const pallete = window.pallete || {
  one: '#818281',
  two: '#064a90',
  three: '#4778ac',
  four: '#363636',
  five: '#245f9d'
};

window.mobilecheck = function() {
  var check = false;
  // eslint-disable-next-line
  (a => {if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
  return check;
};

export const Containerbase = (props) =>{
  const style = {
    border: props.border,   //w-s-c
    background: props.bg,   //c-i-r-a-p
    margin: props.margin,   //t-r-b-l, a space around this div
    padding: props.pad      //t-r-b-l, a space inside this div
  };

  return props.children(props.style=style);
}


export const Resizeable = (func)=>{
  window.addEventListener('resize', ()=>{
    const ratio = (window.innerWidth/window.screen.width) * 100;
    switch (ratio){
      case 768:
        return 'xs';
      default:
        return 'sm';
    }
  });
}


export const Box = props => (
  // box options
  <div className={`box ${props.options}`} style={props.style} {...props} >{props.children}</div>
);


export const Row = props =>(
  <div className={`row ${props.options}`} style={props.style}>{props.children}</div>
);


export const Col = (props) => {
  return <div className={`col-xs-12 col-sm-6 ${props.options}`} style={props.style}>{props.children}</div>;
};


export const Singlecol = props => (
  <div className={`col-xs-12 ${props.options}`} style={props.style}>{props.children}</div>
)


export const Section = props => {
  const [show, setShow] = React.useState(true);
  const change = ()=>setShow(!show);
  const bordered = {
    padding: 'none',
    margin: 'none',
    border: `1px solid ${pallete.five}`,
  };
  
  const inherit = {
    color: '#ffffff',
    width: '100%',
    backgroundColor: 'inherit',
    border: 'none',
    textAlign: 'left',
    padding: 'none'
  };

  return (
    <Row style={bordered}>
      <Singlecol style={{backgroundColor: pallete.five}}>
        <MS.DefaultButton styles={{root: inherit, rootHovered: inherit, rootPressed: inherit}} onClick={change}>
        {props.label}
        </MS.DefaultButton>
      </Singlecol>
      <Singlecol style={{backgroundColor: '#ffffff'}}>
        {show && props.children}
      </Singlecol>
    </Row>
  );
}

export const Label = ({children, ...rest}) =>{
  return (<MS.Label {...rest} >{children}</MS.Label>);
};

const Binder = ({children, bindTo, varName, getter }) =>{
  const handleInput = e =>{
    let value = e.target.value;
    if (typeof(getter) === 'function') getter(value);
    if (typeof(bindTo) === 'object') bindTo.setValue(value);
    if (typeof(varName) === 'string') window.s2mfx[varName] = value;
  }

  return React.cloneElement(children, {onChange: handleInput})
}


export const Textfield = ({label, bindTo, varName, getter, ...rest}) =>{
  return (
    <Binder bindTo={bindTo} varName={varName} getter={getter} >
      <MS.TextField label={label} {...rest} />
    </Binder>
  );
}


export const Multiselect = ({label, getter, varName, bindTo, placeholder, options, ...rest}) => {
  const [selection, setSelection] = React.useState([]);
  
  const optionsArray = options.map(option=>{
    return {
      key: option.replace(/[^a-zA-Z0-9]/g, ""),
      text: option
    }
  });

  const handleInput = (event, item)=>{
    const selectedItems = [...selection];
    if (item.selected) {
      selectedItems.push(item.key); // add the option if it's checked
    } else {
      const currIndex = selectedItems.indexOf(item.key); // remove the option if it's unchecked
      if (currIndex > -1) {
        selectedItems.splice(currIndex, 1);
      }
    }
    setSelection(selectedItems);
    if (typeof(getter) === 'function') getter(selectedItems);
    if (typeof(bindTo) === 'object') bindTo.setValue(selectedItems);
    if (typeof(varName) === 'string') window.s2mfx[varName] = selectedItems;
  }

  return (
    <MS.Dropdown
      label={label}
      placeholder={placeholder || "Choose multiple..."}
      selectedKeys={selection}
      onChange={handleInput}
      multiSelect
      options={optionsArray}
      styles={{ dropdown: { width: "100%" } }}
      {...rest}
    />
  );
}


export const Dropdown = ({label, getter, varName, bindTo, placeholder, options, ...rest}) => {
  const [selection, setSelection] = React.useState();
  
  const optionsArray = options.map( option=>{
    return {
      key: option.replace(/[^a-zA-Z0-9]/g, ""),
      text: option
    }
  });

  const handleInput = (event, item)=>{
    setSelection(item);
    if (typeof(getter) === 'function') getter(item.text);
    if (typeof(bindTo) === 'object') bindTo.setValue(item.text);
    if (typeof(varName) === 'string') window.s2mfx[varName] = item.text;
  }
  return (
    <MS.Dropdown
      label={label}
      selectedKey={selection ? selection.key : undefined}
      onChange={handleInput}
      placeholder={placeholder || "Select an option..."}
      options={optionsArray}
      styles={{ dropdown: { width: "100%" } }}
      {...rest}
    />
  );
}


export const Datepicker = ({label, getter, varName, bindTo, required, formatted}) =>{
  const [date, setDate] = React.useState();

  const handleInput = e =>{
    setDate(e);
    if (typeof(getter) === 'function') getter(new Date(e));
    if (typeof(bindTo) === 'object') bindTo.setValue(new Date(e));
    if (typeof(varName) === 'string') window.s2mfx[varName] = new Date(e);
  }

  const DayPickerStrings = {
    months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    shortMonths: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    shortDays: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
    goToToday: 'Today',
    prevMonthAriaLabel: 'Previous month',
    nextMonthAriaLabel: 'Next month',
    prevYearAriaLabel: 'Previous year',
    nextYearAriaLabel: 'Next year',
    closeButtonAriaLabel: 'Close date picker',
    isRequiredErrorMessage: 'Start date is required.',
    invalidInputErrorMessage: 'Invalid date format.'
  };

  return (
    <MS.DatePicker
      label={label}
      isRequired={required}
      ariaLabel={label}
      firstDayOfWeek={MS.DayOfWeek.Sunday}
      showMonthPickerAsOverlay={window.mobilecheck()}
      strings={DayPickerStrings}
      value={date}
      onSelectDate={handleInput}
    />
  );
}



export const Radiobutton = ({label, options, bindTo, varName, getter, required, ...rest})=>{
  const optionsArray = options.map(option=>{
    return {
      key: option.replace(/[^a-zA-Z0-9]/g, ""),
      text: option
    }
  });

  const handleInput =(event, selection) =>{
    if (typeof(getter) === 'function') getter(selection.text);
    if (typeof(bindTo) === 'object') bindTo.setValue(selection.text);
    if (typeof(varName) === 'string') window.s2mfx[varName] = selection.text;
  }

  return (
    <div>
      <MS.ChoiceGroup
        label={label}
        options={optionsArray}
        onChange={handleInput}
        ariaLabelledBy={label}
        {...rest}
      />
    </div>
  );
}



export class Tabulator extends React.Component{
  constructor(props){
    super(props);
    this.cells=[];
    this.headers=[];
    this.cols={};
    // this piece iterates all child element, then breaks it into an array of label
    // and an array of cloned and modified element
    if (this.props.children.length > 1){
      this.props.children.forEach(child => {
        const key=child.props.label;
        this.cols[key] = [];
        this.headers.push(<th key={key}><Label>{key}</Label></th>);
        this.cells.push(<td key={key}>{ React.cloneElement(child, {label: undefined} ) }</td>);
      });
    } else {
      this.headers = <th style={{width:"100%"}}><Label>{this.props.children.props.label}</Label></th>;
      this.cells = <td>{ React.cloneElement(this.props.children, {label: undefined}) }</td>
    }
    
    // state handling
    this.state={rows: [this.createRow(0)]}
    this.setRows = row =>this.setState({rows:row});
  }

  // function to delete its own row object (of input elements)
  // triggered by pressing the remove button
  async deleteRow(key){
    const tempRows = [...this.state.rows];
    const toDeleteIndex = tempRows.map(item=>item.key).indexOf(key);
    if (toDeleteIndex > -1){
      tempRows.splice(toDeleteIndex, 1);
    }
    this.setRows(tempRows);
  }

  // function to add a row object at the bottom of the Tabulator.
  // triggered by pressing add button
  async addRow(){
    const tempRows = [...this.state.rows];
    tempRows.push(this.createRow(Math.floor(Math.random()*100000)));
    this.setRows(tempRows);
  }

  // function to create a row object.
  // row object contains a unique index called key and a HTML that will be rendered.
  // the key is used to identify a row should a user need to delete it 
  createRow(key){
    return {
      key:key,
      html: (
        <tr key={key}>
          {this.cells}
          <td>
            <MS.DefaultButton
              iconProps={{iconName: 'Remove'}}
              styles={{
                root:{minWidth: "12px", padding:"0px 5px"},
                rootHovered: {backgroundColor: "#d13438", color:"white"}
              }}
              onClick={()=>this.deleteRow(key)}
            />
          </td>
        </tr>
      )
    }
  }

  render(){
    return (
      <table style={{width:"100%"}}>
        <thead>
          <tr>
            {
              this.headers
            }
            <th></th>
          </tr>
        </thead>
        <tbody>
          {/* extract the HTML of every row object and display it */}
          {this.state.rows.map(row=>{
              return row.html;
            })
          }
          <tr>
            <td colSpan={this.headers.length}></td>
            <td>
              <MS.DefaultButton iconProps={{iconName: 'Add'}}
                styles={{
                  root:{minWidth: "12px", padding:"0px 5px"},
                  rootHovered: {backgroundColor: pallete.two, color:"white"}
                }}
                onClick={()=>this.addRow()}
              />
            </td>
          </tr>
        </tbody>
      </table>
    )
  }
}
