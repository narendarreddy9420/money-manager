import './index.css'

const MoneyDetails = props => {
  const {incomeAmount, expenseAmount, balanceAmount} = props

  return (
    <div>
      <div>
        <h1>Your Balance</h1>
        <p>Rs {balanceAmount}</p>
      </div>
      <div>
        <h1>Your income</h1>
        <p>Rs {incomeAmount}</p>
      </div>
      <div>
        <h1>Your expense</h1>
        <p>Rs {expenseAmount}</p>
      </div>
    </div>
  )
}

export default MoneyDetails
