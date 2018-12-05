import React from 'react'
import { Alert, ScrollView, Text, TouchableHighlight } from 'react-native'
import { connect } from 'react-redux'
import DepartmentActions from './department.reducer'
import LocationActions from '../location/location.reducer'
import { Navigation } from 'react-native-navigation'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { departmentEntityDetailScreen } from '../../../navigation/layouts'

import t from 'tcomb-form-native'

import styles from './department-entity-edit-screen-style'

let Form = t.form.Form

class DepartmentEntityEditScreen extends React.Component {
  constructor (props) {
    super(props)
    Navigation.events().bindComponent(this)
    this.state = {
      updating: props.data.entityId !== null && props.data.entityId !== undefined,
      formModel: t.struct({
        id: t.maybe(t.Number),
        departmentName: t.String,
        locationId: this.getLocations()
      }),
      formValue: { id: null },
      formOptions: {
        fields: {
          id: {
            hidden: true
          },
          locationId: {
            testID: 'locationIdInput',
            label: 'Location'
          },
          departmentName: {
            testID: 'departmentNameInput'
          }
        }
      },
      success: false,
      department: {}
    }

    this.submitForm = this.submitForm.bind(this)
    this.formChange = this.formChange.bind(this)
  }

  componentWillMount () {
    if (this.props.data.entityId) {
      this.props.getDepartment(this.props.data.entityId)
    } else {
      this.setState({formValue: { id: null }})
    }
    this.props.getAllLocations()
  }

  componentWillReceiveProps (newProps) {
    if (newProps.department && !newProps.updating && !this.state.requesting && this.state.updating) {
      this.setState({
        formValue: this.entityToFormValue(newProps.department)
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
        this.props.getAllDepartments({page: 0, sort: 'id,asc', size: 20})
        const entityId = newProps.department.id
        const alertOptions = [{ text: 'OK' }]
        if (!this.state.formValue.id) {
          alertOptions.push({
            text: 'View',
            onPress: departmentEntityDetailScreen.bind(this, { entityId })
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
      departmentName: value.departmentName || null,
      locationId: value.locationId || null
    }
  }
  formValueToEntity = (value) => {
    const entity = {
      id: value.id || null,
      departmentName: value.departmentName || null,
      locationId: value.locationId || null
    }
    return entity
  }

  getLocations = () => {
    const locations = {}
    this.props.locations.forEach(location => {
      locations[location.id] = location.streetAddress ? location.streetAddress.toString() : location.id.toString()
    })
    return t.maybe(t.enums(locations))
  }
  submitForm () {
    this.setState({
      success: false,
      requesting: true
    })
    // call getValue() to get the values of the form
    const department = this.refs.form.getValue()
    if (department) { // if validation fails, value will be null
      this.props.updateDepartment(this.formValueToEntity(department))
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
    locations: state.locations.locations || [],
    department: state.departments.department,
    fetching: state.departments.fetchingOne,
    updating: state.departments.updating,
    error: state.departments.errorUpdating
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getAllLocations: (options) => dispatch(LocationActions.locationAllRequest(options)),
    getDepartment: (id) => dispatch(DepartmentActions.departmentRequest(id)),
    getAllDepartments: (options) => dispatch(DepartmentActions.departmentAllRequest(options)),
    updateDepartment: (department) => dispatch(DepartmentActions.departmentUpdateRequest(department))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DepartmentEntityEditScreen)
