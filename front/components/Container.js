const Container = ({ children }) =>
  <div>
    {children}
    <style jsx>{`
       div {
         max-width: 600px;
         max-height: 600px;
         margin: 50px auto;
         overflow-y: scroll;
       }
       div::-webkit-scrollbar { 
         width: 0 !important 
       }
    `}</style>
  </div>

export default Container
