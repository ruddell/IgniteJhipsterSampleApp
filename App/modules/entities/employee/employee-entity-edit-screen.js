import React from 'react'
import { Alert, ScrollView, Text, TouchableHighlight } from 'react-native'
import { connect } from 'react-redux'
import EmployeeActions from './employee.reducer'
import DepartmentActions from '../department/department.reducer'
import { Navigation } from 'react-native-navigation'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { employeeEntityDetailScreen } from '../../../navigation/layouts'

import t from 'tcomb-form-native'

import styles from './employee-entity-edit-screen-style'

let Form = t.form.Form

class EmployeeEntityEditScreen extends React.Component {
  constructor (props) {
    super(props)
    Navigation.events().bindComponent(this)
    this.state = {
      updating: props.data.entityId !== null && props.data.entityId !== undefined,
      formModel: t.struct({
        id: t.maybe(t.Number),
        firstName: t.maybe(t.String),
        lastName: t.maybe(t.String),
        email: t.maybe(t.String),
        phoneNumber: t.maybe(t.String),
        hireDate: t.maybe(t.Date),
        salary: t.maybe(t.Number),
        commissionPct: t.maybe(t.Number),
        employeeId: this.getEmployees(),
        departmentId: this.getDepartments()
      }),
      formValue: { id: null },
      formOptions: {
        fields: {
          id: {
            hidden: true
          },
          employeeId: {
            testID: 'employeeIdInput',
            label: 'Manager'
          },
          departmentId: {
            testID: 'departmentIdInput',
            label: 'Department'
          },
          firstName: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.refs.form.getComponent('lastName').refs.input.focus(),
            testID: 'firstNameInput'
          },
          lastName: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.refs.form.getComponent('email').refs.input.focus(),
            testID: 'lastNameInput'
          },
          email: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.refs.form.getComponent('phoneNumber').refs.input.focus(),
            testID: 'emailInput'
          },
          phoneNumber: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.refs.form.getComponent('hireDate').refs.input.focus(),
            testID: 'phoneNumberInput'
          },
          hireDate: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.refs.form.getComponent('salary').refs.input.focus(),
            testID: 'hireDateInput'
          },
          salary: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.refs.form.getComponent('commissionPct').refs.input.focus(),
            testID: 'salaryInput'
          },
          commissionPct: {
            testID: 'commissionPctInput'
          }
        }
      },
      success: false,
      employee: {}
    }

    this.submitForm = this.submitForm.bind(this)
    this.formChange = this.formChange.bind(this)
  }

  componentWillMount () {
    if (this.props.data.entityId) {
      this.props.getEmployee(this.props.data.entityId)
    } else {
      this.setState({formValue: { id: null }})
    }
    this.props.getAllEmployees()
    this.props.getAllDepartments()
  }

  componentWillReceiveProps (newProps) {
    if (newProps.employee && !newProps.updating && !this.state.requesting && this.state.updating) {
      this.setState({
        formValue: this.entityToFormValue(newProps.employee)
      })
    }

    // Did the update attempt complete?
    if (!newProps.updating && this.state.requesting) {
      if (newProps.error) {
        Alert.alert('Error', 'Something went wrong updating the entity', [{text: 'OK'}])
        this.setState({
          success: false,
          requesting: false
        })
      } else {
        this.props.getAllEmployees({page: 0, sort: 'id,asc', size: 20})
        const entityId = newProps.employee.id
        const alertOptions = [{ text: 'OK' }]
        if (!this.state.formValue.id) {
          alertOptions.push({
            text: 'View',
            onPress: employeeEntityDetailScreen.bind(this, { entityId })
          })
        }
        this.setState({
          success: true,
          requesting: false,
          formValue: { id: null }
        })
        Navigation.pop(this.props.componentId)
        Alert.alert('Success', 'Entity saved successfully', alertOptions)
      }
    }
  }

  // convenience methods for customizing the mapping of the entity to/from the form value
  entityToFormValue = (value) => {
    if (!value) {
      return {}
    }
    return {
      id: value.id || null,
      firstName: value.firstName || null,
      lastName: value.lastName || null,
      email: value.email || null,
      phoneNumber: value.phoneNumber || null,
      hireDate: value.hireDate || null,
      salary: value.salary || null,
      commissionPct: value.commissionPct || null,
      employeeId: value.employeeId || null,
      departmentId: value.departmentId || null
    }
  }
  formValueToEntity = (value) => {
    const entity = {
      id: value.id || null,
      firstName: value.firstName || null,
      lastName: value.lastName || null,
      email: value.email || null,
      phoneNumber: value.phoneNumber || null,
      hireDate: value.hireDate || null,
      salary: value.salary || null,
      commissionPct: value.commissionPct || null,
      employeeId: value.employeeId || null,
      departmentId: value.departmentId || null
    }
    return entity
  }

  getEmployees = () => {
    const employees = {}
    this.props.employees.forEach(employee => {
      employees[employee.id] = employee.id ? employee.id.toString() : employee.id.toString()
    })
    return t.maybe(t.enums(employees))
  }
  getDepartments = () => {
    const departments = {}
    this.props.departments.forEach(department => {
      departments[department.id] = department.departmentName ? department.departmentName.toString() : department.id.toString()
    })
    return t.maybe(t.enums(departments))
  }
  submitForm () {
    this.setState({
      success: false,
      requesting: true
    })
    // call getValue() to get the values of the form
    const employee = this.refs.form.getValue()
    if (employee) { // if validation fails, value will be null
      this.props.updateEmployee(this.formValueToEntity(employee))
    }
  }

  formChange (newValue) {
    this.setState({
      formValue: newValue
    })
  }

  render () {
    return (
      <KeyboardAwareScrollView>
        <ScrollView style={styles.container} testID='entityScrollView'>
          <Form
            ref='form'
            type={this.state.formModel}
            options={this.state.formOptions}
            value={this.state.formValue}
            onChange={this.formChange}
          />
          <TouchableHighlight style={styles.button} onPress={this.submitForm} underlayColor='#99d9f4' testID='submitButton'>
            <Text style={styles.buttonText}>Save</Text>
          </TouchableHighlight>
        </ScrollView>
      </KeyboardAwareScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    employees: state.employees.employees || [],
    departments: state.departments.departments || [],
    employee: state.employees.employee,
    fetching: state.employees.fetchingOne,
    updating: state.employees.updating,
    error: state.employees.errorUpdating
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getAllDepartments: (options) => dispatch(DepartmentActions.departmentAllRequest(options)),
    getEmployee: (id) => dispatch(EmployeeActions.employeeRequest(id)),
    getAllEmployees: (options) => dispatch(EmployeeActions.employeeAllRequest(options)),
    updateEmployee: (employee) => dispatch(EmployeeActions.employeeUpdateRequest(employee))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeEntityEditScreen)
