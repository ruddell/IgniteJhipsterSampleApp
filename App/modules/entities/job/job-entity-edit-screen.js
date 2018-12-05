import React from 'react'
import { Alert, ScrollView, Text, TouchableHighlight } from 'react-native'
import { connect } from 'react-redux'
import JobActions from './job.reducer'
import TaskActions from '../task/task.reducer'
import EmployeeActions from '../employee/employee.reducer'
import { Navigation } from 'react-native-navigation'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { jobEntityDetailScreen } from '../../../navigation/layouts'

import t from 'tcomb-form-native'

import styles from './job-entity-edit-screen-style'

let Form = t.form.Form

class JobEntityEditScreen extends React.Component {
  constructor (props) {
    super(props)
    Navigation.events().bindComponent(this)
    this.state = {
      updating: props.data.entityId !== null && props.data.entityId !== undefined,
      formModel: t.struct({
        id: t.maybe(t.Number),
        jobTitle: t.maybe(t.String),
        minSalary: t.maybe(t.Number),
        maxSalary: t.maybe(t.Number),
        tasks: t.list(this.getTasks()),
        employeeId: this.getEmployees()
      }),
      formValue: { id: null },
      formOptions: {
        fields: {
          id: {
            hidden: true
          },
          taskId: {
            testID: 'taskIdInput',
            label: 'Task'
          },
          employeeId: {
            testID: 'employeeIdInput',
            label: 'Employee'
          },
          jobTitle: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.refs.form.getComponent('minSalary').refs.input.focus(),
            testID: 'jobTitleInput'
          },
          minSalary: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.refs.form.getComponent('maxSalary').refs.input.focus(),
            testID: 'minSalaryInput'
          },
          maxSalary: {
            testID: 'maxSalaryInput'
          }
        }
      },
      success: false,
      job: {}
    }

    this.submitForm = this.submitForm.bind(this)
    this.formChange = this.formChange.bind(this)
  }

  componentWillMount () {
    if (this.props.data.entityId) {
      this.props.getJob(this.props.data.entityId)
    } else {
      this.setState({formValue: { id: null }})
    }
    this.props.getAllTasks()
    this.props.getAllEmployees()
  }

  componentWillReceiveProps (newProps) {
    if (newProps.job && !newProps.updating && !this.state.requesting && this.state.updating) {
      this.setState({
        formValue: this.entityToFormValue(newProps.job)
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
        this.props.getAllJobs({page: 0, sort: 'id,asc', size: 20})
        const entityId = newProps.job.id
        const alertOptions = [{ text: 'OK' }]
        if (!this.state.formValue.id) {
          alertOptions.push({
            text: 'View',
            onPress: jobEntityDetailScreen.bind(this, { entityId })
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
      jobTitle: value.jobTitle || null,
      minSalary: value.minSalary || null,
      maxSalary: value.maxSalary || null,
      tasks: [].concat(value.tasks.map((task) => { return task.id })),
      employeeId: value.employeeId || null
    }
  }
  formValueToEntity = (value) => {
    const entity = {
      id: value.id || null,
      jobTitle: value.jobTitle || null,
      minSalary: value.minSalary || null,
      maxSalary: value.maxSalary || null,
      tasks: [].concat(value.tasks.map((task) => { return {id: task} })),
      employeeId: value.employeeId || null
    }
    return entity
  }

  getTasks = () => {
    const tasks = {}
    this.props.tasks.forEach(task => {
      tasks[task.id] = task.title ? task.title.toString() : task.id.toString()
    })
    return t.maybe(t.enums(tasks))
  }
  getEmployees = () => {
    const employees = {}
    this.props.employees.forEach(employee => {
      employees[employee.id] = employee.email ? employee.email.toString() : employee.id.toString()
    })
    return t.maybe(t.enums(employees))
  }
  submitForm () {
    this.setState({
      success: false,
      requesting: true
    })
    // call getValue() to get the values of the form
    const job = this.refs.form.getValue()
    if (job) { // if validation fails, value will be null
      this.props.updateJob(this.formValueToEntity(job))
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
    tasks: state.tasks.tasks || [],
    employees: state.employees.employees || [],
    job: state.jobs.job,
    fetching: state.jobs.fetchingOne,
    updating: state.jobs.updating,
    error: state.jobs.errorUpdating
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getAllTasks: (options) => dispatch(TaskActions.taskAllRequest(options)),
    getAllEmployees: (options) => dispatch(EmployeeActions.employeeAllRequest(options)),
    getJob: (id) => dispatch(JobActions.jobRequest(id)),
    getAllJobs: (options) => dispatch(JobActions.jobAllRequest(options)),
    updateJob: (job) => dispatch(JobActions.jobUpdateRequest(job))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(JobEntityEditScreen)
