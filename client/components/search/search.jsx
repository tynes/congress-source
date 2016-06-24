import React from 'react';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import Checkbox from 'material-ui/Checkbox';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import ArrowForward from 'material-ui/svg-icons/navigation/arrow-forward';
import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back';

const style = {
  width: '376px',
};
// give state to checkboxes so that they can be clicked
// style sets the width of the form
// need to figure out how to make it responsive

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
    };
  }
  handleChange(event) {
    this.setState({ search: event.target.value }, () => this.props.handleSearch(this.state.search));
  }
  render() {
    return (
      <div>
        <h1 className="row">Search Through Members of the US Government</h1>
        <div className="right-push">
          <TextField
            onChange={this.handleChange.bind(this)}
            floatingLabelText="Search Here"
            hintText="Ex Chuck Schumer or New York"
            floatingLabelFixed={true}
            className="row"
            style={style}
          />
          <RadioButtonGroup name="searchType" defaultSelected="state" className="row">
            <RadioButton
              value="state"
              label="State"
            />
            <RadioButton
              value="name"
              label="Name"
            />
          </RadioButtonGroup>
          <div className="row">
            <Checkbox
              label="Republican"
              checked={this.props.party === 'Republican'}
              onCheck={() => this.props.handleCheck('Republican', 0)}
            />
            <Checkbox
              label="Democrat"
              checked={this.props.party === 'Democrat'}
              onCheck={() => this.props.handleCheck('Democrat', 0)}
            />
          </div>
          <FlatButton
            icon={<ArrowBack />}
            onClick={() => this.props.getPrevMembers()}
          />
          <FlatButton
            icon={<ArrowForward />}
            onClick={() => this.props.getNextMembers()}
          />
        </div>
      </div>
    );
  }
}

export default Search;

/*
2 options to search by
state and name
TODO: Turn off button based on this.props.end
TODO: Turn off button if searching, no results
  should return > 8
*/
