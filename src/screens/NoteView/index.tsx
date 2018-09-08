import * as React from 'react';
import { connect } from 'react-redux';
import Note from '../../model/note';
import { RootState } from '../../module';

interface PropTypes {
  match: {
    params: {
      id: string
    }
  },
  notes: Note[]
}

const NoteView: React.SFC<PropTypes> = (props) => {
  const noteId = props.match.params.id;
  const selectedNote = props.notes.find(note => note.id === noteId);

  return (
    <div>
      {selectedNote ? (
        <div>
          <h2>{selectedNote.title}</h2>
          <p>{selectedNote.body}</p>
        </div>
      ) : (
        <div>sorry, not found!</div>
      )}
    </div>
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    notes: state.notes.items
  };
};

export default connect(mapStateToProps)(NoteView);