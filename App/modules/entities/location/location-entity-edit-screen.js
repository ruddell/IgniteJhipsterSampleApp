import React from 'react'
import { Alert, ScrollView, Text, TouchableHighlight } from 'react-native'
import { connect } from 'react-redux'
import LocationActions from './location.reducer'
import CountryActions from '../country/country.reducer'
import { Navigation } from 'react-native-navigation'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { locationEntityDetailScreen } from '../../../navigation/layouts'

import t from 'tcomb-form-native'

import styles from './location-entity-edit-screen-style'

let Form = t.form.Form

class LocationEntityEditScreen extends React.Component {
  constructor (props) {
    super(props)
    Navigation.events().bindComponent(this)
    this.state = {
      updating: props.data.entityId !== null && props.data.entityId !== undefined,
      formModel: t.struct({
        id: t.maybe(t.Number),
        streetAddress: t.maybe(t.String),
        postalCode: t.maybe(t.String),
        city: t.maybe(t.String),
        stateProvince: t.maybe(t.String),
        countryId: this.getCountries()
      }),
      formValue: { id: null },
      formOptions: {
        fields: {
          id: {
            hidden: true
          },
          countryId: {
            testID: 'countryIdInput',
            label: 'Country'
          },
          streetAddress: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.refs.form.getComponent('postalCode').refs.input.focus(),
            testID: 'streetAddressInput'
          },
          postalCode: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.refs.form.getComponent('city').refs.input.focus(),
            testID: 'postalCodeInput'
          },
          city: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.refs.form.getComponent('stateProvince').refs.input.focus(),
            testID: 'cityInput'
          },
          stateProvince: {
            testID: 'stateProvinceInput'
          }
        }
      },
      success: false,
      location: {}
    }

    this.submitForm = this.submitForm.bind(this)
    this.formChange = this.formChange.bind(this)
  }

  componentWillMount () {
    if (this.props.data.entityId) {
      this.props.getLocation(this.props.data.entityId)
    } else {
      this.setState({formValue: { id: null }})
    }
    this.props.getAllCountries()
  }

  componentWillReceiveProps (newProps) {
    if (newProps.location && !newProps.updating && !this.state.requesting && this.state.updating) {
      this.setState({
        formValue: this.entityToFormValue(newProps.location)
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
        this.props.getAllLocations({page: 0, sort: 'id,asc', size: 20})
        const entityId = newProps.location.id
        const alertOptions = [{ text: 'OK' }]
        if (!this.state.formValue.id) {
          alertOptions.push({
            text: 'View',
            onPress: locationEntityDetailScreen.bind(this, { entityId })
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
      streetAddress: value.streetAddress || null,
      postalCode: value.postalCode || null,
      city: value.city || null,
      stateProvince: value.stateProvince || null,
      countryId: value.countryId || null
    }
  }
  formValueToEntity = (value) => {
    const entity = {
      id: value.id || null,
      streetAddress: value.streetAddress || null,
      postalCode: value.postalCode || null,
      city: value.city || null,
      stateProvince: value.stateProvince || null,
      countryId: value.countryId || null
    }
    return entity
  }

  getCountries = () => {
    const countries = {}
    this.props.countries.forEach(country => {
      countries[country.id] = country.countryName ? country.countryName.toString() : country.id.toString()
    })
    return t.maybe(t.enums(countries))
  }
  submitForm () {
    this.setState({
      success: false,
      requesting: true
    })
    // call getValue() to get the values of the form
    const location = this.refs.form.getValue()
    if (location) { // if validation fails, value will be null
      this.props.updateLocation(this.formValueToEntity(location))
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
    countries: state.countries.countries || [],
    location: state.locations.location,
    fetching: state.locations.fetchingOne,
    updating: state.locations.updating,
    error: state.locations.errorUpdating
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getAllCountries: (options) => dispatch(CountryActions.countryAllRequest(options)),
    getLocation: (id) => dispatch(LocationActions.locationRequest(id)),
    getAllLocations: (options) => dispatch(LocationActions.locationAllRequest(options)),
    updateLocation: (location) => dispatch(LocationActions.locationUpdateRequest(location))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LocationEntityEditScreen)
