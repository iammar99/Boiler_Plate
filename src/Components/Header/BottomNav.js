import React from 'react'
import Carousel from "../OtherComponents/Carousel";
// --------------------- Carusal Images ---------------------
import img1 from '../../Assets/carusal1.jpg'
import img2 from '../../Assets/carusal2.jpg'
import img3 from '../../Assets/carusal3.jpg'
import img4 from '../../Assets/carusal4.jpg'


export default function BottomNav() {

  let imageUrls = [
    img1,
    img2,
    img3,
    img4,
  ]


  return (
    <div>
      <header>
        <Carousel images={imageUrls} />
      </header>
    </div>
  )
}
