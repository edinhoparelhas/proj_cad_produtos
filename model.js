class Produto {
  constructor() {
    this.arrayProdutos = [];
    this.editId = null;
  }

  lerDados() {
    let produto = {};
    produto.codigo = document.getElementById("codigo").value;
    produto.nome = document.getElementById("produto").value;
    produto.preco = document.getElementById("preco").value;
    produto.quantidade = document.getElementById("quantidade").value;
    return produto;
  }
  salvar() {
    let produto = this.lerDados();
    if (this.validaCampos(produto)) {
      if (this.editId == null) {
        this.adicionar(produto);
      } else {
        this.atualiza(this.editId, produto);
      }
    }
    this.listaTabela();
    this.limpaCampos();

    console.log(this.arrayProdutos);
  }
  adicionar(produto) {
    produto.preco = parseFloat(produto.preco);
    this.arrayProdutos.push(produto);
    this.id++;
  }
  limpaCampos() {
    document.getElementById("codigo").value = "";
    document.getElementById("produto").value = "";
    document.getElementById("preco").value = "";
    document.getElementById("quantidade").value = "";
    document.getElementById("bt1").innerText = "Salvar";
    this.editId = null;
  }
  validaCampos(produto) {
    let msg = "";
    if (produto.codigo == "") {
      msg += " Informe o Codigo do produto \n";
    }
    if (produto.nome == "") {
      msg += " Informe o Nome do produto \n";
    }
    if (produto.preco == "") {
      msg += " Informe o Preço do Produto \n";
    }
    if (produto.quantidade == "") {
      msg += "Informe a Quantidade do Produto \n";
    }
    if (msg != "") {
      alert(msg);
      return false;
    }
    return true;
  }

  listaTabela() {
    let tbody = document.getElementById("tbody");
    tbody.innerText = "";

    for (let i = 0; i < this.arrayProdutos.length; i++) {
      let tr = tbody.insertRow();

      let td_codigo = tr.insertCell();
      let td_produto = tr.insertCell();
      let td_valor = tr.insertCell();
      let td_quantidade = tr.insertCell();
      let td_acoes = tr.insertCell();
      td_codigo.innerText = this.arrayProdutos[i].codigo;
      td_produto.innerText = this.arrayProdutos[i].nome;
      td_valor.innerText = this.arrayProdutos[i].preco;
      td_quantidade.innerText = this.arrayProdutos[i].quantidade;

      td_codigo.classList.add("center");
      td_acoes.classList.add("center");
      let imgEdit = document.createElement("img");
      imgEdit.src = "img/editar.png";
      imgEdit.setAttribute(
        "onclick",
        "produto.edita(" + JSON.stringify(this.arrayProdutos[i]) + ")"
      );
      td_acoes.appendChild(imgEdit);

      let imgDelete = document.createElement("img");
      imgDelete.src = "img/delet.png";
      imgDelete.setAttribute(
        "onclick",
        "produto.deleta(" + this.arrayProdutos[i].codigo + ")"
      );
      td_acoes.appendChild(imgDelete);
    }
  }

  deleta(codigo) {
    if (confirm("Deseja deletar o Codigo: " + codigo)) {
      let tbody = document.getElementById("tbody");

      for (let i = 0; i < this.arrayProdutos.length; i++) {
        if (this.arrayProdutos[i].codigo == codigo) {
          this.arrayProdutos.splice(i, 1);
          tbody.deleteRow(i);
        }
      }
    }
  }
  edita(dados) {
    this.editId = dados.codigo;
    document.getElementById("codigo").value = dados.codigo;
    document.getElementById("produto").value = dados.nome;
    document.getElementById("preco").value = dados.preco;
    document.getElementById("quantidade").value = dados.quantidade;

    document.getElementById("bt1").innerText = "Atualizar";
  }

  atualiza(codigo, produto) {
    for (let i = 0; i < this.arrayProdutos.length; i++) {
      if (this.arrayProdutos[i].codigo == codigo) {
        this.arrayProdutos[i].codigo = produto.codigo;
        this.arrayProdutos[i].nome = produto.nome;
        this.arrayProdutos[i].preco = produto.preco;
        this.arrayProdutos[i].quantidade = produto.quantidade;
      }
    }
  }
}
var produto = new Produto();
