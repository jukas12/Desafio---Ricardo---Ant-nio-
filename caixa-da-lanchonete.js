class CaixaDaLanchonete {
    // Definindo o cardápio
    cardapio = {
      cafe: { descricao: "Café", valor: 3.0 },
      chantily: { descricao: "Chantily (extra do Café)", valor: 1.5 },
      suco: { descricao: "Suco Natural", valor: 6.2 },
      sanduiche: { descricao: "Sanduíche", valor: 6.5 },
      queijo: { descricao: "Queijo (extra do Sanduíche)", valor: 2.0 },
      salgado: { descricao: "Salgado", valor: 7.25 },
      combo1: { descricao: "1 Suco e 1 Sanduíche", valor: 9.5 },
      combo2: { descricao: "1 Café e 1 Sanduíche", valor: 7.5 },
    };
  
    // Função para calcular o valor da compra
    calcularValorDaCompra(formaDePagamento, itens) {
      if (!["debito", "credito", "dinheiro"].includes(formaDePagamento)) {
        return "Forma de pagamento inválida!";
      }
  
      if (!Array.isArray(itens) || itens.length === 0) {
        return "Não há itens no carrinho de compra!";
      }
  
      let valorTotal = 0;
  
      for (const item of itens) {
        const [codigoItem, quantidade] = item.split(", ");
        
        if (!this.cardapio[codigoItem]) {
          return "Item inválido!";
        }
  
        if (isNaN(quantidade) || parseInt(quantidade) <= 0) {
          return "Quantidade inválida!";
        }
  
        valorTotal += this.cardapio[codigoItem].valor * parseInt(quantidade);
  
        if (codigoItem === "chantily" || codigoItem === "queijo") {
          const itemPrincipal = codigoItem === "chantily" ? "cafe" : "sanduiche";
          if (!itens.find((i) => i.startsWith(itemPrincipal))) {
            return "Item extra não pode ser pedido sem o principal";
          }
        }
      }
  
      if (formaDePagamento === "dinheiro") {
        valorTotal *= 0.95; // Aplicando desconto de 5% para pagamento em dinheiro
      } else if (formaDePagamento === "credito") {
        valorTotal *= 1.03; // Aplicando acréscimo de 3% para pagamento a crédito
      }
  
      return `Valor total a pagar: R$ ${valorTotal.toFixed(2).replace(".", ",")}`;
    }
  }
  
  // Exemplo de uso
  const caixa = new CaixaDaLanchonete();
  
  const formaPagamento = "dinheiro";
  const itensPedido = ["cafe, 2", "chantily, 1", "suco, 1"];
  
  const valorCompra = caixa.calcularValorDaCompra(formaPagamento, itensPedido);
  console.log(valorCompra);
  