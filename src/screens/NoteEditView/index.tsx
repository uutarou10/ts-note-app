import * as React from 'react';
import { connect } from 'react-redux';
import Note from '../../model/note';
import { RootState } from '../../module';
import { saveNote } from '../../module/notes';

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
          <div>
            <input
              type='text'
              value={this.state.draftTitle}
              onChange={this.onTitleChangeHandler}
            />
            <textarea
              value={this.state.draftBody}
              onChange={this.onBodyChangeHandler}
            />
            <button
              onClick={this.saveHandler}
              disabled={this.props.isRequesting}
            >Save</button>
            <button
              disabled={this.props.isRequesting}
            >delete this note</button>
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