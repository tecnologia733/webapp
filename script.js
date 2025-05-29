fetch("https://liturgia.up.railway.app/v2/")
  .then(response => response.json())
  .then(data => {
    let liturgiaHTML = `<h2>${data.liturgia} - ${data.data}</h2>
                        <p><strong>Cor Litúrgica:</strong> ${data.cor}</p>
                        <h3>Coleta</h3>
                        <p>${data.oracoes.coleta}</p>`;

    // Exibir todas as leituras
    if (data.leituras) {
      Object.keys(data.leituras).forEach(tipoLeitura => {
        data.leituras[tipoLeitura].forEach(leitura => {
          liturgiaHTML += `<h3>${tipoLeitura}</h3>
                           <p><strong>${leitura.referencia}</strong></p>
                           <p>${leitura.titulo}</p>
                           <p>${leitura.texto.replace(/\n/g, "<br>")}</p>`;
        });
      });
    }

    // Exibir todas as orações extras
    if (data.oracoes.extras) {
      liturgiaHTML += `<h3>Orações Extras</h3>`;
      data.oracoes.extras.forEach(orcao => {
        liturgiaHTML += `<h4>${orcao.titulo}</h4>
                         <p>${orcao.texto.replace(/\n/g, "<br>")}</p>`;
      });
    }

    document.getElementById("liturgia").innerHTML = liturgiaHTML;
  })
  .catch(error => {
    console.error("Erro ao carregar a liturgia:", error);
    document.getElementById("liturgia").innerHTML = `<p style="color:red;">Erro ao carregar os dados.</p>`;
  });
