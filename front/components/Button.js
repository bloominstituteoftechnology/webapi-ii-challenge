const Button = ({onClick, children, p, ls}) =>
  <span onClick={onClick}>
    {children}
    <style jsx>{`
      background: #fff;
      color: #6d6464; 
      width: 200px;
      text-align: center;
      text-transform: uppercase;
      letter-spacing: ${ls ? ls : '0.5rem'};
      padding: ${p ? p : '10px'};
    `}</style>
  </span>


export default Button


