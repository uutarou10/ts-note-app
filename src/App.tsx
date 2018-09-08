import * as React from 'react';
import { connect } from 'react-redux';
import NoteList from './components/NoteList';
import Note from './model/note';
import { RootState } from './module';
import { fetchItemsRequest } from './module/notes';

interface PropTypes {
  dispatch: (action: any) => any,
  notes: Note[],
  isFetching: boolean
}

class App extends React.Component<PropTypes> {
  public componentDidMount() {
    this.props.dispatch(fetchItemsRequest());
  }

  public render() {
    return (
      <div className="App">
        {this.props.isFetching ? <p>Loading...</p> : <NoteList notes={this.props.notes} />}
      </div>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  return {
    notes: state.notes.items,
    isFetching: state.notes.isFetching
  };
};

export default connect(mapStateToProps)(App);
