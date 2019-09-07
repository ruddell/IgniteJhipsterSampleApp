import React from 'react'
import { Alert, ScrollView, Text, TouchableHighlight } from 'react-native'
import { connect } from 'react-redux'
import CountryActions from './country.reducer'
import RegionActions from '../region/region.reducer'
import { Navigation } from 'react-native-navigation'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { countryEntityDetailScreen } from '../../../navigation/layouts'

import t from 'tcomb-form-native'

import styles from './country-entity-edit-screen-style'

let Form = t.form.Form

class CountryEntityEditScreen extends React.Component {
  constructor (props) {
    super(props)
    Navigation.events().bindComponent(this)
    this.state = {
      updating: props.data.entityId !== null && props.data.entityId !== undefined,
      formModel: t.struct({
        id: t.maybe(t.Number),
        countryName: t.maybe(t.String),
        regionId: this.getRegions()
      }),
      formValue: { id: null },
      formOptions: {
        fields: {
          id: {
            hidden: true
          },
          regionId: {
            testID: 'regionIdInput',
            label: 'Region'
          },
          countryName: {
            testID: 'countryNameInput'
          }
        }
      },
      success: false,
      country: {}
    }

    this.submitForm = this.submitForm.bind(this)
    this.formChange = this.formChange.bind(this)
  }

  componentWillMount () {
    if (this.props.data.entityId) {
      this.props.getCountry(this.props.data.entityId)
    } else {
      this.setState({formValue: { id: null }})
    }
    this.props.getAllRegions()
  }

  componentWillReceiveProps (newProps) {
    if (newProps.country && !newProps.updating && !this.state.requesting && this.state.updating) {
      this.setState({
        formValue: this.entityToFormValue(newProps.country)
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
        this.props.getAllCountries({page: 0, sort: 'id,asc', size: 20})
        const entityId = newProps.country.id
        const alertOptions = [{ text: 'OK' }]
        if (!this.state.formValue.id) {
          alertOptions.push({
            text: 'View',
            onPress: countryEntityDetailScreen.bind(this, { entityId })
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
      countryName: value.countryName || null,
      regionId: value.regionId || null
    }
  }
  formValueToEntity = (value) => {
    const entity = {
      id: value.id || null,
      countryName: value.countryName || null,
      regionId: value.regionId || null
    }
    return entity
  }

  getRegions = () => {
    const regions = {}
    this.props.regions.forEach(region => {
      regions[region.id] = region.regionName ? region.regionName.toString() : region.id.toString()
    })
    return t.maybe(t.enums(regions))
  }
  submitForm () {
    this.setState({
      success: false,
      requesting: true
    })
    // call getValue() to get the values of the form
    const country = this.refs.form.getValue()
    if (country) { // if validation fails, value will be null
      this.props.updateCountry(this.formValueToEntity(country))
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
    regions: state.regions.regions || [],
    country: state.countries.country,
    fetching: state.countries.fetchingOne,
    updating: state.countries.updating,
    error: state.countries.errorUpdating
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getAllRegions: (options) => dispatch(RegionActions.regionAllRequest(options)),
    getCountry: (id) => dispatch(CountryActions.countryRequest(id)),
    getAllCountries: (options) => dispatch(CountryActions.countryAllRequest(options)),
    updateCountry: (country) => dispatch(CountryActions.countryUpdateRequest(country))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CountryEntityEditScreen)
