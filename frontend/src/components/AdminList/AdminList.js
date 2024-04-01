import React, { useState, useEffect } from 'react';
import './AdminList.css';
import ItemService from '../../services/ItemService';
import { toast } from 'react-toastify';
import ItemCard from '../ItemCard/ItemCard';
import { useNavigate } from 'react-router-dom';

function AdminList() {

  useEffect( ()=> {
    getList();
  },[]);

  const navigate = useNavigate();

  const handleBackButton = () => {
    navigate(-1);
  }
  const [item, setItem] = useState();

  const getList = () => {
    ItemService.getAllItem().then(
        (res) => {
            console.log("res in adminlist=> ", res?.data?.item);
            setItem(res?.data?.item);
        },
        (err) => {
            console.log("err=> ",err);
        }
    )
    .catch(error =>{
        toast.success("Item list not fetched");
        console.error(error)
      });
  }
  return (
    <div className='adminListContainer'>
    <h2 className='listHeading'>Item List</h2>
    <div style={{paddingLeft: '8.5rem', marginBottom: '0.5rem'}}>
        <button onClick={handleBackButton} className='backbuttonStyle'>Back</button>
    </div>
    <div className='listContainer' >
    {
        item?.map( (data, index) => (
            <>
            <ItemCard key={index} data={data}  />
            </>
        ))
    }
       
    </div>
    </div>
  )
}

export default AdminList;