import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import Modal from 'material-ui/Modal'
import { CircularProgress } from 'material-ui/Progress'
import './details.css'

const styles = theme => ({
  paper: {
    margin: theme.spacing.unit,
    padding: theme.spacing.unit * 2,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 300,
  },
  button: {
   margin: theme.spacing.unit,
  },
  modalpaper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
  },
  progress: {
    margin: theme.spacing.unit * 1,
  },
});

const getModalStyle = () => {
  const top = 50 ;
  const left = 50 ;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

class Details extends Component {
  constructor(props){
    super(props);

    this.state = {
      name : '',
      email : '',
      open : false,
      open_loading : false
    }
  }

  setName(e){
    var name = e.target.value;
    this.setState( { name });
  }

  setEmail(e){
    var email = e.target.value;
    this.setState( { email });
  }

  submitData(){
    console.log(this.state);
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    console.log(re.test(this.state.email));

    if(!re.test(this.state.email)){
      this.setState({ open : true });
      setTimeout(() => this.setState({ open : false }), 2000);
    }
    else if(re.test(this.state.email)){
      this.setState({ open_loading : true });
      setTimeout(() => this.setState({ open_loading : false}), 3000);
    }
  }

  render(){
    return (
      <div className='root'>
        <div className='wrapper'>
          <Paper className={this.props.classes.paper}>
            <Grid container wrap='nowrap'>
              <Grid item xs zeroMinWidth>
                <h3>Subscribe to our weekly Newsletter</h3>
                  <TextField
                     id="with-placeholder"
                     label="name"
                     placeholder="name"
                     className={this.props.classes.textField}
                     margin="normal"
                     onChange={this.setName.bind(this)}
                   />
                   <TextField
                      id="with-placeholder"
                      label="e-mail"
                      placeholder="e-mail"
                      className={this.props.classes.textField}
                      margin="normal"
                      onChange={this.setEmail.bind(this)}
                    />
                    <Button
                      variant='raised'
                      color='primary'
                      className={this.props.classes.button}
                      size='medium'
                      onClick={this.submitData.bind(this)}>
                      Subscribe
                    </Button>
              </Grid>
            </Grid>
          </Paper>


          <Modal
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            open={this.state.open}
          >
            <div style={getModalStyle()} className={this.props.classes.modalpaper}>
              <Typography variant="subheading" id="simple-modal-description">
                Enter a valid email address
              </Typography>
            </div>
          </Modal>

          <Modal
            open={this.state.open_loading}
          >
            <div style={getModalStyle()} className={this.props.classes.modalpaper}>
              <CircularProgress className={this.props.classes.progress} size={40} />
              <h2> Please wait ...</h2>
            </div>
          </Modal>

        </div>
      </div>
    );
  }
}

Details.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Details);
