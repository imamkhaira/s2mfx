import React from 'react';
import '../lib/css/flexbox.css';
import * as MS from 'office-ui-fabric-react';

window.s2mfx = {};


const pallete = {
  one: '#818281',
  two: '#064a90',
  three: '#4778ac',
  four: '#363636',
  five: '#245f9d'
};


export const ContainerBase = (props) =>{
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
        return 'xs'; break;
      
        case 1024:
          return 'sm'
    }
    console.log(window.innerWidth)
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


export const SingleCol = props => (
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
      <SingleCol style={{backgroundColor: pallete.five}}>
        <MS.DefaultButton styles={{root: inherit, rootHovered: inherit, rootPressed: inherit}} onClick={change}>
        {props.label}
        </MS.DefaultButton>
      </SingleCol>
      <SingleCol style={{backgroundColor: '#ffffff'}}>
        {show && props.children}
      </SingleCol>
    </Row>
  );
}


export const TextField = ({label, bindTo, varName, ...rest}) =>{
  const handleInput = (event) =>{
    let value = event.target.value;
    typeof(bindTo)==='object' ? bindTo.setValue(event.target.value) : window.s2mfx[varName] = value;
  }
  return (
    <MS.TextField label={label} onChange={handleInput}/>
  );
}