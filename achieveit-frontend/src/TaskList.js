import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Badge from 'react-bootstrap/Badge';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';

function TabsExample(props) {
    return (
        <Tab.Container id="list-group-tabs-example" defaultActiveKey="#link1">
            <Row>
                <Col sm={4}>
                    <ListGroup>
                        {props.lists.map((item) => (
                            <ListGroup.Item action href={`#${item.name}`}>
                                {item.name}
                                <Badge bg="primary" pill>
                                    14
                                </Badge>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Col>
                <Col sm={8}>
                    <Tab.Content>
                        <Tab.Pane eventKey="#link1">Tab pane content 1</Tab.Pane>
                        <Tab.Pane eventKey="#link2">Tab pane content 2</Tab.Pane>
                    </Tab.Content>
                </Col>
            </Row>
        </Tab.Container>
    );
}

export default TabsExample;





// import * as React from 'react';
// import Box from '@mui/material/Box';
// import List from '@mui/material/List';
// import ListItem from '@mui/material/ListItem';
// import ListItemButton from '@mui/material/ListItemButton';
// import ListItemText from '@mui/material/ListItemText';
// //import { FixedSizeList as List } from 'react-window';

// function TaskList(props) {
//     return (
//         // <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
//         //     {props.lists.map((list) => (
//         //         <ListItem key={list.name} component="div" disablePadding>
//         //             <ListItemButton>
//         //                 <ListItemText primary={list.name} />
//         //             </ListItemButton>
//         //         </ListItem>
//         //     ))}
//         // </List>
//     );

//     return (
//         <Box
//             sx={{ width: '100%', height: 400, maxWidth: 400, bgcolor: 'background.paper' }}
//         >
//             <List
//                 height={400}
//                 width={400}
//                 itemSize={46}
//                 itemCount={props.lists.length}
//                 overscanCount={5}
//             >
//                 {props.lists.map((list) => (
//                     <ListItem key={list.name} component="div" disablePadding>
//                         <ListItemButton>
//                             <ListItemText primary={`Item`} />
//                         </ListItemButton>
//                     </ListItem>
//                 ))}
//             </List>
//         </Box>
//     );
// }

// export default TaskList;