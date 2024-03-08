class Produto {
  constructor() {
    this.id = 1;
    this.arrayProdutos = [];
    this.editId=null;
  }

  lerDados() {
    let produto = {};
    produto.id = this.id;
    produto.nome = document.getElementById("produto").value;
    produto.preco = document.getElementById("preco").value;
    return produto;
  }
  salvar() {
    let produto = this.lerDados();
    if (this.validaCampos(produto)) {
        if(this.editId == null){
            this.adicionar(produto);
        } else{
            this.atualiza(this.editId,produto);
        }
      
    }
    this.listaTabela();
    this.cancelar();

    console.log(this.arrayProdutos);
  }
  adicionar(produto) {
    produto.preco=parseFloat(produto.preco);
    this.arrayProdutos.push(produto);
    this.id++;
  }
  cancelar() {
    document.getElementById("produto").value = "";
    document.getElementById("preco").value = "";
    document.getElementById("bt1").innerText= "Salvar";
    this.editId = null;
  }
  validaCampos(produto) {
    let msg = "";
    if (produto.nome == "") {
      msg += " Informe o Nome do produto \n";
    }
    if (produto.preco == "") {
      msg += " Informe o Preço do Produto \n";
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

      let td_id = tr.insertCell();
      let td_produto = tr.insertCell();
      let td_valor = tr.insertCell();
      let td_acoes = tr.insertCell();
      td_id.innerText = this.arrayProdutos[i].id;
      td_produto.innerText = this.arrayProdutos[i].nome;
      td_valor.innerText = this.arrayProdutos[i].preco;

      td_id.classList.add("center");
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
        "produto.deleta(" + this.arrayProdutos[i].id + ")"
      );
      td_acoes.appendChild(imgDelete);
    }
  }

  deleta(id) {
    if (confirm("Deseja deletar o produto: " + id)) {
      let tbody = document.getElementById("tbody");

      for (let i = 0; i < this.arrayProdutos.length; i++) {
        if (this.arrayProdutos[i].id == id) {
          this.arrayProdutos.splice(i, 1);
          tbody.deleteRow(i);
        }
      }
    }
  }
  edita(dados) {
    this.editId = dados.id;

    document.getElementById("produto").value = dados.nome;
    document.getElementById("preco").value = dados.preco;

    document.getElementById("bt1").innerText="Atualizar"
  }

  atualiza(id,produto){
    for (let i = 0; i < this.arrayProdutos.length; i++) {
        if (this.arrayProdutos[i].id == id){
            this.arrayProdutos[i].nome = produto.nome;
            this.arrayProdutos[i].preco = produto.preco;
        }

    }
  }
}
var produto = new Produto();
