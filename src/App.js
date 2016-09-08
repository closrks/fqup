import React, { Component } from 'react';
import _ from 'lodash';
import './App.css';
import { fetchProcedures, routeToLocation, fetchFolders } from './actions';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import { List, ListItem } from 'material-ui/List';
import FolderIcon from 'material-ui/svg-icons/file/folder';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import CircularProgress from 'material-ui/CircularProgress';
import FlatButton from 'material-ui/FlatButton';

function generateNestedTreeNodes(folders, node, nestedListToggle) {
  return (
    <ListItem
      key={node._id}
      leftIcon={<FolderIcon />}
      primaryText={node.name + ' ' + node.ts}
      primaryTogglesNestedList={true}
      onNestedListToggle={nestedListToggle.bind(this, node._id)}
      nestedItems={
        node.childIds.map((childId) => {
          let childNode = folders.items[childId];
          return generateNestedTreeNodes(folders, childNode, nestedListToggle);
        })
      } />
  );
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  transitionTo = () => {
    this.props.routeToLocation();
  }

  nestedListToggle = (folderKey) => {
    if (this.props.folders.items[folderKey].childIds.length === 0) {
      this.props.fetchProcedures();
    }
  }

  refetchProcedures = () => {
    this.props.fetchProcedures();
  }

  refetchFolders = () => {
    this.props.fetchFolders();
  }

  render() {
    let parentNodes = Object.keys(this.props.folders.items)
      .filter((key) => {
        return this.props.folders.items[key].parentId === null;
      })
      .map((key) => {
        return this.props.folders.items[key];
      });
    return (
      <MuiThemeProvider>
        <div>
          {
            this.props.bootstrap.status || this.props.procedures.isFetching || this.props.folders.isFetching
            ?
            <div style={{ width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.541176)', zIndex: 999999, position: 'fixed', padding: 0, margin: 0, top: 0, left: 0 }}>
              <div style={{ position: 'absolute', top: '48%', left: '48%'}}>
                <CircularProgress size={1.25}/>
              </div>
            </div>
            : null
          }
          <div style={{ paddingLeft: '256px'}}>
            <AppBar
              title=""
              iconElementLeft={<div/>}
              iconElementRight={<FlatButton label={'Transition To'} onClick={this.transitionTo} />}
              iconStyleRight={{ margin: 'auto' }}/>
            <div style={{ padding: '42px 72px' }}>
              <div style={{ textAlign: 'center' }}>
                <RaisedButton
                  disabled={this.props.bootstrap.status || this.props.procedures.isFetching}
                  onClick={this.refetchProcedures}>FETCH</RaisedButton>
              </div>
              <Table>
                <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                  <TableRow>
                    <TableHeaderColumn>ID</TableHeaderColumn>
                    <TableHeaderColumn>Name</TableHeaderColumn>
                    <TableHeaderColumn>Timestamp</TableHeaderColumn>
                  </TableRow>
                </TableHeader>
                <TableBody displayRowCheckbox={false}>
                  {
                    this.props.procedures.items.map((procedure) => {
                      return (
                        <TableRow key={procedure._id}>
                          <TableRowColumn>{procedure._id}</TableRowColumn>
                          <TableRowColumn>{procedure.name}</TableRowColumn>
                          <TableRowColumn>{procedure.ts}</TableRowColumn>
                        </TableRow>
                      );
                    })
                  }
                </TableBody>
              </Table>
            </div>
          </div>
          <Drawer docked={true}>
            <AppBar title="#FloQast" iconElementLeft={<div/>}/>
            <div style={{ textAlign: 'center', padding: '20px 0px 10px 0px' }}>
              <RaisedButton
                disabled={this.props.bootstrap.status || this.props.folders.isFetching}
                onClick={this.refetchFolders}>FETCH</RaisedButton>
            </div>
            <List>
              {
                parentNodes.map((node) => {
                  return generateNestedTreeNodes(this.props.folders, node, this.nestedListToggle);
                })
              }
            </List>
          </Drawer>
        </div>
      </MuiThemeProvider>
    );
  }
}

let getProcedures = function(procedures) {
  var procs = [];
  _.forIn(procedures.items, function(value, key) {
    procs.push(value);
  });

  return {
    isFetching: procedures.isFetching,
    items: procs
  };
};

let mapDispatchToProps = function(dispatch) {
    return {
      fetchProcedures: function() {
        dispatch(fetchProcedures());
      },
      fetchFolders: function() {
        dispatch(fetchFolders());
      },
      routeToLocation: function() {
        dispatch(routeToLocation());
      }
    }
};

let mapStateToProps = function(state) {
    return {
      bootstrap: state.bootstrap,
      procedures: getProcedures(state.procedures),
      folders: state.folders
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
