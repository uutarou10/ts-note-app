import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Divider } from 'semantic-ui-react';
import Note from '../../model/note';
import { RootState } from '../../module';
import { deleteNote } from '../../module/notes';

interface PropTypes {
  match: {
    params: {
      id: string
    }
  },
  notes: Note[],
  dispatch: (action: any) => any
}

const NoteView: React.SFC<PropTypes> = (props) => {
  const noteId = props.match.params.id;
  const selectedNote = props.notes.find(note => note.id === noteId);

  return (
    <div>
      {selectedNote ? (
        <div>
          <h2>{selectedNote.title}</h2>
          <Link
            to={`/notes/${selectedNote.id}/edit`}
            className='ui button'
          >Edit</Link>
          <Button
            color='red'
            onClick={onDeleteHandler(props.dispatch, selectedNote)}
          >Delete</Button>
          <Divider />
          <p>{selectedNote.body}</p>
        </div>
      ) : (
        <div>sorry, not found!</div>
      )}
    </div>
  );
};

const onDeleteHandler = (dispatch: any, note: Note) => {
  return () => {
    dispatch(deleteNote(note));
  };
};

const mapStateToProps = (state: RootState) => {
  return {
    notes: state.notes.items
  };
};

export default connect(mapStateToProps)(NoteView);