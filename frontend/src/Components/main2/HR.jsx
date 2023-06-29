import '../../css/notes.css'
import React, { useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import { useGlobalContext } from '../../StateContext';
import {IoIosPeople} from 'react-icons/io'
import {GrDocumentPerformance} from 'react-icons/gr'
import {MdPendingActions} from 'react-icons/md'
import {AiOutlineIssuesClose} from 'react-icons/ai'


export const HR = () => {
  const navigate = useNavigate();
  const { user,setuser } = useGlobalContext();
  // const [show, setShow] = useState([]);
  const {alluser, setalluser} = useGlobalContext();
  
  const [rows, setRows] = useState(JSON.parse(localStorage.getItem("allusers")));

   
  const addRow = () => {
    setRows([...rows, {}]);
  };
 
  const deleteRow = (index) => {
    const updatedRows = [...rows];
    updatedRows.splice(index, 1);
    setRows(updatedRows);
  };
  useEffect(() => {
 
    axios
      .get("http://localhost:5000/getUsers")
      .then(({ data }) => {
        console.log(data);
        setalluser(data);
      })
  }, [])
 
   
  return (
    
 
    <div className='notes-wrapper'>
      <div className='Total_Employee'>
           <span className='EmployeeIcon'><IoIosPeople/></span>
           <span>Total Employee are : </span>
       </div>
      <div className='Total_Employee'>
           <span className='EmployeeIcon'><GrDocumentPerformance/></span>
           <span>Performance Evaluation Completed: </span>
       </div>
      <div className='Total_Employee'>
           <span className='EmployeeIcon'><MdPendingActions/></span>
           <span>Performance Evaluation Pending : </span>
       </div>
      <div className='Total_Employee'>
           <span className='EmployeeIcon'><AiOutlineIssuesClose/></span>
           <span>APAR Issued : </span>
       </div>
    
      
    </div>
  )
}