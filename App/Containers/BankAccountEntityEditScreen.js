import React from 'react'
import { Alert, ScrollView, Text, TouchableHighlight } from 'react-native'
import { connect } from 'react-redux'
import BankAccountActions from '../Redux/BankAccountRedux'
import { Actions as NavigationActions } from 'react-native-router-flux'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import t from 'tcomb-form-native'

// Styles
import styles from './Styles/BankAccountEntityEditScreenStyle'

let Form = t.form.Form

class BankAccountEntityEditScreen extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      formModel: t.struct({
        id: t.maybe(t.Number),
        name: t.String,
        amount: t.Number,
        label: t.maybe(t.String)
      }),
      formValue: this.props.bankAccount,
      formOptions: {
        fields: {
          id: {
            hidden: true
          },
          name: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.refs.form.getComponent('amount').refs.input.focus()
          },
          amount: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.refs.form.getComponent('label').refs.input.focus()
          },
          label: {
            returnKeyType: 'done',
            onSubmitEditing: () => this.submitForm()
          }
        }
      },
      success: false,
      bankAccount: {}
    }

    this.submitForm = this.submitForm.bind(this)
    this.formChange = this.formChange.bind(this)
  }

  componentWillMount () {
    if (this.props.entityId) {
      this.props.getBankAccount(this.props.entityId)
    } else {
      this.setState({formValue: null})
    }
  }

  componentWillReceiveProps (newProps) {
    if (newProps.bankAccount) {
      this.setState({ bankAccount: newProps.bankAccount })
    }

    // Did the update attempt complete?
    if (!newProps.updating && this.state.requesting) {
      if (newProps.error) {
        if (newProps.error === 'WRONG') {
          Alert.alert('Error', 'Something went wrong updating the entity', [{text: 'OK'}])
        }
        this.setState({
          success: false,
          requesting: false
        })
      } else {
        this.setState({
          success: true,
          requesting: false,
          formValue: {}
        })
        Alert.alert('Success', 'Entity saved successfully', [{text: 'OK'}])
        this.props.getAllBankAccounts({page: 0, sort: 'id,asc', size: 20})
        NavigationActions.pop()
      }
    }
  }

  submitForm () {
    this.setState({
      success: false,
      requesting: true
    })
    // call getValue() to get the values of the form
    const bankAccount = this.refs.form.getValue()
    if (bankAccount) { // if validation fails, value will be null
      this.props.updateBankAccount(bankAccount)
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
        <ScrollView style={styles.container}>
          <Form
            ref='form'
            type={this.state.formModel}
            options={this.state.formOptions}
            value={this.state.formValue}
            onChange={this.formChange}
          />
          <TouchableHighlight style={styles.button} onPress={this.submitForm} underlayColor='#99d9f4'>
            <Text style={styles.buttonText}>Save</Text>
          </TouchableHighlight>
        </ScrollView>
      </KeyboardAwareScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    bankAccount: state.bankAccounts.bankAccount,
    fetching: state.bankAccounts.fetchingOne,
    updating: state.bankAccounts.updating,
    error: state.bankAccounts.errorOne
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getBankAccount: (id) => dispatch(BankAccountActions.bankAccountRequest(id)),
    getAllBankAccounts: (options) => dispatch(BankAccountActions.bankAccountAllRequest(options)),
    updateBankAccount: (bankAccount) => dispatch(BankAccountActions.bankAccountUpdateRequest(bankAccount))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BankAccountEntityEditScreen)
