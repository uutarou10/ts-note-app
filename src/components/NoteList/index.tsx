import * as React from 'react';
import { Link } from 'react-router-dom';
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
            <Link to={`/notes/${note.id}`}>{note.title}</Link><br />
            {note.body}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NoteList;