import * as React from 'react';
import { connect } from 'react-redux';
import { Button, Input, TextArea } from 'semantic-ui-react';
import Note from '../../model/note';
import { RootState } from '../../module';
import { deleteNote, saveNote } from '../../module/notes';

interface PropTypes {
  notes: Note[],
  match: {
    params: {
      id: string
    }
  },
  dispatch: (action :any) => any,
  isRequesting: boolean
}

interface StateTypes {
  noteId: string,
  draftTitle: string,
  draftBody: string
}

class NoteEditView extends React.Component<PropTypes, StateTypes> {
  public constructor(props: PropTypes) {
    super(props);

    this.state = {
      noteId: '',
      draftTitle: '',
      draftBody: ''
    };
  }

  public componentDidMount() {
    this.setCurrentNoteToState(this.props);
  }

  public componentWillReceiveProps(nextProps: PropTypes) {
    this.setCurrentNoteToState(nextProps);
  }

  public render() {
    const selectedNote = this.getSelectedNote();

    return (
      <div>
        {selectedNote ? (
          <div className='ui form'>
            <Input
              fluid={true}
              type='text'
              value={this.state.draftTitle}
              onChange={this.onTitleChangeHandler}
              disabled={this.props.isRequesting}
            />
            <TextArea
              value={this.state.draftBody}
              onChange={this.onBodyChangeHandler}
              disabled={this.props.isRequesting}
              autoHeight={true}
              rows={10}
            />
            <Button
              onClick={this.saveHandler}
              disabled={this.props.isRequesting}
            >Save</Button>
            <Button
              color='red'
              onClick={this.deleteHandler}
              disabled={this.props.isRequesting}
            >delete this note</Button>
          </div>
        ) : (
          <div>not found!</div>
        )}
      </div>
    );
  }

  private saveHandler = () => {
    this.props.dispatch(saveNote(this.state.noteId, this.state.draftTitle, this.state.draftBody));
  }

  private deleteHandler = () => {
    const selectedNote = this.getSelectedNote();
    if (selectedNote) {
      this.props.dispatch(deleteNote(selectedNote));
    }
  }

  private onTitleChangeHandler = (event: React.FormEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;
    this.setState({
      draftTitle: target.value
    });
  }

  private onBodyChangeHandler = (event: React.FormEvent<HTMLTextAreaElement>) => {
    const target = event.target as HTMLInputElement;
    this.setState({
      draftBody: target.value
    });
  }

  private getSelectedNote(props: PropTypes = this.props) {
    const noteId = props.match.params.id;
    return props.notes.find(note => note.id === noteId);
  }

  private setCurrentNoteToState(props: PropTypes) {
    const selectedNote = this.getSelectedNote(props);

    if (selectedNote) {
      this.setState({
        noteId: selectedNote.id,
        draftTitle: selectedNote.title,
        draftBody: selectedNote.body
      });
    }
  }

}

const mapStateToProps = (state: RootState) => {
  return {
    notes: state.notes.items,
    isRequesting: state.notes.isRequesting
  };
};

export default connect(mapStateToProps)(NoteEditView);