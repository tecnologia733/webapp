fetch("https://liturgia.up.railway.app/v2/")
  .then(response => response.json())
  .then(data => {
    let liturgiaHTML = `<h2>${data.liturgia} - ${data.data}</h2>
                        <p><strong>Cor Litúrgica:</strong> ${data.cor}</p>`;

    // Exibir todas as orações (coleta, oferendas, comunhão)
    liturgiaHTML += `<h3>Coleta</h3><p>${data.oracoes.coleta}</p>`;
    liturgiaHTML += `<h3>Oferendas</h3><p>${data.oracoes.oferendas}</p>`;
    liturgiaHTML += `<h3>Comunhão</h3><p>${data.oracoes.comunhao}</p>`;

    // Exibir todas as leituras (primeira, segunda, salmo, evangelho)
    if (data.leituras) {
      Object.keys(data.leituras).forEach(tipoLeitura => {
        const leitura = data.leituras[tipoLeitura];
        if (typeof leitura === "object") {
          liturgiaHTML += `<h3>${tipoLeitura}</h3>
                           <p><strong>${leitura.referencia}</strong></p>
                           <p>${leitura.titulo}</p>
                           <p>${leitura.texto.replace(/\n/g, "<br>")}</p>`;
        }
      });
    }

    // Exibir todas as antífonas
    if (data.antifonas) {
      liturgiaHTML += `<h3>Antífonas</h3>`;
      Object.keys(data.antifonas).forEach(tipo => {
        liturgiaHTML += `<h4>${tipo}</h4><p>${data.antifonas[tipo]}</p>`;
      });
    }

    document.getElementById("liturgia").innerHTML = liturgiaHTML;
  })
  .catch(error => {
    console.error("Erro ao carregar a liturgia:", error);
    document.getElementById("liturgia").innerHTML = `<p style="color:red;">Erro ao carregar os dados.</p>`;
  });
