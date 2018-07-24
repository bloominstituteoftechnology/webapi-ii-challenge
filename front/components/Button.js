const Button = ({onClick, children}) =>
  <span onClick={onClick}>
    {children}
    <style jsx>{`
      background: #fff;
      color: #6d6464; 
      width: 200px;
      text-align: center;
      text-transform: uppercase;
      letter-spacing: 0.5rem;
      padding: 10px;
    `}</style>
  </span>


export default Button


