import React from 'react';
import logo from '../assets/images/logoGaona.jpg';
import { useDispatch } from 'react-redux';
import { useForm } from '../hooks/useForm';
import { startLogin } from '../actions/auth';
//import Swal from 'sweetalert2';


export const Login = () => {

  const dispatch = useDispatch();

  const [ formLoginValues, handleLoginInputChange ] = useForm({
    name: 'eveyazmins',
    password: 'labanda',
  });

  const { name, password } = formLoginValues;

  const handleLogin = ( e ) => {
    e.preventDefault();
    console.log(formLoginValues);
    dispatch( startLogin( name, password ) );
  }



    return (
    
    <div className="wrapper fadeInDown">
      <div id="formContent">
        <div className="fadeIn first">
          <img src={ logo } width="200" height="200" alt="" loading="lazy" id="icon" />
        </div>
        
        <form onSubmit={ handleLogin }>
          <input 
            type="text" 
            id="login" 
            className="fadeIn first" 
            name="name" 
            placeholder="Usuario"
            value={ name }
            onChange={ handleLoginInputChange }
            required
            >

          </input>

          <input 
            type="password" 
            id="password" 
            className="fadeIn second" 
            name="password" 
            placeholder="Contraseña"
            value={ password }
            onChange={ handleLoginInputChange }
            required
            >
          </input>

          <input type="submit" className="fadeIn fourth" value="Ingresar"></input>
     
        </form>
      </div>
    </div>
    )
}
