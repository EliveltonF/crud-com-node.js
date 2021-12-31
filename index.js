const express = require('express')
const knex = require('./src/database/index.js');
const Users = require('./src/database/models/user.js');
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt');
const app = express();
app.use(bodyParser.json())
const { authSchema, authSchemaDelete, authSchemaUpdate } = require('./src/database/validation/index.js')

knex();



app.post('/insert', async (req, res) => {
     try {
          const result = await authSchema.validateAsync(req.query)
          console.log(result)
          const pass = await bcrypt.hash(result.password, 15);
          console.log(pass)
          const user = await Users.query().insert({
               username: result.username,
               email: result.email,
               password: pass,
          })
          res.send({ msg: 'dados cadastrados com sucesso', dados: result, pass: pass })
     } catch (err) {
          res.send(err)
     }
})
app.get('/listUsers', async (req, res) => {
     try {
          const user = await Users.query()
          res.send(user)
     } catch (err) {
          res.send(err)
     }
})
app.get('/User/:id', async (req, res) => {
     try {
          const result = await authSchemaDelete.validateAsync(req.params)
          const user = await Users.query().where('id', result.id)
          res.send(user)
     } catch (err) {
          res.send(err)
     }
})
app.post('/update', async (req, res) => {
     try {
          const result = await authSchemaUpdate.validateAsync(req.query)
          const pass = await bcrypt.hash(result.password, 15);
          console.log(result)
          const user = await Users.query().update({
               username: result.username,
               email: result.email,
               password: pass
          }).where('id', result.id)
          res.send({ msg: 'update realizado com sucesso!', dados: result,pass:pass })
     } catch (err) {
          res.send(err)
     }
})
app.post('/delete', async (req, res) => {
     try {
          const result = await authSchemaDelete.validateAsync(req.query)
          const user = await Users.query().deleteById(result.id)
          res.send('delete realizado com sucesso!')
     } catch (err) {
          res.send(err)
     }
})



app.listen(4000, () => { console.log('servidor rodando na porta 4000...') })
