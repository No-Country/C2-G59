import React from 'react'

function Footer() {

  const getCurrentYear = () => {
    return new Date().getFullYear();
  };

  return (
    <footer className='text-center p-3'>
      <div className='text-center'>
        <p>Copyright {getCurrentYear()} &#169; – All Rights Reserved.</p>
      </div>
    </footer>
  )
}

export default Footer
