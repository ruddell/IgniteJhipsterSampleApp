import React from 'react'
import { Alert, ScrollView, Text } from 'react-native'
import { connect } from 'react-redux'
import { Navigation } from 'react-native-navigation'
import { employeeEntityEditScreen } from '../../../navigation/layouts'

import EmployeeActions from './employee.reducer'
import RoundedButton from '../../../shared/components/rounded-button/rounded-button'
import styles from './employee-entity-detail-screen-style'

class EmployeeEntityDetailScreen extends React.Component {
  constructor (props) {
    super(props)
    Navigation.events().bindComponent(this)
    this.state = {
      entityId: props.data.entityId,
      employee: {},
      deleting: false
    }
  }

  componentWillMount () {
    this.props.getEmployee(this.props.data.entityId)
  }

  componentWillReceiveProps (newProps) {
    if (newProps.employee) {
      this.setState({ employee: newProps.employee })
    }

    if (this.state.deleting && newProps.deleting === false) {
      if (!newProps.errorDeleting) {
        this.props.getAllEmployees()
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
      'Delete Employee?',
      'Are you sure you want to delete the Employee?',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'OK',
          onPress: () => {
            this.setState({ deleting: true }, () => {
              this.props.deleteEmployee(this.props.data.entityId)
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
        <Text>ID: {this.state.employee.id}</Text>
        <Text testID='firstName'>FirstName: {this.state.employee.firstName}</Text>
        <Text testID='lastName'>LastName: {this.state.employee.lastName}</Text>
        <Text testID='email'>Email: {this.state.employee.email}</Text>
        <Text testID='phoneNumber'>PhoneNumber: {this.state.employee.phoneNumber}</Text>
        <Text testID='hireDate'>HireDate: {this.state.employee.hireDate}</Text>
        <Text testID='salary'>Salary: {this.state.employee.salary}</Text>
        <Text testID='commissionPct'>CommissionPct: {this.state.employee.commissionPct}</Text>
        <RoundedButton text='Edit' onPress={employeeEntityEditScreen.bind(this, { entityId: this.state.employee.id })} />
        <RoundedButton text='Delete' onPress={this.confirmDelete} />
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    employee: state.employees.employee,
    deleting: state.employees.deleting,
    errorDeleting: state.employees.errorDeleting
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getEmployee: (id) => dispatch(EmployeeActions.employeeRequest(id)),
    getAllEmployees: (options) => dispatch(EmployeeActions.employeeAllRequest(options)),
    deleteEmployee: (id) => dispatch(EmployeeActions.employeeDeleteRequest(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeEntityDetailScreen)
