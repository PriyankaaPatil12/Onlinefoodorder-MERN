import React from 'react'
import Pizza from './Pizza'
import "./../../../components/pages/style.css"

const Menu = () => {
  return (
    <>
    <div>

    <div className='menusection'>
        <h1 className='bg-slate-50 border text-black font-bold px-4 py-2'>OUR MENU</h1>
    </div>
    <div className='abc mt-20 '>
      <h4>Savor the Flavors of Italy</h4>
    </div>
    <div className='mt-8'>
      <form>
        <input type='text' className='border border-black rounded-lg px-8 py-2' />
        <button type='submit' className='border px-3 ml-3 py-2 bg-black text-white rounded-lg'>Search</button>
      </form>
    </div>
    <Pizza/>
    </div>
   
    </>
  )
}

export default Menu
