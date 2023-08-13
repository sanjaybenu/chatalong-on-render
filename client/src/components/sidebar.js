
// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';

// const topics = ['Holidays', 'Politics','Sports', 'Finance'];

// const Sidebar = () => {
//   const [selectedTopic, setSelectedTopic] = useState('');

//   const handleTopicClick = (topic) => {
//     setSelectedTopic(topic);
//   };

//   return (
//     <>
//       {topics.map((topic) => (
//         <React.Fragment key={topic}>
//           <h3 onClick={() => handleTopicClick(topic)} style={{ cursor: 'pointer' }}>
//             <Link to={`/post/${topic}`}>{topic}</Link>
//           </h3>
         
//         </React.Fragment>
//       ))}
//     </>
//   );
// };

// export default Sidebar;

import React from 'react';
import { Link } from 'react-router-dom';
import { Grid, Icon, Menu, Sidebar, Segment } from 'semantic-ui-react';
import '../Style/Sidebar.css';

const MySidebar = ({ visible, onHide }) => {
  return (
    <Grid columns={1}>
      <Grid.Column>
        <Sidebar
          as={Menu}
          animation='overlay'
          icon='labeled'
          inverted
          onHide={onHide} // Pass the onHide function from the parent component to handle visibility
          vertical
          visible={visible}
          width='thin'
          dimmed
          style={{ background: 'white' }} // Set background color to white
        >
  
          <Segment vertical>
            <Link to='/'>
              <Menu.Item as='a' onClick={onHide}>
                <Icon color='black' name='home' />
                <h3 className="SidebarHeader">Home</h3>
              </Menu.Item>
            </Link>
          </Segment>
          
          <Segment vertical>
            <Link to='/post/Language'>
              <Menu.Item as='a' onClick={onHide}>
                <Icon color='black' name='language' />
                <h3 className="SidebarHeader">Language Exchange</h3>
              </Menu.Item>
            </Link>
          </Segment>

          <Segment vertical>
            <Link to='/post/Sports'>
              <Menu.Item as='a' onClick={onHide}>
                <Icon color='black' name='soccer' />
                <h3 className="SidebarHeader">Sports</h3>
              </Menu.Item>
            </Link>
          </Segment>

          <Segment vertical>
            <Link to='/post/Travel'>
              <Menu.Item as='a'onClick={onHide}>
                <Icon color='black' name='travel' />
                <h3 className="SidebarHeader">Travel</h3>
              </Menu.Item>
            </Link>
          </Segment>

          <Segment vertical>
            <Link to='/post/Finace '>
              <Menu.Item as='a' onClick={onHide}>
                <Icon color='black' name='money' />
                <h3 className="SidebarHeader">Finace </h3>
              </Menu.Item>
            </Link>
          </Segment>

          <Segment vertical>
            <Link to='/post/Medical'>
              <Menu.Item as='a' onClick={onHide}>
                <Icon color='black' name='medkit' />
                <h3 className="SidebarHeader">Medical</h3>
              </Menu.Item>
            </Link>
          </Segment>

          <Segment vertical>
            <Link to='/post/Games'>
              <Menu.Item as='a' onClick={onHide}>
                <Icon color='black' name='gamepad' />
                <h3 className="SidebarHeader">Games</h3>
              </Menu.Item>
            </Link>
          </Segment>

          <Segment vertical>
            <Link to='/post/Chat'>
              <Menu.Item as='a' onClick={onHide}>
                <Icon color='black' name='users' />
                <h3 className="SidebarHeader">Chat</h3>
              </Menu.Item>
            </Link>
          </Segment>
        </Sidebar>
      </Grid.Column>
    </Grid>
  );
};

export default MySidebar;

