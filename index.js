const express = require('express');
const app = express();

app.use(express.json());

// Array simulando banco de dados
let usuarios = [
  { id: 1, nome: "João" },
  { id: 2, nome: "Maria" },
  { id: 3, nome: "Carlos" }
];

// Rota raiz
app.get('/', (req, res) => {
  res.send(`Bem vindo a API e-class, existem ${usuarios.length} usuários cadastrados!`);
});

// GET todos os usuários com filtro opcional por nome
app.get('/usuarios', (req, res) => {
  const { nome } = req.query;

  if (nome) {
    // Filtra usuários cujo nome contém a string do query param (case insensitive)
    const resultado = usuarios.filter(u =>
      u.nome.toLowerCase().includes(nome.toLowerCase())
    );
    return res.json(resultado);
  }

  // Se não houver query param, retorna todos
  res.json(usuarios);
});

// POST criar usuário
app.post('/usuarios', (req, res) => {
  const { nome } = req.body;

  if (!nome) return res.status(400).json({ erro: "Nome é obrigatório" });

  const novoUsuario = {
    id: usuarios.length > 0 ? usuarios[usuarios.length - 1].id + 1 : 1,
    nome
  };

  usuarios.push(novoUsuario);
  res.status(201).json(novoUsuario);
});

// PUT atualizar usuário
app.put('/usuarios/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { nome } = req.body;

  const usuario = usuarios.find(u => u.id === id);
  if (!usuario) return res.status(404).json({ erro: "Usuário não encontrado" });
  if (!nome) return res.status(400).json({ erro: "Nome é obrigatório" });

  usuario.nome = nome;
  res.json(usuario);
});

// DELETE remover usuário
app.delete('/usuarios/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = usuarios.findIndex(u => u.id === id);

  if (index === -1) return res.status(404).json({ erro: "Usuário não encontrado" });

  const removido = usuarios.splice(index, 1);
  res.json({ mensagem: "Usuário removido com sucesso", usuario: removido[0] });
});

// Inicialização do servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`API rodando em http://localhost:${PORT}`);
});