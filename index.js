const express = require("express");
const { PrismaClient } = require("@prisma/client");

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

// logs 
app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.url}`);
  next();
});

// teste
app.get("/", (req, res) => {
  res.send("API da Vinheria Pedidos funcionando!");
});

// servidorr
app.listen(3000, () =>
  console.log("Servidor rodando em http://localhost:3000")
);




// -----------------------------------------------------------------------------
// criar pedido
// -----------------------------------------------------------------------------
app.post("/pedidos", async (req, res) => {
  try {
    const { produto, quantidade, cliente } = req.body;

    // validacao
    if (!produto || !quantidade || !cliente) {
      return res.status(400).json({
        error: "Campos obrigatórios: produto, quantidade, cliente"
      });
    }

    const pedido = await prisma.pedido.create({
      data: {
        produto,
        quantidade,
        cliente
      }
    });

    res.status(201).json(pedido);
  } catch (err) {
    console.error("Erro ao criar pedido:", err);
    res.status(500).json({ error: "Erro interno ao criar pedido" });
  }
});

// -----------------------------------------------------------------------------
// listar todos os pedidos
// -----------------------------------------------------------------------------
app.get("/pedidos", async (req, res) => {
  try {
    const pedidos = await prisma.pedido.findMany({
      orderBy: { id: "desc" }
    });
    res.json(pedidos);
  } catch (err) {
    console.error("Erro ao listar pedidos:", err); 
    res.status(500).json({ error: "Erro ao listar pedidos" });
  }
});

// -----------------------------------------------------------------------------
// buscar pedido por ID
// -----------------------------------------------------------------------------
app.get("/pedidos/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    const pedido = await prisma.pedido.findUnique({
      where: { id }
    });

    if (!pedido) {
      return res.status(404).json({ error: "Pedido não encontrado" });
    }

    res.json(pedido);
  } catch (err) {
    console.error("Erro ao buscar o pedido:", err); 
    res.status(500).json({ error: "Erro ao buscar o pedido" });
  }
});

// -----------------------------------------------------------------------------
// atualizar status do pedido
// -----------------------------------------------------------------------------
app.patch("/pedidos/:id/status", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ error: "Campo 'status' é obrigatório" });
    }

    const pedido = await prisma.pedido.update({
      where: { id },
      data: { status }
    });

    res.json({
      message: "Status atualizado com sucesso!",
      pedido
    });
  } catch (err) {
    if (err.code === "P2025") {
      return res.status(404).json({ error: "Pedido não encontrado" });
    }

    res.status(500).json({ error: "Erro ao atualizar status" });
  }
});