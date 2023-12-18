const express = require('express')
const app = express()
const port = 3000
const config = {
  host: 'db',
  user: 'root',
  password: 'root',
  database: 'nodedb'
};

const mysql = require('mysql')


function addData(connection) {
  const name = `Full Cycle Rocks! - ${Math.floor(Math.random() * 100)}`
  const sql = `INSERT INTO desafio_fc (name) VALUES ('${name}')`  
  connection.query(sql)
}

function generateResult(data) {

  const css = "<style>table, th, td {border: 1px solid black; border-collapse: collapse;}</style>"
  const h1 = '<h1>Full Cycle Rocks!</h1>'
  
  let list = ""
  data.forEach(r => {
    list += `<tr><td>${r.id}</td><td>${r.name}</td><td>${r.create_date}</td>`
  })
  
  const table = '<table><tbody>'
              + '<tr>'
              + '<td>Id</td><td>Name</td><td>Create Date</td>'
              + list
              + '</tbody></table>'

  return `${css}${h1}<br>${table}`
}

app.get('/', (req, res) => {  
  const connection = mysql.createConnection(config)  

  // Insere registro a cada acesso
  addData(connection);

  // Carrega regidtros cadastros  e mostra a página
  const sql = 'SELECT * FROM desafio_fc ORDER BY id DESC'; 
  connection.query(sql, (err, result) => {
    const list = generateResult(result)
    connection.end()
    res.send(list)
  })
})

app.listen(port, () => {
    console.log('Rodando na porta ' + port)
})
