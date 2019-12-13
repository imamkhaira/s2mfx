import React from 'react';
import '../lib/css/flexbox.css';
import * as MS from 'office-ui-fabric-react';

window.s2mfx = {};
MS.initializeIcons();

export const Pallete = window.Pallete || {
  header: '#067BC2', //dark green
  primary: '#1E91D6', //light greeen
  primary_alt: '#e0f4ff ', //lighter green
  success: '#157A6E', //grreen?
  warning: '#F3A712  ', //yellow
  error: '#C14953' //very red
};

export const setSiteContentUrl = (href) => {
  if (window.s2mfx_debug|| !window.SP){
    window.openSiteContent = function(){
      let location = href;
      window.location.replace(location);
    }
  }
}


export const mobilecheck = () => {
  var check = false;
  // eslint-disable-next-line
  (a => {if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
  return check;
};


const mapOptions = options => options.map(option=>{
  if (typeof(option) === "string" ) {
    return {
      key: option.replace(/[^a-zA-Z0-9]/g, ""),
      text: option
    }
  } else {
    return option;
  }
});

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

export class FormWrapper extends React.PureComponent {
  constructor(props){
    super(props)
    this.formid = MS.getId(Math.random());
    this.inputID = MS.getId(Math.random());
  }


  componentDidMount(){
    const { onSubmit } = this.props;
    document.getElementById(this.formid).addEventListener('submit', (event) => {
      event.preventDefault();
      const form = document.getElementById(this.formid);
      const valid = form.checkValidity();
      if (valid){
        onSubmit();
      }
      else {
        document.getElementById(this.inputID).click();
      }
    });
  }

  render() {
    const { children } = this.props;
    return (
      <>
      <form name={this.formid} id={this.formid}>
        {children}
        <br />
        <input type="submit" id={this.inputID} style={{opacity: '0'}} />
      </form>                                                                                     
      </>
    );
  }
}

export const Box = props => {
  // box options
  return (
    <div className={`box ${props.options ? props.options : "" }`} style={props.style} {...props} >{props.children}</div>
  );
};


export const Row = props =>(
  <div className={`row ${props.options ? props.options : "" }`} style={props.style}>{props.children}</div>
);


export const Col = (props) => {
  return <div className={`col-xs-12 col-sm-6 ${props.options ? props.options : "" }`} style={props.style}>{props.children}</div>;
};


export const Singlecol = props => (
  <div className={`col-xs-12 ${props.options ? props.options : "" }`} {...props} >{props.children}</div>
)


export const Section = props => {
  const [show, setShow] = React.useState(!props.closed);
  const change = () => setShow(!show);
  const bordered = {
    padding: 'none',
    margin: 'none',
    border: `1px solid ${show ? Pallete.primary : Pallete.header}`,
  };
  
  const inherit = {
    color: '#ffffff',
    width: '100%',
    backgroundColor: 'inherit',
    border: 'none',
    textAlign: "left",
    padding: '5px 5px 5px 5px'
  };

  return (
    <Row style={bordered}>
      <Singlecol style={{backgroundColor: show ? Pallete.primary : Pallete.header}}>
        <MS.DefaultButton
          styles={{
            root: inherit,
            rootHovered: {...inherit, backgroundColor: show ? Pallete.header : Pallete.primary},
            rootPressed: {...inherit, backgroundColor: Pallete.warning}
          }}
          onClick={change}>
          {props.label}
        </MS.DefaultButton>
      </Singlecol>
      <Singlecol>
        { show && props.children }
        { show && <br /> }
      </Singlecol>
    </Row>
  );
}

export const Label = ({children, ...rest}) =>{
  return (<MS.Label {...rest} >{children}</MS.Label>);
};

export const Subsection = ({label, children, ...rest}) => {
  return (
    <>
    <Label disabled>{label}</Label>
    <Box style={{border: `1px solid ${Pallete.primary_alt}`, padding:"0px 5px 5px 5px"}}>
      {children}
    </Box> 
    </>
  );
}

export const Tooltip = ({children, id, calloutProps, ...rest}) => {
  const _id = MS.getId(String(id));
  const _calloutProps = calloutProps || { gapSpace: -25 };
  const _tooltipProps= { style: { overflowY: 'auto' } };
  const _children = React.cloneElement(children, {'aria-describedby': _id});
  return <MS.TooltipHost id={_id} calloutProps={_calloutProps} tooltipProps={_tooltipProps} {...rest}>{_children}</MS.TooltipHost>;
}

export const Textfield = ({bindTo, varName, getter, follow, ...rest}) =>{
  const handleInput = e =>{
    let value = e.target.value;
    if (typeof(getter) === 'function') getter(value);
    if (typeof(bindTo) === 'object') bindTo.setValue(value);
    if (typeof(varName) === 'string') window.s2mfx[varName] = value;
  }

  return (
    <MS.TextField
      {...rest}
      onChange={handleInput}
    />
  );
}

export const Checkbox = ({varName, getter, bindTo, ...rest})=>{
  const handleInput = (event, check) => {
    if (typeof(getter) === 'function') getter(check);
    if (typeof(bindTo) === 'object') bindTo.setValue(check);
    if (typeof(varName) === 'string') window.s2mfx[varName] = check;
  };
  return <MS.Checkbox onChange={handleInput} {...rest} />
}

export const Button = ({children, iconName, ...rest}) => {
  return (
  <MS.DefaultButton iconProps={{iconName: iconName}} {...rest} >
    {children}
  </MS.DefaultButton>
  );
}

export const Multiselect = ({getter, varName, bindTo, placeholder, options, ...rest}) => {
  const [selection, setSelection] = React.useState([]);
  const [text, setText] = React.useState([]);
  
  const optionsArray = mapOptions(options);

  const handleInput = (event, item)=>{
    const selectedItems = [...selection];
    const selectedText = [...text];
    if (item.selected) {
      selectedItems.push(item.key); // add the option if it's checked
      selectedText.push(item.text);
    } else {
      const currIndex = selectedItems.indexOf(item.key); // remove the option if it's unchecked
      if (currIndex > -1) {
        selectedItems.splice(currIndex, 1);
        selectedText.splice(currIndex, 1);
      }
    }
    setSelection(selectedItems);
    setText(selectedText);
    if (typeof(getter) === 'function') getter(selectedText);
    if (typeof(bindTo) === 'object') bindTo.setValue(selectedText ? {results: selectedText} : null);
    if (typeof(varName) === 'string') window.s2mfx[varName] = selectedText;
  }

  return (
    <MS.Dropdown
      placeholder={placeholder || "Choose..."}
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
  const optionsArray = mapOptions(options);

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
      placeholder={placeholder || "Select..."}
      options={optionsArray}
      styles={{ dropdown: { width: "100%" } }}
      {...rest}
    />
  );
}


export const Datepicker = ({label, getter, varName, bindTo, required}) =>{
  const [date, setDate] = React.useState(new Date("27 March 1996"));

  const handleInput = e =>{
    const ayam = new Date(e);
    if (typeof(getter) === 'function') getter(ayam);
    if (typeof(bindTo) === 'object') bindTo.setValue(ayam);
    if (typeof(varName) === 'string') window.s2mfx[varName] = ayam;
    setDate(ayam);
  }

  return (
    <MS.DatePicker
      label={label}
      isRequired={required}
      ariaLabel={label}
      firstDayOfWeek={MS.DayOfWeek.Sunday}
      showMonthPickerAsOverlay={mobilecheck()}
      value={date}
      onSelectDate={handleInput}
    />
  );
}

export const Radiobutton = ({label, options, bindTo, varName, getter, required, ...rest})=>{
  const optionsArray = mapOptions(options);

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
        required={required}
        {...rest}
      />
    </div>
  );
}

export const Fileupload = ({label, bindTo, getter, varName, fileName, getFileAddr, required, ...rest}) =>{
  let [filename, setFilename] = React.useState("Add File");
  let file = new FileReader();
  const handleInput = async event =>{
    const open = event.target.files[0];
    setFilename(open.name);
    const extension = open.name.split('.');
    const name = `${fileName.value}.${extension[extension.length-1]}`;
    
    file.readAsArrayBuffer(open);
    file.onloadend = (e) => {  
      const result = e.target.result;
      if (typeof(getter) === 'function') getter(name, result);
      if (typeof(varName) === 'string') window.s2mfx[varName] = [name, result];
      if (typeof(bindTo) === 'object') { 
        bindTo.uploadObj.setName(name);
        bindTo.uploadObj.setData(result);
      }
    }
  
  }
  const id = MS.getId(String(label));
  const click = () => document.getElementById(id).click();
  return (
    <div>
      <MS.Label>{`${label}${required ? " *" : ""}`}</MS.Label>
      <MS.CommandButton iconProps={{ iconName: 'Add' }} text={filename} onClick={click}/>
      <input id={id} type="file" onChange={handleInput} {...rest} style={{display: "none"}}/>
    </div>
  );
}

export class Tabulator extends React.PureComponent{
  // props: children, bindList: [], fkColName, foreignKey: dataObj
  constructor(props){
    super(props);
    try {
      this.header = this.props.children.map(child=>{
        return <th key={child.props.label} style={{fontWeight: "600", width: child.props.width || null}}>{child.props.label}</th>;
      });
      this.state = { rows: {
        html: [],
        index: [],
      } };
      this.setRows = newRow =>this.setState({rows: newRow});
      this.props.bindList.tabulator = [];
    } catch (err) {
      console.error("blyat tabbulator needs at least 2 columns");
    }
  }

  componentDidMount(){
    this.createRows(0);
  }

  createRows(index){
    let data = {};
    let temp = {
      html: [...this.state.rows.html],
      index: [...this.state.rows.index],
    };
    data[this.props.fkColName || "Title"] = this.props.foreignKey;
    temp.index.push(index);
    temp.html.push(
      <tr key={index}>
        {
          this.props.children.map(child=>{
            data[child.props.bindTo] = {
              dataName: child.props.bindTo,
              value: undefined,
              setValue: v => { data[child.props.bindTo].value = v }
            };
            return (
              <td key={child.props.label}>
                {React.cloneElement(child, { label: undefined, bindTo: data[child.props.bindTo] })}
              </td>
            );
          })
        }
        <td style={{width:'1em'}}>
            <MS.IconButton
              iconProps={{iconName: 'Remove'}}
              styles={{
                root:{border: `1px solid #d13438`, minWidth: "12px", padding:"0px 5px"},
                rootHovered: {backgroundColor: "#d13438", color:"white"}
              }}
            onClick={()=>{this.deleteRow(index)}}
            title="Remove this entry"
          />
        </td>
      </tr>
    );
    
    
    this.props.bindList.tabulator.push(data);
    this.setRows(temp);
  }

  deleteRow(index){
    let temp = {
      html: [...this.state.rows.html],
      index: [...this.state.rows.index]
    };
    let deleteindex = temp.index.indexOf(index);
    if (deleteindex > -1 ) {
      temp.html.splice(deleteindex, 1);
      temp.index.splice(deleteindex, 1);
      this.props.bindList.tabulator.splice(deleteindex, 1);
      this.setRows(temp);
    }
  }

  render(){
    const { floor, random } = Math;   
    const styling = {
      table: { border: this.props.label && `1px solid ${Pallete.primary}`, width: "100%", textAlign: "center", marginTop: "8px" },
      caption: { textAlign: "left" },
      thead: { fontSize: "14px",  textAlign: "center", backgroundColor: Pallete.primary_alt }
      //thead: { fontSize: "14px",  textAlign: "center", border: "1px solid #0B6FA4" }
    };

    return(
      <div style={{overflowX:"auto"}}>
      <table style={styling.table}>
        {this.props.label && <caption style={styling.caption}><Label disabled>{this.props.label}</Label></caption>}
        <thead style={styling.thead}>
          <tr >
            {this.header}
            <th>
              {/* <MS.IconButton iconProps={{iconName: 'Add'}}
                styles={{
                  root:{ border: `1px solid ${Pallete.success}`, width: "100%" },
                  rootHovered: { backgroundColor: Pallete.success, color:"white" }
                }}
                onClick={()=>this.createRows(floor(random()*27031996))}
                title="Add an entry"
              /> */}
              <MS.IconButton
                iconProps={{iconName: 'Add'}}
                styles={{
                  root:{border: `1px solid ${Pallete.success}`, minWidth: "12px", padding:"0px 5px"},
                  rootHovered: {backgroundColor: Pallete.success, color:"white"}
                }}
                onClick={()=>this.createRows(floor(random()*27031996))}
                title="Add an entry"
              />
            </th>
          </tr>
        </thead>
        <tbody>
          {this.state.rows.html}
          <tr>
            <td colSpan={this.header.length}></td>
          </tr>
        </tbody>
      </table>
      </div>
    );
  }
}
