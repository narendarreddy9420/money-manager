import './index.css'

const TransactionItem = props => {
  const {eachTransaction, onDeleteItem, id} = props
  const {title, amount, type} = eachTransaction

  const onClickEl = () => {
    onDeleteItem(id)
  }

  return (
    <li>
      <p>{title}</p>
      <p>{amount}</p>
      <p>{type}</p>
      <button onClick={onClickEl}>
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/delete.png"
          alt="delete"
        />
      </button>
    </li>
  )
}

export default TransactionItem
