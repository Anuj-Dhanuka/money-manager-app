// Write your code here

import './index.css'

const TransactionItem = props => {
  const {
    outerContainer,
    innerContainer,
    onDeletingTransaction,
    transactionItemsList,
  } = props

  const {id, title, amount, inOrEx} = transactionItemsList

  const onClickingDeleteIcon = () => {
    onDeletingTransaction(id)
  }

  return (
    <li className={outerContainer}>
      <div className={innerContainer}>
        <p className="transaction-item-style">{title}</p>
        <p className="transaction-item-style">Rs {amount}</p>
        <p className="transaction-item-style">{inOrEx}</p>
      </div>
      <button
        type="button"
        className="delete-button"
        onClick={onClickingDeleteIcon}
        data-testid="delete"
      >
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/delete.png"
          alt="delete"
          className="delete-icon-style"
        />
      </button>
    </li>
  )
}

export default TransactionItem
