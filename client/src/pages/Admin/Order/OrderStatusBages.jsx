import PropTypes from 'prop-types' // Import PropTypes
const getOrderStatusText = (orderStatus) => {
  switch (orderStatus) {
    case 'Đã đặt hàng':
      return 'Đã đặt hàng'
    case 'Đã giao':
      return 'Hoàn thành'
    case 'Đã huỷ':
      return 'Đã huỷ'
    default:
      return 'Đang xử lý'
  }
}

const getOrderStatusColor = (orderStatus) => {
  switch (orderStatus) {
    case 'Đã đặt hàng':
      return 'bg-red-700'
    case 'Đã giao':
      return 'bg-green-700'
    case 'Đã huỷ':
      return 'bg-gray-700'
    default:
      return 'bg-yellow-700'
  }
}
const OrderStatusBadge = ({ order }) => {
  const orderStatusText = getOrderStatusText(order.orderStatus)
  const orderStatusColor = getOrderStatusColor(order.orderStatus)

  return (
    <div className='flex items-center'>
      <div
        className={`inline-block w-4 h-4 mr-2 rounded-full ${orderStatusColor}`}
      />
      {orderStatusText}
    </div>
  )
}

OrderStatusBadge.propTypes = {
  order: PropTypes.object.isRequired // Add 'order' prop to props validation
}

export default OrderStatusBadge
