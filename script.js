fetch("https://liturgia.up.railway.app/v2/")
  .then(response => {
    if (!response.ok) {
      throw new Error(`Erro na API: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    if (!data || Object.keys(data).length === 0) {
      throw new Error("Nenhum dado encontrado na API.");
    }

    let liturgiaHTML = `<h2>${data.liturgia} - ${data.data}</h2>
                        <p><strong>Cor Litúrgica:</strong> ${data.cor}</p>
                        <h3>Coleta</h3><p>${data.oracoes.coleta}</p>
                        <h3>Oferendas</h3><p>${data.oracoes.oferendas}</p>
                        <h3>Comunhão</h3><p>${data.oracoes.comunhao}</p>`;

    // Exibir leituras e verificar se existem
    if (data.leituras) {
      Object.keys(data.leituras).forEach(tipoLeitura => {
        const leitura = data.leituras[tipoLeitura];
        if (leitura && typeof leitura === "object") {
          liturgiaHTML += `<h3>${tipoLeitura}</h3>
                           <p><strong>${leitura.referencia}</strong></p>
                           <p>${leitura.titulo}</p>
                           <p>${leitura.texto.replace(/\n/g, "<br>")}</p>`;
        }
      });
    }

    // Exibir antífonas se existirem
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
    document.getElementById("liturgia").innerHTML = `<p style="color:red;">Erro ao carregar os dados. Tente novamente mais tarde.</p>`;
  });
