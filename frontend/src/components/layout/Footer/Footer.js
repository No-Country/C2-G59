import React from 'react'

function Footer() {

  const getCurrentYear = () => {
    return new Date().getFullYear();
  };

  return (
    <footer className='text-center p-3'>
      <div className='text-center'>
        <p>&#169; {getCurrentYear()} – Todos los derechos reservados</p>
      </div>
    </footer>
  )
}

export default Footer
