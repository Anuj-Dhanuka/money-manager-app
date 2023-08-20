import {v4 as uuidv4} from 'uuid'
import {Component} from 'react'
import './index.css'
import MoneyDetails from '../MoneyDetails'
import TransactionItem from '../TransactionItem'

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

const transactionItemsList = []

// Write your code here

class MoneyManager extends Component {
  state = {
    balance: 0,
    income: 0,
    expense: 0,
    title: '',
    amount: '',
    inOrEx: 'Income',
    initialTransactionList: transactionItemsList,
  }

  changingTitle = event => {
    this.setState({title: event.target.value})
  }

  changingAmount = event => {
    const newAmount = Number(event.target.value)
    this.setState({amount: newAmount})
  }

  changingTransactionType = event => {
    this.setState({inOrEx: event.target.value})
  }

  onDeletingTransaction = id => {
    const {initialTransactionList} = this.state
    const filteredList = initialTransactionList.filter(each => each.id !== id)
    const clickedObject = initialTransactionList.filter(each => each.id === id)
    console.log(clickedObject)
    if (clickedObject[0].inOrEx === 'Income') {
      console.log(clickedObject.amount)
      this.setState(prevState => ({
        income: prevState.income - clickedObject[0].amount,
        balance: prevState.balance - clickedObject[0].amount,
      }))
    } else {
      console.log(clickedObject.amount)
      this.setState(prevState => ({
        expense: prevState.expense - clickedObject[0].amount,
        balance: prevState.balance + clickedObject[0].amount,
      }))
    }
    this.setState({initialTransactionList: filteredList})
  }

  onClickingAdd = event => {
    event.preventDefault()
    const {title, amount, inOrEx} = this.state
    if (title.length > 0) {
      const newObject = {
        id: uuidv4(),
        title,
        amount,
        inOrEx,
      }
      this.setState(prevState => ({
        initialTransactionList: [
          ...prevState.initialTransactionList,
          newObject,
        ],
        title: '',
        amount: '',
        inOrEx: 'Income',
      }))
      if (inOrEx === 'Income') {
        this.setState(prevState => ({
          balance: prevState.balance + amount,
          income: prevState.income + amount,
        }))
      } else {
        this.setState(prevState => ({
          balance: prevState.balance - amount,
          expense: prevState.expense + amount,
        }))
      }
    }
  }

  render() {
    const {
      balance,
      income,
      expense,
      title,
      amount,
      inOrEx,
      initialTransactionList,
    } = this.state
    return (
      <div className="money-manager-bg-container">
        <div className="money-manager-inner-container">
          <div className="user-welcome-container">
            <h1 className="user-welcome-text">Hi, Richard</h1>
            <p className="user-welcome-description">
              Welcome back to your{' '}
              <span className="user-welcome-span">Money Manager</span>
            </p>
          </div>
          <div className="money-details-items-container">
            <MoneyDetails
              backgroundStyle="your-balance-style"
              imageUrl="https://assets.ccbp.in/frontend/react-js/money-manager/balance-image.png"
              alt="balance"
              textLabel="Your Balance"
              MdAmount={balance}
              dataTestId="balanceAmount"
            />

            <MoneyDetails
              backgroundStyle="your-income-style"
              imageUrl="https://assets.ccbp.in/frontend/react-js/money-manager/income-image.png"
              alt="income"
              textLabel="Your Income"
              MdAmount={income}
              dataTestId="incomeAmount"
            />

            <MoneyDetails
              backgroundStyle="your-expense-style"
              imageUrl="https://assets.ccbp.in/frontend/react-js/money-manager/expenses-image.png"
              alt="expenses"
              textLabel="Your Expenses"
              MdAmount={expense}
              dataTestId="expensesAmount"
            />
          </div>
          <div className="money-manager-bottom-container">
            <div className="add-transaction-container">
              <h1 className="add-transaction-title">Add Transaction</h1>
              <form
                className="money-manager-form"
                onSubmit={this.onClickingAdd}
              >
                <label
                  htmlFor="transactionTitle"
                  className="money-manager-form-title"
                >
                  TITLE
                </label>
                <input
                  id="transactionTitle"
                  className="money-manager-form-input"
                  placeholder="TITLE"
                  value={title}
                  onChange={this.changingTitle}
                />
                <label
                  htmlFor="transactionAmount"
                  className="money-manager-form-title"
                >
                  AMOUNT
                </label>
                <input
                  id="transactionAmount"
                  className="money-manager-form-input"
                  placeholder="AMOUNT"
                  onChange={this.changingAmount}
                  value={amount}
                />
                <label
                  htmlFor="transactionType"
                  className="money-manager-form-title"
                >
                  TYPE
                </label>
                <select
                  id="transactionType"
                  className="money-manager-form-input"
                  onChange={this.changingTransactionType}
                  value={inOrEx}
                >
                  {transactionTypeOptions.map(each => (
                    <option
                      className="add-transaction-form-option"
                      key={each.optionId}
                    >
                      {each.displayText}
                    </option>
                  ))}
                </select>
                <button type="submit" className="add-transaction-button">
                  Add
                </button>
              </form>
            </div>
            <div className="add-transaction-container transaction-history-container">
              <h1 className="add-transaction-title">History</h1>
              <div className="transaction-history-items-container">
                <div className="transaction-history-inner-container">
                  <p className="transaction-history-title">Title</p>
                  <p className="transaction-history-title">Amount</p>
                  <p className="transaction-history-title">Type</p>
                </div>
              </div>
              <ul className="ul-list-container">
                {initialTransactionList.map(each => (
                  <TransactionItem
                    outerContainer="transaction-history-items-container"
                    innerContainer="transaction-history-inner-container"
                    onDeletingTransaction={this.onDeletingTransaction}
                    key={each.id}
                    transactionItemsList={each}
                  />
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default MoneyManager
