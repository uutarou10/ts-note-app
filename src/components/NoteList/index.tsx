import * as React from 'react';
import Note from '../../model/note';

interface PropTypes {
  notes: Note[]
}

const NoteList: React.SFC<PropTypes> = ({ notes }) => {
  return (
    <div>
      <ul>
        {notes.map(note => (
          <li key={note.id}>
            {note.title}<br />
            {note.body}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NoteList;