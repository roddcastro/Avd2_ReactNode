import React, { useState } from 'react'
import { useEffect } from 'react'
import InputMask from "react-input-mask";
import api from '../../services/api'
import { Content, Form, Container } from './styles'

interface Cadastro {
  nomeevento: string;
  local: string;
  diasemana: string;
  horario: string;
}

interface Listagem {
  id: string;
  nomeevento: string;
  local: string;
  diasemana: string;
  horario: string;
  like: number;
  dislike: number;
}

const Dashboard: React.FC = () => {
  const [evento, setEvento] = useState<Cadastro[]>([])

  async function handleAddEventos(event: any) {
    event.preventDefault()

    const { target: form } = event;

    const novoCadastro = {
      nomeevento: form.nomeevento.value,
      local: form.local.value,
      diasemana: form.diasemana.value,
      horario: form.horario.value,
    }

    console.log(novoCadastro)
    await api.post('/events', novoCadastro)
    alert('Dados cadastrados com sucesso!')

    setEvento([...evento, novoCadastro])
    form.reset()
    window.location.reload(true);
  }

  const [eventos, setEventos] = useState<Listagem[]>([])
  useEffect(() => {
    api.get('/events').then(response => setEventos(response.data))
  }, [])
  console.log(eventos)

  async function handleDelete(id: string){
    await api.delete(`/events/${id}`)
    setEventos(eventos.filter(eve => eve.id !== id))
    alert('Evento deletado com sucesso!')
  }

  async function like(id: string){
    await api.post(`/events/like/${id}`)
    setEventos(eventos.filter(eve => eve.id === id))
    window.location.reload(true);
  }

  async function dislike(id: string){
    await api.post(`/events/dislike/${id}`)
    setEventos(eventos.filter(eve => eve.id === id))
    window.location.reload(true);
  }

  return (
    <Content>
      <Form onSubmit={handleAddEventos}>
        <label htmlFor="nomeevento">Nome do Evento:</label>
        <input type='text' name='nomeevento' placeholder='Insira o nome do evento...' required />
        <label htmlFor="local">Local do Evento:</label>
        <input type='text' name='local' placeholder='Insira o local do evento...' required />
        <label htmlFor="diasemana">Dia do Evento:</label>
        <select name="diasemana" required>
          <option selected>Domingo</option>
          <option>Segunda-feira</option>
          <option>Terça-feira</option>
          <option>Quarta-feira</option>
          <option>Quinta-feira</option>
          <option>Sexta-feira</option>
          <option>Sábado</option>
        </select>
        <label htmlFor="horario">Horário do Evento:</label>
        <InputMask type='text' name="horario" mask="99:99" placeholder="Insira o horário do evento..." required />
        <button type="submit">Salvar</button>
      </Form>

      <Container>
        <table>
        <tr>
          <th>Evento</th>
          <th>Local</th>
          <th>Dia</th>
          <th>Horário</th>
          <th>Likes</th>
          <th>Dislikes</th>
          <th>Ações</th>
        </tr>
        {eventos.map((eve, indice) =>
        <tr key={indice}>
          <td>{eve.nomeevento}</td>
          <td>{eve.local} </td>
          <td>{eve.diasemana} </td>
          <td>{eve.horario} </td>
          <td>{eve.like} </td>
          <td>{eve.dislike} </td>
          <td><button type="button" onClick={() => handleDelete(eve.id)}>Excluir</button> <button type="button" onClick={() => like(eve.id)}>Like</button> <button type="button" onClick={() => dislike(eve.id)}>Dislike</button></td>
        </tr>
        )}
        </table>
      </Container>
    </Content>
  )
}

export default Dashboard