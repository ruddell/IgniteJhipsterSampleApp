import React from 'react'
import { Alert, ScrollView, Text } from 'react-native'
import { connect } from 'react-redux'
import { Navigation } from 'react-native-navigation'
import { jobHistoryEntityEditScreen } from '../../../navigation/layouts'

import JobHistoryActions from './job-history.reducer'
import RoundedButton from '../../../shared/components/rounded-button/rounded-button'
import styles from './job-history-entity-detail-screen-style'

class JobHistoryEntityDetailScreen extends React.Component {
  constructor (props) {
    super(props)
    Navigation.events().bindComponent(this)
    this.state = {
      entityId: props.data.entityId,
      jobHistory: {},
      deleting: false
    }
  }

  componentWillMount () {
    this.props.getJobHistory(this.props.data.entityId)
  }

  componentWillReceiveProps (newProps) {
    if (newProps.jobHistory) {
      this.setState({ jobHistory: newProps.jobHistory })
    }

    if (this.state.deleting && newProps.deleting === false) {
      if (!newProps.errorDeleting) {
        this.props.getAllJobHistories()
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
      'Delete JobHistory?',
      'Are you sure you want to delete the JobHistory?',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'OK',
          onPress: () => {
            this.setState({ deleting: true }, () => {
              this.props.deleteJobHistory(this.props.data.entityId)
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
        <Text>ID: {this.state.jobHistory.id}</Text>
        <Text testID='startDate'>StartDate: {this.state.jobHistory.startDate}</Text>
        <Text testID='endDate'>EndDate: {this.state.jobHistory.endDate}</Text>
        <Text testID='language'>Language: {this.state.jobHistory.language}</Text>
        <RoundedButton text='Edit' onPress={jobHistoryEntityEditScreen.bind(this, { entityId: this.state.jobHistory.id })} />
        <RoundedButton text='Delete' onPress={this.confirmDelete} />
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    jobHistory: state.jobHistories.jobHistory,
    deleting: state.jobHistories.deleting,
    errorDeleting: state.jobHistories.errorDeleting
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getJobHistory: (id) => dispatch(JobHistoryActions.jobHistoryRequest(id)),
    getAllJobHistories: (options) => dispatch(JobHistoryActions.jobHistoryAllRequest(options)),
    deleteJobHistory: (id) => dispatch(JobHistoryActions.jobHistoryDeleteRequest(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(JobHistoryEntityDetailScreen)
