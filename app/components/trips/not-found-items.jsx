import React from 'react'

function NotFoundItems() {
  return (
    <div className='flex flex-col justify-center items-center mt-[40px]'>
      <img src="https://static2.wongnai.com/static2/images/wIsaLor.svg" alt="Result not found img" className='w-[136px] h-[160px] mb-[24px]'/>
      <label className=' font-bold text-xl'>ขออภัยครับ/ค่ะ ไม่พบสถานที่ที่คุณกำลังหา</label>
    </div>
  )
}

export default NotFoundItems
