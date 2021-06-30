import styled from 'styled-components'

export const Content = styled.div`
  width: 100%;

  button {
    padding: 10px;
    border-radius: 6px;
    border: 0;
    background: blue;
    color: white;
    font-weight: bold;
  }

  button:hover {
    background-color: lightblue;
    color: black;
    border: 1px solid blue;
  }
`

export const Form = styled.form`
  width: 100%;
  max-width: 500px;
  margin: 10px auto 0;
  padding: 30px;
  background-color: white;
  border: 1px solid black;
  border-radius: 4px;

  display: flex;
  flex-direction: column;

  input, select {
    margin-bottom: 10px;
  }

  input[type=text], select {
    height: 38px;
    border-radius: 4px;
    border: 1px solid #ddd;
    padding: 0 20px;
    font-size: 14px;
  }
`

export const Container = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  padding: 0 30px;

  table {
    width: 100%;
    background-color: white;
    border-radius: 4px;
    text-align: center;
    margin-top: 30px;
    border: 1px solid black;
  }

  th {
    padding: 5px;
    font-size: 18px;
    background: blue;
    color: white;
  }

  td {
    padding: 10px;
    border: 1px solid black;
  }
`