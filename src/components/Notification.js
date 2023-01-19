const Notification = ({ message, isError }) => {
  if (message === null) {
    return null
  }

  const footerStyle = {
    color: 'green',
    background: 'lightgrey',
    fontSize: '20px',
    borderStyle: 'solid',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px'
  }

  if (isError) {
    footerStyle.color = 'red';
  }

  return (
    <div className='notification' style={footerStyle}>
      {message}
    </div>
  )
}
  
export default Notification