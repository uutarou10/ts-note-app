import * as React from 'react';
import { connect } from 'react-redux';
import Note from '../../model/note';
import { RootState } from '../../module';

interface PropTypes {
  notes: Note[],
  match: {
    params: {
      id: string
    }
  }
}

const NoteEditView: React.SFC<PropTypes> = (props) => {
  const noteId = props.match.params.id;
  const selectedNote = props.notes.find(note => note.id === noteId);

  return (
    <div>
      {selectedNote ? (
        <div>
          <input type='text' value={selectedNote.title} />
          <textarea value={selectedNote.body} />
          <button>save</button>
          <button>delete this note</button>
        </div>
      ) : (
        <div>not found!</div>
      )}
    </div>
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    notes: state.notes.items
  };
};

export default connect(mapStateToProps)(NoteEditView);