export const Container = ({ children }) =>
  <div>
    {children}
    <style jsx>{`
       div {
         max-width: 600px;
         max-height: 600px;
         margin: 30px auto;
         overflow-y: scroll;
       }
       div::-webkit-scrollbar { 
         width: 0 !important 
       }
    `}</style>
  </div>

export const FlexCenter = ({ children }) =>
  <div>
    {children}
    <style jsx>{`
      div {
        max-width: 600px;
        margin: 15px auto;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    `}</style>
  </div>

