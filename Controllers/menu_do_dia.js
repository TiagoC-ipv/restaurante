const express = require('express');
const Prato = require('../Models/pratos');   

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const pratos = await Prato.find().sort({ codigo: 1 });
    res.status(200).json(pratos);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});


router.get('/:codigo', async (req, res) => {
  try {
    const codigo = Number(req.params.codigo);
    if (isNaN(codigo)) {
      return res.status(400).json({ erro: "Código inválido" });
    }

    const prato = await Prato.findOne({ codigo });
    if (!prato) {
      return res.status(404).json({ erro: "Prato não encontrado" });
    }

    res.status(200).json(prato);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const { nome, categoria, tipo } = req.body;

    if (!nome || !categoria || !tipo) {
      return res.status(400).json({ erro: "Nome, categoria e tipo são obrigatórios" });
    }

  
    const ultimo = await Prato.findOne().sort({ codigo: -1 });
    const novoCodigo = ultimo ? ultimo.codigo + 1 : 1;

    const novoPrato = await Prato.create({
      codigo: novoCodigo,
      nome,
      categoria,
      tipo
    });

    res.status(201).json(novoPrato);
  } catch (err) {
    res.status(400).json({ erro: err.message });
  }
});


router.patch('/:codigo', async (req, res) => {
  try {
    const codigo = Number(req.params.codigo);
    if (isNaN(codigo)) {
      return res.status(400).json({ erro: "Código inválido" });
    }

    const updates = {};
    ["nome", "categoria", "tipo"].forEach(key => {
      if (req.body[key] !== undefined) updates[key] = req.body[key];
    });

    const pratoAtualizado = await Prato.findOneAndUpdate(
      { codigo },
      updates,
      { new: true, runValidators: true }
    );

    if (!pratoAtualizado) {
      return res.status(404).json({ erro: "Prato não encontrado" });
    }

    res.status(200).json(pratoAtualizado);
  } catch (err) {
    res.status(400).json({ erro: err.message });
  }
});


router.delete('/:codigo', async (req, res) => {
  try {
    const codigo = Number(req.params.codigo);
    if (isNaN(codigo)) {
      return res.status(400).json({ erro: "Código inválido" });
    }

    const result = await Prato.deleteOne({ codigo });

    if (result.deletedCount === 0) {
      return res.status(404).json({ erro: "Prato não encontrado" });
    }

    res.status(200).json({ mensagem: "Prato removido com sucesso" });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});


router.delete('/', async (req, res) => {
  try {
    await Prato.deleteMany({});
    res.status(200).json({ mensagem: "Todos os pratos removidos" });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

module.exports = router;
