/*
  --------------------------------------------------------------------------------------
  Função para obter a lista de esportistas registrados
  --------------------------------------------------------------------------------------
*/
const obterListaEsportistas = async () => {
    let url = "http://127.0.0.1:5001/esportistas";
    fetch(url, {method: "get",})
      .then((response) => response.json())
      .then((data) => {
        data.esportistas.forEach(esportista => 
          inserirListaEsportista(
            esportista.nomeCompleto, esportista.idade, 
            esportista.altura, esportista.peso
          )
        )
      })   
      .catch((error) => {
        console.error("Error:", error);
      });
  }


/*
  --------------------------------------------------------------------------------------
  Função para obter a lista de treinos registrados
  --------------------------------------------------------------------------------------
*/
const obterListaTreinos = async () => {
  let url = "http://127.0.0.1:5001/treinos";
  fetch(url, {method: "get",})
    .then((response) => response.json())
    .then((data) => {
      data.treinos.forEach(treino => 
        inserirListaTreino(
          treino.nomeEsportista, treino.dataTreino, treino.esporte,
          treino.duracao, treino.calorias, treino.bpm
        )
      )
    })   
    .catch((error) => {
      console.error("Error:", error);
    });
}
 

/*
  --------------------------------------------------------------------------------------
  Chamada da função para carregamento inicial dos dados da lista de esportistas e treinos
  --------------------------------------------------------------------------------------
*/
obterListaTreinos()
obterListaEsportistas()


/*
  --------------------------------------------------------------------------------------
  Função para adicionar um novo esportista
  --------------------------------------------------------------------------------------
*/
const postEsportista = async (
  inputNomeCompleto, inputIdade, inputAltura, inputPeso
) => {
  const formData = new FormData();
  formData.append("nomeCompleto", inputNomeCompleto);
  formData.append("idade", inputIdade);
  formData.append("altura", inputAltura);
  formData.append("peso", inputPeso);

  let url = "http://127.0.0.1:5001/adiciona_esportista";
  return fetch(url, {
    method: "post",
    body: formData
  })
    .then((response) => {
      if (response.ok) {
        return response.json()
      } else if (response.status == 409) {
        throw new Error("Já existe registro do esportista")
      } else {
        throw new Error("Não foi possível registrar novo esportista.")
      }
    });
}


/*
  --------------------------------------------------------------------------------------
  Função para adicionar um novo esportista
  --------------------------------------------------------------------------------------
*/
  const postTreino = async (
    inputNomeEsportista, inputDataTreino, inputEsporte, 
    inputDuracao, inputCaloria, inputBpm,
  ) => {
    const formData = new FormData();
    formData.append("nomeEsportista", inputNomeEsportista);
    formData.append("dataTreino", inputDataTreino);
    formData.append("esporte", inputEsporte);
    formData.append("duracao", inputDuracao);
    formData.append("calorias", inputCaloria);
    formData.append("bpm", inputBpm);
  
    let url = "http://127.0.0.1:5001/adiciona_treino";
    return fetch(url, {
      method: "post",
      body: formData
    })
      .then((response) => {
        if (response.ok) {
          return response.json()
        } else {
          return response.json()
          .then((result) => {
            throw new Error(result.message)
          })
        }
      });
  }


/*
  --------------------------------------------------------------------------------------
  Função para criar um botão close para cada item de uma lista
  --------------------------------------------------------------------------------------
*/
const inserirBotao = (parent) => {
  let span = document.createElement("span");
  let txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  parent.appendChild(span);
}


/*
  --------------------------------------------------------------------------------------
  Função para remover um item de uma lista de acordo com o click no botão close
  --------------------------------------------------------------------------------------
*/
const removeElement = () => {
  let close = document.getElementsByClassName("close");
  let i;
  for (i = 0; i < close.length; i++) {
    close[i].onclick = function () {
      let div = this.parentElement.parentElement;
      let table = div.parentElement.parentElement;

      if (confirm("Você tem certeza?")) {

        if (table.getAttribute("id") === "tabelaEsportista") {
          const nomeEsportista = div.getElementsByTagName("td")[0].innerHTML;
          deleteEsportista(nomeEsportista)
          const tableTreino = document.getElementById("tabelaTreino");
          let rows = tableTreino.getElementsByTagName("tr");
          for (let i = rows.length - 1; i >= 1; i--) {
            let cell = rows[i].getElementsByTagName("td")[0];
            let content = cell.innerText
            if (content === nomeEsportista) {
              rows[i].remove()
            }
          }
        } else {
          const nomeEsportista = div.getElementsByTagName("td")[0].innerHTML;
          const dataTreino = div.getElementsByTagName("td")[1].innerHTML;
          const esporte = div.getElementsByTagName("td")[2].innerHTML;
          deleteTreino(nomeEsportista, dataTreino, esporte)
        }

        div.remove()
        alert("Removido!")
      }
    }
  }
}


/*
  --------------------------------------------------------------------------------------
  Função para deletar um item da lista de esportistas e seus treinos associados ou
  apenas de um treino específico.
  --------------------------------------------------------------------------------------
*/
const deleteEsportista = (esportista) => {
  console.log(esportista)
  let url = "http://127.0.0.1:5001/esportista?nome=" + esportista;
  fetch(url, {
    method: "delete"
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error("Error:", error);
    });
}


/*
  --------------------------------------------------------------------------------------
  Função para deletar um item da lista de esportistas e seus treinos associados ou
  apenas de um treino específico.
  --------------------------------------------------------------------------------------
*/
const deleteTreino = (esportista, dataTreino, esporte) => {
  console.log(esportista, dataTreino, esporte)
  let url = "http://127.0.0.1:5001/treino?" +
            "nome=" + esportista + 
            "&data=" + dataTreino + 
            "&esporte=" + esporte
  fetch(url, {
    method: "delete"
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error("Error:", error);
    });
}


/*
  --------------------------------------------------------------------------------------
  Função para adicionar um novo esportista com nome completo, idade, altura e peso 
  --------------------------------------------------------------------------------------
*/
const registrarEsportista = () => {
  let inputNomeCompleto = document.getElementById("inputNomeCompleto").value;
  let inputIdade = document.getElementById("inputIdade").value;
  let inputAltura = document.getElementById("inputAltura").value;
  let inputPeso = document.getElementById("inputPeso").value;

  if (inputNomeCompleto === "") {
    alert("Nome completo do esportista deve ser informado!");
  } else if (inputIdade === "") {
    alert("A idade do esportista deve ser informada!");
  } else if (Number.isInteger(inputIdade)) {
    alert("A idade deve ser um número inteiro!");
  } else if (inputAltura !== "" && isNaN(inputAltura)) {
    alert("A altura quando informada deve ser um número!");
  } else if (inputPeso !== "" && isNaN(inputPeso)) {
    alert("O peso quando informado deve ser um número!");
  } else {
    
    postEsportista(inputNomeCompleto, inputIdade, inputAltura, inputPeso)
      .then(() => {
          inserirListaEsportista(inputNomeCompleto, inputIdade, inputAltura, inputPeso);
          alert("Esportista registrado!");
      })
      .catch((error) => {
          alert(error.message);
      });

  }
}


/*
  --------------------------------------------------------------------------------------
  Função para inserir items na lista de esportista
  --------------------------------------------------------------------------------------
*/
const inserirListaEsportista = (nomeCompleto, idade, altura, peso) => {
  var item = [nomeCompleto, idade, altura, peso]
  var tabelaEsportista = document.getElementById("tabelaEsportista");
  var linha = tabelaEsportista.insertRow();

  for (var i = 0; i < item.length; i++) {
    var cel = linha.insertCell(i);
    cel.textContent = item[i];
  } 
  inserirBotao(linha.insertCell(-1))
  document.getElementById("inputNomeCompleto").value = "";
  document.getElementById("inputIdade").value = "";
  document.getElementById("inputAltura").value = "";
  document.getElementById("inputPeso").value = "";

  removeElement()
}


/*
  --------------------------------------------------------------------------------------
  Função para adicionar um novo treino com esportista, data do treino, esporte,
  duracao, caloria e bpm 
  --------------------------------------------------------------------------------------
*/
  const timeRegex = /^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/;

  const registrarTreino = () => {
    let inputNomeEsportista = document.getElementById("inputNomeEsportista").value;
    let inputDataTreino = document.getElementById("inputDataTreino").value;
    let inputEsporte = document.getElementById("inputEsporte").value;
    let inputDuracao = document.getElementById("inputDuracao").value;
    let inputCaloria = document.getElementById("inputCaloria").value;
    let inputBpm = document.getElementById("inputBpm").value;
  
    if (inputNomeEsportista === "") {
      alert("Nome completo do esportista deve ser informado!");
    } else if (inputDataTreino === "") {
      alert("A data do treino deve ser informada!")
    } else if (inputDuracao !== "" && !timeRegex.test(inputDuracao)) {
      alert("O tempo de duração quando informado deve ser dado em hh:mm:ss");
    } else if (inputCaloria !== "" && isNaN(inputCaloria)) {
      alert("A caloria quando informada deve ser um número!")
    } else if (inputBpm !== "" && isNaN(inputBpm)) {
      alert("O peso quando informado deve ser um número!")
    } else {

      postTreino(            
        inputNomeEsportista, inputDataTreino, inputEsporte, 
        inputDuracao, inputCaloria, inputBpm,
      )
      .then(() => {
        dataTreinoModificada = alteraDataPadraoISO(inputDataTreino)
        inserirListaTreino(
          inputNomeEsportista, dataTreinoModificada, inputEsporte, 
          inputDuracao, inputCaloria, inputBpm,
        );
          alert("Treino registrado!");
      })
      .catch((error) => {
          alert(error.message);
      });

    }
  }


/*
  --------------------------------------------------------------------------------------
  Função para inserir items na lista de treino
  --------------------------------------------------------------------------------------
*/
  const inserirListaTreino = (nomeEsportista, dataTreino, esporte, duracao, calorias, bpm) => {
    var item = [nomeEsportista, dataTreino, esporte, duracao, calorias, bpm]
    var tabelaTreino = document.getElementById("tabelaTreino");
    var linha = tabelaTreino.insertRow();
  
    for (var i = 0; i < item.length; i++) {
      var cel = linha.insertCell(i);
      cel.textContent = item[i];
    } 
    inserirBotao(linha.insertCell(-1))
    document.getElementById("inputNomeEsportista").value = "";
    document.getElementById("inputDataTreino").value = "";
    document.getElementById("inputEsporte").value = "";
    document.getElementById("inputDuracao").value = "";
    document.getElementById("inputCaloria").value = "";
    document.getElementById("inputBpm").value = "";
  
    removeElement()
  }


/*
  --------------------------------------------------------------------------------------
  Função para visualizar uma determinada funcionalidade
  --------------------------------------------------------------------------------------
*/
let idLastElemento = null;

const visualizarElemento = (idElemento) => {
  let elemento = document.getElementById(idElemento);
  let hidden = elemento.getAttribute("hidden");

  if (idLastElemento !== null) {
    if (idLastElemento === idElemento) { 
        if (hidden) {
          elemento.removeAttribute("hidden");
        } else {
          elemento.setAttribute("hidden", "hidden");
        }
    } else {
      let lastElemento = document.getElementById(idLastElemento);
        if (hidden) {
          elemento.removeAttribute("hidden");
          lastElemento.setAttribute("hidden", "hidden");
        } else {
          elemento.setAttribute("hidden", "hidden");
          lastElemento.removeAttribute("hidden");
        }
    }
  }
  else {
    elemento.removeAttribute("hidden");
  }

  idLastElemento = idElemento
}


/*
  --------------------------------------------------------------------------------------
  Função para alterar o padrão ISO de data para o padrão brasileiro
  --------------------------------------------------------------------------------------
*/
function alteraDataPadraoISO(strDataISO) {
  const options = {day: "2-digit", month: "2-digit", year: "numeric"};
  var dataISO = new Date(strDataISO);
  var strDataBR = dataISO.toLocaleDateString("pt-BR", options);
  return strDataBR
}
