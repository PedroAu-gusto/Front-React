import { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom' // 🔹 Importa para redirecionar
import Trash from '../../assets/trash.png'
import Edit from '../../assets/edit.png'
import './style.css'
import api from '../../services/api'

function Home() {
  const [users, setUsers] = useState([])
  const navigate = useNavigate() // 🔹 Hook para redirecionamento

  const inputName = useRef()
  const inputWeight = useRef()
  const inputHeight = useRef()

  async function getUsers() {
    try {
      const usersFromApi = await api.get('/usuario')
      setUsers(usersFromApi.data)
    } catch (error) {
      console.error('Usuário não autenticado:', error)
      navigate('/login') // 🔹 Se não estiver autenticado, redireciona para o login
    }
  }

  async function createUsers() {
    await api.post('/usuario', {
      usernames: inputName.current.value,
      weight: inputWeight.current.value,
      height: inputHeight.current.value
    })
    
    getUsers()
  }

  async function deleteUsers(id) {
    await api.delete(`/usuario/${id}`)
    getUsers()
  }

  async function editUsers(id) {
    await api.put(`/usuario/${id}`, {
      usernames: inputName.current.value,
      weight: inputWeight.current.value,
      height: inputHeight.current.value
    })
    getUsers()
  }

  useEffect(() => {
    getUsers() // 🔹 Agora verifica a autenticação antes de carregar os usuários
  }, [])

  return (
    <div className='container'>
      <form>
        <h1>Cadastro User</h1>
        <input placeholder='Nome' name='username' type='text' ref={inputName} />
        <input placeholder='Altura' name='weight' type='text' ref={inputWeight} />
        <input placeholder='Peso' name='height' type='text' ref={inputHeight} />

        <button type='button' onClick={createUsers}>Cadastrar</button>
      </form>

      {users.map((user) => (
        <div key={user.id} className='card'>
          <div>
            <p>Nome: <span>{user.usernames}</span></p>
            <p>Peso: <span>{user.weight}</span></p>
            <p>Altura: <span>{user.height}</span></p>
          </div>
          <button onClick={() => deleteUsers(user.id)}>
            <img src={Trash} />
          </button>
          <button onClick={() => editUsers(user.id)}>
            <img src={Edit} />
          </button>
        </div>
      ))}
    </div>
  )
}

export default Home
