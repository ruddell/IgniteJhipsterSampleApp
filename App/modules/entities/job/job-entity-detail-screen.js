import React from 'react'
import { Alert, ScrollView, Text } from 'react-native'
import { connect } from 'react-redux'
import { Navigation } from 'react-native-navigation'
import { jobEntityEditScreen } from '../../../navigation/layouts'

import JobActions from './job.reducer'
import RoundedButton from '../../../shared/components/rounded-button/rounded-button'
import styles from './job-entity-detail-screen-style'

class JobEntityDetailScreen extends React.Component {
  constructor (props) {
    super(props)
    Navigation.events().bindComponent(this)
    this.state = {
      entityId: props.data.entityId,
      job: {},
      deleting: false
    }
  }

  componentWillMount () {
    this.props.getJob(this.props.data.entityId)
  }

  componentWillReceiveProps (newProps) {
    if (newProps.job) {
      this.setState({ job: newProps.job })
    }

    if (this.state.deleting && newProps.deleting === false) {
      if (!newProps.errorDeleting) {
        this.props.getAllJobs()
        Navigation.pop(this.props.componentId)
      } else {
        Alert.alert('Error', 'Something went wrong deleting the entity', [{text: 'OK'}])
        this.setState({
          success: false,
          requesting: false
        })
      }
    }
  }

  confirmDelete = () => {
    Alert.alert(
      'Delete Job?',
      'Are you sure you want to delete the Job?',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'OK',
          onPress: () => {
            this.setState({ deleting: true }, () => {
              this.props.deleteJob(this.props.data.entityId)
            })
          }
        }
      ],
      { cancelable: false }
    )
  }

  render () {
    return (
      <ScrollView style={styles.container}>
        <Text>ID: {this.state.job.id}</Text>
        <Text testID='jobTitle'>JobTitle: {this.state.job.jobTitle}</Text>
        <Text testID='minSalary'>MinSalary: {this.state.job.minSalary}</Text>
        <Text testID='maxSalary'>MaxSalary: {this.state.job.maxSalary}</Text>
        <RoundedButton text='Edit' onPress={jobEntityEditScreen.bind(this, { entityId: this.state.job.id })} />
        <RoundedButton text='Delete' onPress={this.confirmDelete} />
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    job: state.jobs.job,
    deleting: state.jobs.deleting,
    errorDeleting: state.jobs.errorDeleting
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getJob: (id) => dispatch(JobActions.jobRequest(id)),
    getAllJobs: (options) => dispatch(JobActions.jobAllRequest(options)),
    deleteJob: (id) => dispatch(JobActions.jobDeleteRequest(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(JobEntityDetailScreen)
