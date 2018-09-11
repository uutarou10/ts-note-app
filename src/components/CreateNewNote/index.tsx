import * as React from 'react';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react';
import { createNote } from '../../module/notes';

interface PropTypes {
  dispatch: (action: any) => any 
}

const CreateNewNote: React.SFC<PropTypes> = ({dispatch}) => {

  const handler = () => {
    const title = prompt('Please input new note title');
    dispatch(createNote(title ? title : ''));
  }

  return (
    <div>
      <Button
        color='blue'
        onClick={handler}
      >New note</Button>
    </div>
  );
};

export default connect()(CreateNewNote);