import * as React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import NoteList from './components/NoteList';
import Note from './model/note';
import { RootState } from './module';
import { fetchItemsRequest } from './module/notes';
import NoteEditView from './screens/NoteEditView';
import NoteView from './screens/NoteView';

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
      <Router>
        <div>
          <div>
            {this.props.isFetching ? <p>Loading...</p> : <NoteList notes={this.props.notes} />}
          </div>
          <div>
            <Route exact={true} path='/' component={IndexComponent} />
            <Route exact={true} path='/notes/:id' component={NoteView} />
            <Route path='/notes/:id/edit' component={NoteEditView} />
          </div>
        </div>
      </Router>
    );
  }
}

const IndexComponent = () => (
  <p>Please select note</p>
);

const mapStateToProps = (state: RootState) => {
  return {
    notes: state.notes.items,
    isFetching: state.notes.isFetching
  };
};

export default connect(mapStateToProps)(App);
