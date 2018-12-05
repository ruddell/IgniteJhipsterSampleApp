import React from 'react'
import { Alert, ScrollView, Text, TouchableHighlight } from 'react-native'
import { connect } from 'react-redux'
import RegionActions from './region.reducer'
import { Navigation } from 'react-native-navigation'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { regionEntityDetailScreen } from '../../../navigation/layouts'

import t from 'tcomb-form-native'

import styles from './region-entity-edit-screen-style'

let Form = t.form.Form

class RegionEntityEditScreen extends React.Component {
  constructor (props) {
    super(props)
    Navigation.events().bindComponent(this)
    this.state = {
      updating: props.data.entityId !== null && props.data.entityId !== undefined,
      formModel: t.struct({
        id: t.maybe(t.Number),
        regionName: t.maybe(t.String)
      }),
      formValue: { id: null },
      formOptions: {
        fields: {
          id: {
            hidden: true
          },
          regionName: {
            returnKeyType: 'done',
            onSubmitEditing: () => this.submitForm(),
            testID: 'regionNameInput'
          }
        }
      },
      success: false,
      region: {}
    }

    this.submitForm = this.submitForm.bind(this)
    this.formChange = this.formChange.bind(this)
  }

  componentWillMount () {
    if (this.props.data.entityId) {
      this.props.getRegion(this.props.data.entityId)
    } else {
      this.setState({formValue: { id: null }})
    }
  }

  componentWillReceiveProps (newProps) {
    if (newProps.region && !newProps.updating && !this.state.requesting && this.state.updating) {
      this.setState({
        formValue: this.entityToFormValue(newProps.region)
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
        this.props.getAllRegions({page: 0, sort: 'id,asc', size: 20})
        const entityId = newProps.region.id
        const alertOptions = [{ text: 'OK' }]
        if (!this.state.formValue.id) {
          alertOptions.push({
            text: 'View',
            onPress: regionEntityDetailScreen.bind(this, { entityId })
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
      regionName: value.regionName || null
    }
  }
  formValueToEntity = (value) => {
    const entity = {
      id: value.id || null,
      regionName: value.regionName || null
    }
    return entity
  }

  submitForm () {
    this.setState({
      success: false,
      requesting: true
    })
    // call getValue() to get the values of the form
    const region = this.refs.form.getValue()
    if (region) { // if validation fails, value will be null
      this.props.updateRegion(this.formValueToEntity(region))
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
    region: state.regions.region,
    fetching: state.regions.fetchingOne,
    updating: state.regions.updating,
    error: state.regions.errorUpdating
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getRegion: (id) => dispatch(RegionActions.regionRequest(id)),
    getAllRegions: (options) => dispatch(RegionActions.regionAllRequest(options)),
    updateRegion: (region) => dispatch(RegionActions.regionUpdateRequest(region))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegionEntityEditScreen)
