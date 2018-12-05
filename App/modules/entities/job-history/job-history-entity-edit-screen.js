import React from 'react'
import { Alert, ScrollView, Text, TouchableHighlight } from 'react-native'
import { connect } from 'react-redux'
import JobHistoryActions from './job-history.reducer'
import JobActions from '../job/job.reducer'
import DepartmentActions from '../department/department.reducer'
import EmployeeActions from '../employee/employee.reducer'
import { Navigation } from 'react-native-navigation'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { jobHistoryEntityDetailScreen } from '../../../navigation/layouts'

import t from 'tcomb-form-native'

import styles from './job-history-entity-edit-screen-style'

let Form = t.form.Form
const Language = t.enums({
  FRENCH: 'FRENCH',
  ENGLISH: 'ENGLISH',
  SPANISH: 'SPANISH'
})

class JobHistoryEntityEditScreen extends React.Component {
  constructor (props) {
    super(props)
    Navigation.events().bindComponent(this)
    this.state = {
      updating: props.data.entityId !== null && props.data.entityId !== undefined,
      formModel: t.struct({
        id: t.maybe(t.Number),
        startDate: t.maybe(t.Date),
        endDate: t.maybe(t.Date),
        language: t.maybe(Language),
        jobId: this.getJobs(),
        departmentId: this.getDepartments(),
        employeeId: this.getEmployees()
      }),
      formValue: { id: null },
      formOptions: {
        fields: {
          id: {
            hidden: true
          },
          jobId: {
            testID: 'jobIdInput',
            label: 'Job'
          },
          departmentId: {
            testID: 'departmentIdInput',
            label: 'Department'
          },
          employeeId: {
            testID: 'employeeIdInput',
            label: 'Employee'
          },
          startDate: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.refs.form.getComponent('endDate').refs.input.focus(),
            testID: 'startDateInput'
          },
          endDate: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.refs.form.getComponent('language').refs.input.focus(),
            testID: 'endDateInput'
          },
          language: {
            testID: 'languageInput'
          }
        }
      },
      success: false,
      jobHistory: {}
    }

    this.submitForm = this.submitForm.bind(this)
    this.formChange = this.formChange.bind(this)
  }

  componentWillMount () {
    if (this.props.data.entityId) {
      this.props.getJobHistory(this.props.data.entityId)
    } else {
      this.setState({formValue: { id: null }})
    }
    this.props.getAllJobs()
    this.props.getAllDepartments()
    this.props.getAllEmployees()
  }

  componentWillReceiveProps (newProps) {
    if (newProps.jobHistory && !newProps.updating && !this.state.requesting && this.state.updating) {
      this.setState({
        formValue: this.entityToFormValue(newProps.jobHistory)
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
        this.props.getAllJobHistories({page: 0, sort: 'id,asc', size: 20})
        const entityId = newProps.jobHistory.id
        const alertOptions = [{ text: 'OK' }]
        if (!this.state.formValue.id) {
          alertOptions.push({
            text: 'View',
            onPress: jobHistoryEntityDetailScreen.bind(this, { entityId })
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
      startDate: value.startDate || null,
      endDate: value.endDate || null,
      language: value.language || null,
      jobId: value.jobId || null,
      departmentId: value.departmentId || null,
      employeeId: value.employeeId || null
    }
  }
  formValueToEntity = (value) => {
    const entity = {
      id: value.id || null,
      startDate: value.startDate || null,
      endDate: value.endDate || null,
      language: value.language || null,
      jobId: value.jobId || null,
      departmentId: value.departmentId || null,
      employeeId: value.employeeId || null
    }
    return entity
  }

  getJobs = () => {
    const jobs = {}
    this.props.jobs.forEach(job => {
      jobs[job.id] = job.id ? job.id.toString() : job.id.toString()
    })
    return t.maybe(t.enums(jobs))
  }
  getDepartments = () => {
    const departments = {}
    this.props.departments.forEach(department => {
      departments[department.id] = department.id ? department.id.toString() : department.id.toString()
    })
    return t.maybe(t.enums(departments))
  }
  getEmployees = () => {
    const employees = {}
    this.props.employees.forEach(employee => {
      employees[employee.id] = employee.id ? employee.id.toString() : employee.id.toString()
    })
    return t.maybe(t.enums(employees))
  }
  submitForm () {
    this.setState({
      success: false,
      requesting: true
    })
    // call getValue() to get the values of the form
    const jobHistory = this.refs.form.getValue()
    if (jobHistory) { // if validation fails, value will be null
      this.props.updateJobHistory(this.formValueToEntity(jobHistory))
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
    jobs: state.jobs.jobs || [],
    departments: state.departments.departments || [],
    employees: state.employees.employees || [],
    jobHistory: state.jobHistories.jobHistory,
    fetching: state.jobHistories.fetchingOne,
    updating: state.jobHistories.updating,
    error: state.jobHistories.errorUpdating
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getAllJobs: (options) => dispatch(JobActions.jobAllRequest(options)),
    getAllDepartments: (options) => dispatch(DepartmentActions.departmentAllRequest(options)),
    getAllEmployees: (options) => dispatch(EmployeeActions.employeeAllRequest(options)),
    getJobHistory: (id) => dispatch(JobHistoryActions.jobHistoryRequest(id)),
    getAllJobHistories: (options) => dispatch(JobHistoryActions.jobHistoryAllRequest(options)),
    updateJobHistory: (jobHistory) => dispatch(JobHistoryActions.jobHistoryUpdateRequest(jobHistory))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(JobHistoryEntityEditScreen)
