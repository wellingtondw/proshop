import PropTypes from 'prop-types'

const arrayWithFiveElements = Array.from({ length: 5 }, (v, i) => i)

const Rating = ({ value, text, color = '#f8e825' }) => {
  return (
    <div className='rating'>
      {arrayWithFiveElements.map((_, index) => (
        <span key={index}>
          <i 
            style={{ color }}
            className={
             value >= index + 1
             ? 'fas fa-star' 
             : value >= index + 1 - 0.5 
             ? 'fas fa-star-half-alt' 
             : 'far fa-star'
            }
          />
        </span>
      ))}
          
      {text && <p className='d-inline'>{text}</p>}
    </div>
  )
}

Rating.propTypes = {
  value: PropTypes.number.isRequired,
  text: PropTypes.string,
  color: PropTypes.string
}

export default Rating
