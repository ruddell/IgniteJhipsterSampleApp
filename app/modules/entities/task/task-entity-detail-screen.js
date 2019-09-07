import React from 'react'
import { Alert, ScrollView, Text } from 'react-native'
import { connect } from 'react-redux'
import { Navigation } from 'react-native-navigation'
import { taskEntityEditScreen } from '../../../navigation/layouts'

import TaskActions from './task.reducer'
import RoundedButton from '../../../shared/components/rounded-button/rounded-button'
import styles from './task-entity-detail-screen-style'

class TaskEntityDetailScreen extends React.Component {
  constructor (props) {
    super(props)
    Navigation.events().bindComponent(this)
    this.state = {
      entityId: props.data.entityId,
      task: {},
      deleting: false
    }
  }

  componentWillMount () {
    this.props.getTask(this.props.data.entityId)
  }

  componentWillReceiveProps (newProps) {
    if (newProps.task) {
      this.setState({ task: newProps.task })
    }

    if (this.state.deleting && newProps.deleting === false) {
      if (!newProps.errorDeleting) {
        this.props.getAllTasks()
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
      'Delete Task?',
      'Are you sure you want to delete the Task?',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'OK',
          onPress: () => {
            this.setState({ deleting: true }, () => {
              this.props.deleteTask(this.props.data.entityId)
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
        <Text>ID: {this.state.task.id}</Text>
        <Text testID='title'>Title: {this.state.task.title}</Text>
        <Text testID='description'>Description: {this.state.task.description}</Text>
        <RoundedButton text='Edit' onPress={taskEntityEditScreen.bind(this, { entityId: this.state.task.id })} />
        <RoundedButton text='Delete' onPress={this.confirmDelete} />
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    task: state.tasks.task,
    deleting: state.tasks.deleting,
    errorDeleting: state.tasks.errorDeleting
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getTask: (id) => dispatch(TaskActions.taskRequest(id)),
    getAllTasks: (options) => dispatch(TaskActions.taskAllRequest(options)),
    deleteTask: (id) => dispatch(TaskActions.taskDeleteRequest(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskEntityDetailScreen)
