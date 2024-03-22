import logo from '../assets/img/logo.png'
import Input from '../components/Input'
import Label from '../components/Label'
import Button from '../components/Button'
import { useState } from 'react';
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom';

const Login = ({ callback }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const url = 'http://localhost:8001/api/auth/login';
  const goTo = useNavigate();

  const ingresar = e => {
    e.preventDefault();

    fetch(url, {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((res) => res.json())
      .catch((error) => console.error('Error:', error))
      .then(res => {
        if (res.data && res.data.original.access_token) {
          localStorage.setItem('accessToken', res.data.original.access_token); // Almacenar token en localStorage
          Swal.fire({
            title: 'Bienvenido!',
            text: ``,
            icon: 'success',
            confirmButtonText: 'Cerrar'
          })
          callback(res.data.original.access_token);
          goTo("/dashboard");
        } else {
          Swal.fire({
            title: 'Error!',
            text: 'Credenciales inválidas',
            icon: 'error',
            confirmButtonText: 'Cerrar'
          })
        }
      });
  }

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto w-64"
          src={logo}
          alt="  "
        />
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={ingresar}>
          <div>
            <Label htmlFor="email"> Correo Electrónico </Label>
            <div className="mt-2">
              <Input
                type="text"
                id="email"
                name="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <Label htmlFor="password"> Contraseña </Label>
            </div>
            <div className="mt-2">
              <Input
                id="password"
                name="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <Button
              type="submit"
            >
              Ingresar
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login;
