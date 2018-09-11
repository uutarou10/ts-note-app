import * as React from 'react';
import { Link } from 'react-router-dom';
import { List } from 'semantic-ui-react';
import Note from '../../model/note';

interface PropTypes {
  note: Note
}

const ListItem: React.SFC<PropTypes> = ({ note }) => {
  return (
    <List.Item>
      <List.Icon name='file' size='large' verticalAlign='middle' />
      <List.Content>
        <Link to={`/notes/${note.id}`} className='header'>{note.title}</Link>
        <List.Description>{note.body}</List.Description>
      </List.Content>
    </List.Item>
  );
};

export default ListItem;