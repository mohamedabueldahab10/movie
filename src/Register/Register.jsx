import axios from 'axios';
import Joi from 'joi';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';


export default function () {
  let navigate = useNavigate();
  const [errorList, seterrorList] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [error, seterror] = useState('');
  const [user, setuser] = useState({
    first_name: '',
    last_name: '',
    age: 0,
    email: '',
    password: ''
  });

  function getUser(e) {

    let myUser = { ...user };
    myUser[e.target.name] = e.target.value;
    setuser(myUser);
  }

  async function submitRegister(e) {
    e.preventDefault();
    setisLoading(true);

    let validationResult = validateRegisterForm(user);
    if (validationResult.error) {
      setisLoading(false);
      seterrorList(validationResult.error.details)

      //list all errors
    }
    else {
      let { data } = await axios.post(`https://route-egypt-api.herokuapp.com/signup`, user)

      if (data.message === 'success') {
        // Navigate to login
        setisLoading(false);
        navigate('/login')
      }
      else {
        seterror(data.message);
        setisLoading(false);

      }
    }
  }

  function validateRegisterForm(user) {
    let schema = Joi.object({
      first_name: Joi.string().alphanum().min(3).max(10).required(),
      last_name: Joi.string().alphanum().min(3).max(10).required(),
      age: Joi.number().min(16).max(80).required(),
      password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),      
      email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'org'] } })
    });
    return schema.validate(user, { abortEarly: false });
  }


  return (
    <div>
      <h2 className='my-3'> Register Now </h2>
      {errorList.map((error, index) => {
        if (index === 4) {
          return <div key={index} className="alert alert-danger">Password Invalid</div>
        }
        else {
          return <div key={index} className="alert alert-danger">{error.message}</div>
        }
      }
      )}

      {error ? <div className="alert alert-danger">{error.slice(34, 100)}</div> : ''}

      <form className='py-4' onSubmit={submitRegister}>
        <label htmlFor="first_name">first_name :</label>
        <input onChange={getUser} type="text" className='form-control mb-3' name='first_name' id='first_name' />

        <label htmlFor="last_name">last_name :</label>
        <input onChange={getUser} type="text" className='form-control mb-3' name='last_name' id='last_name' />

        <label htmlFor="age">age :</label>
        <input onChange={getUser} type="number" className='form-control mb-3' name='age' id='age' />

        <label htmlFor="email">email :</label>
        <input onChange={getUser} type="email" className='form-control mb-3' name='email' id='email' />

        <label htmlFor="password">password :</label>
        <input onChange={getUser} type="password" className='form-control mb-3' name='password' id='password' />

        <button type='submit' className='btn btn-outline-info fw-bold my-3'>
          {isLoading ? <i className='fas fa-spinner fa-spin'></i> : 'Register'}
        </button>

      </form>
    </div>
  )
}
