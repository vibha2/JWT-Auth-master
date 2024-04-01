import React from 'react';
import './ItemCard.css';

function ItemCard({data}) {
  return (
    <div className='cardContainer'>
        <div className='imageContainer'>
        <img src={data.imageFile} alt='image' className='imageStyle' />
        </div>

        <div className='cardBody'>

            <div className='cardContent'>
                <p>{data.itemName}</p>
                <p>{data.itemPrice}</p>
            </div>
            <p className='highlightContent'>{data.itemMode}</p>
            <button className='buttonStyle'>Add to Cart</button>
        </div>

    </div>
  )
}

export default ItemCard