import * as React from 'react';
import { connect } from 'react-redux';
import { fetchItemsRequest } from './module/notes';

interface PropTypes {
  dispatch: (action: any) => any 
}

class App extends React.Component<PropTypes> {
  public componentDidMount() {
    this.props.dispatch(fetchItemsRequest());
  }

  public render() {
    return (
      <div className="App">
        hoge
      </div>
    );
  }
}

export default connect()(App);
