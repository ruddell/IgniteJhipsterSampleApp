import React from 'react'
import { ScrollView, Text } from 'react-native'
import { connect } from 'react-redux'
import BankAccountActions from '../Redux/BankAccountRedux'
import RoundedButton from '../Components/RoundedButton'
import { Actions as NavigationActions } from 'react-native-router-flux'

// Styles
import styles from './Styles/BankAccountEntityDetailScreenStyle'

class BankAccountEntityDetailScreen extends React.Component {
  constructor (context, props) {
    super(context, props)
    this.state = {
      entityId: props.entityId,
      bankAccount: {}
    }
  }

  componentWillMount () {
    this.props.getBankAccount(this.props.entityId)
  }

  componentWillReceiveProps (newProps) {
    if (newProps.bankAccount) {
      this.setState({ bankAccount: newProps.bankAccount })
    }
  }

  render () {
    return (
      <ScrollView style={styles.container}>
        <Text>ID: {this.state.bankAccount.id}</Text>
        <Text>Name: {this.state.bankAccount.name}</Text>
        <Text>Amount: {this.state.bankAccount.amount}</Text>
        <Text>Label: {this.state.bankAccount.label}</Text>
        <RoundedButton text='Edit' onPress={NavigationActions.bankAccountEntityEdit.bind(this, { entityId: this.state.bankAccount.id })} />
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    bankAccount: state.bankAccounts.bankAccount
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getBankAccount: (id) => dispatch(BankAccountActions.bankAccountRequest(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BankAccountEntityDetailScreen)
