# 🧾 Sistema de Gerenciamento de Ordens

Este projeto é um sistema de gerenciamento de ordens desenvolvido em **React** com **TypeScript**, utilizando **Tailwind CSS** para o design da interface. O sistema permite criar, filtrar, listar, cancelar e simular o *match* entre ordens de compra e venda de ativos.

---

## 📸 Demonstração

> Interface do sistema com destaque para o filtro e listagem de ordens, botão de criação e status atual das ordens.

---

## ✨ Funcionalidades

- ✅ **Criar ordens** de compra ou venda
- ✅ **Filtrar ordens** por ID, instrumento, status ou lado
- ✅ **Cancelar ordens**
- ✅ **Simulação de match** automático entre ordens opostas (compra e venda)
- ✅ Histórico de alterações no status da ordem

---

## 🧱 Tecnologias Utilizadas

- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Vite](https://vitejs.dev/) (para build e desenvolvimento rápido)

---

## 🚀 Como executar o projeto localmente

1. **Clone o repositório:**

   ```bash
   git clone https://github.com/lucaspassos92/DesafioFrontEnd-BaseExchange.git
   
   cd DesafioFrontEnd-BaseExchange

🧠 **Lógica de Match de Ordens**
A função matchOrders (em utils/orderUtils.ts) simula o comportamento de um motor de matching:
  Busca ordens opostas (compra vs. venda) com mesmo instrumento
  Ordena por melhor preço e mais antiga
  Reduz a quantidade restante das ordens envolvidas
  Atualiza o status para PARCIAL ou EXECUTADA
  Adiciona entrada ao histórico de cada ordem modificada

_______________________________________________

Desenvolvido por:
👨‍💻 Lucas Passos de Oliveira
📧 lucas.passos92@gmail.com
💼 https://www.linkedin.com/in/lucaspassos92/