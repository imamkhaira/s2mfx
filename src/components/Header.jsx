import React from 'react';
import {Box, Row, Col, Pallete} from './Component';

const Header = ({title, subtitle, logo, logoWidth="170"})=>{
    const style = {
        backgroundColor: Pallete.header,
        paddingLeft: '10px',
        paddingRight: '10px',
        color: '#ffffff',
        border: `1px solid ${Pallete.primary}`,
        lineHeight: '4px',
    };

    return (
    <Row style={style} options="middle-xs between-md around-xs">
        <Col>
            <Box options="center-xs start-sm hidden-xs show-sm" >
               {logo && <img src={logo} alt={subtitle} width={logoWidth} />}
            </Box>
        </Col>
        <Col>
            <Box options="center-xs end-sm ">
                <h3 style={{fontWeight: 500}}>{title}</h3>
                <h4 style={{fontWeight: 300}}>{subtitle}</h4>
            </Box>
        </Col>
    </Row>
)};


export default Header;