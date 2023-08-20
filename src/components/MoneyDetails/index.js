// Write your code here
import './index.css'

const MoneyDetails = props => {
  const {
    backgroundStyle,
    imageUrl,
    alt,
    textLabel,
    MdAmount,
    dataTestId,
  } = props
  return (
    <div className="money-details-bg-container">
      <div className={`your-balance-container ${backgroundStyle}`}>
        <img src={imageUrl} alt={alt} className="wallet-image" />
        <div className="balance-content-container">
          <p className="your-balance-tag">{textLabel}</p>
          <p className="your-balance-amount" data-testid={dataTestId}>
            Rs {MdAmount}
          </p>
        </div>
      </div>
    </div>
  )
}

export default MoneyDetails
