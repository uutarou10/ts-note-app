import * as React from 'react';
import { List } from 'semantic-ui-react';
import Note from '../../model/note';
import ListItem from './ListItem';

interface PropTypes {
  notes: Note[]
}

const NoteList: React.SFC<PropTypes> = ({ notes }) => {
  return (
    <div>
      <List divided={true} relaxed={true}>
        {notes.map(note => (
          <ListItem key={note.id} note={note} />
        ))}
      </List>
    </div>
  );
};

export default NoteList;