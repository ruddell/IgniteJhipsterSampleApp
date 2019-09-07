import React from 'react'
import { Alert, ScrollView, Text } from 'react-native'
import { connect } from 'react-redux'
import { Navigation } from 'react-native-navigation'
import { departmentEntityEditScreen } from '../../../navigation/layouts'

import DepartmentActions from './department.reducer'
import RoundedButton from '../../../shared/components/rounded-button/rounded-button'
import styles from './department-entity-detail-screen-style'

class DepartmentEntityDetailScreen extends React.Component {
  constructor (props) {
    super(props)
    Navigation.events().bindComponent(this)
    this.state = {
      entityId: props.data.entityId,
      department: {},
      deleting: false
    }
  }

  componentWillMount () {
    this.props.getDepartment(this.props.data.entityId)
  }

  componentWillReceiveProps (newProps) {
    if (newProps.department) {
      this.setState({ department: newProps.department })
    }

    if (this.state.deleting && newProps.deleting === false) {
      if (!newProps.errorDeleting) {
        this.props.getAllDepartments()
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
      'Delete Department?',
      'Are you sure you want to delete the Department?',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'OK',
          onPress: () => {
            this.setState({ deleting: true }, () => {
              this.props.deleteDepartment(this.props.data.entityId)
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
        <Text>ID: {this.state.department.id}</Text>
        <Text testID='departmentName'>DepartmentName: {this.state.department.departmentName}</Text>
        <RoundedButton text='Edit' onPress={departmentEntityEditScreen.bind(this, { entityId: this.state.department.id })} />
        <RoundedButton text='Delete' onPress={this.confirmDelete} />
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    department: state.departments.department,
    deleting: state.departments.deleting,
    errorDeleting: state.departments.errorDeleting
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getDepartment: (id) => dispatch(DepartmentActions.departmentRequest(id)),
    getAllDepartments: (options) => dispatch(DepartmentActions.departmentAllRequest(options)),
    deleteDepartment: (id) => dispatch(DepartmentActions.departmentDeleteRequest(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DepartmentEntityDetailScreen)
