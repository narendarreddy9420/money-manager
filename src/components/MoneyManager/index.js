import {Component} from 'react'

import './index.css'
import {v4} from 'uuid'
import TransactionItem from '../TransactionItem'
import MoneyDetails from '../MoneyDetails'

const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
]

class MoneyManager extends Component {
  state = {
    titleIn: '',
    amountIn: '',
    typeIn: transactionTypeOptions[0].displayText,
    historyList: [],
  }

  onChangeValue = event => {
    this.setState({titleIn: event.target.value})
  }

  onChangeAmount = event => {
    this.setState({amountIn: event.target.value})
  }

  onChangeOption = event => {
    this.setState({typeIn: event.target.value})
  }

  onDeleteItem = id => {
    const {historyList} = this.state
    const result = historyList.filter(each => each.id !== id)
    this.setState({historyList: result})
  }

  onSubmitForm = event => {
    event.preventDefault()
    const {titleIn, amountIn, typeIn} = this.state
    const textOpt = transactionTypeOptions.find(
      each => each.optionId === typeIn,
    )
    const {displayText} = textOpt
    const newHistory = {
      id: v4(),
      title: titleIn,
      amount: parseInt(amountIn),
      type: displayText,
    }

    this.setState(prevState => ({
      historyList: [...prevState.historyList, newHistory],
      titleIn: '',
      amountIn: '',
      typeIn: transactionTypeOptions[0].displayText,
    }))
  }

  getIncome = () => {
    const {historyList} = this.state
    let incomeAmount = 0
    historyList.forEach(each => {
      if (each.type === transactionTypeOptions[0].displayText) {
        incomeAmount += each.amount
      }
    })
    return incomeAmount
  }

  getExpense = () => {
    const {historyList} = this.state
    let expenseAmount = 0
    historyList.forEach(each => {
      if (each.type === transactionTypeOptions[1].displayText) {
        expenseAmount += each.amount
      }
    })
    return expenseAmount
  }

  getBalance = () => {
    const {historyList} = this.state
    let incomeAmount = 0
    let expenseAmount = 0
    let balance = 0
    historyList.forEach(each => {
      if (each.type === transactionTypeOptions[0].displayText) {
        incomeAmount += each.amount
      } else {
        expenseAmount += each.amount
      }
    })
    balance = incomeAmount - expenseAmount
    return balance
  }

  render() {
    const incomeAmount = this.getIncome()
    const expenseAmount = this.getExpense()
    const balanceAmount = this.balance()
    const {titleIn, amountIn, typeIn, historyList} = this.state

    return (
      <div>
        <h1>Hi,Richard</h1>
        <p>Welcome back to money manager</p>

        <MoneyDetails
          incomeAmount={incomeAmount}
          expenseAmount={expenseAmount}
          balanceAmount={balanceAmount}
        />

        <form onSubmit={this.onSubmitForm}>
          <h1>Add transaction</h1>
          <label htmlFor="title">TITLE</label>
          <input
            type="text"
            id="title"
            onChange={this.onChangeValue}
            value={titleIn}
            placeholder="TITLE"
          />
          <label htmlFor="amount">AMOUNT</label>
          <input
            onChange={this.onChangeAmount}
            type="text"
            id="amount"
            value={amountIn}
            placeholder="AMOUNT"
          />
          <label htmlFor="type">TYPE</label>
          <select id="type" value={typeIn} onChange={this.onChangeOption}>
            {transactionTypeOptions.map(each => (
              <option>{each.displayText}</option>
            ))}
          </select>
          <button type="submit">Add</button>
        </form>
        <div>
          <h1>History</h1>
          <ul>
            <li className="table-header">
              <p className="table-header-cell">Title</p>
              <p className="table-header-cell">Amount</p>
              <p className="table-header-cell">Type</p>
            </li>
            {historyList.map(each => (
              <TransactionItem eachTransaction={each} key={each.id} />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default MoneyManager
