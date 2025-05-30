fetch("https://liturgia.up.railway.app/v2/")
  .then(response => {
    if (!response.ok) {
      throw new Error(`Erro na API: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    let liturgiaHTML = `<h2>${data.data} - ${data.liturgia}</h2>`;

    // Antífona de Entrada
    if (data.antifonas?.entrada) {
      liturgiaHTML += `<p><strong>Antífona de Entrada</strong> 
      <p>${data.antifonas.entrada}</p><br>`;
    }

    // Oração do Dia
    if (data.oracoes?.coleta) {
      liturgiaHTML += `<h3><strong>Oração do Dia</strong></h3>
                       <p>${data.oracoes.coleta}</p><br>`;
    }

    // Primeira Leitura
    if (data.leituras?.primeiraLeitura?.length > 0) {
      let leitura = data.leituras.primeiraLeitura[0];
      liturgiaHTML += `<h3><strong>Primeira Leitura - ${leitura.referencia}</strong></h3>
                       <p>${leitura.titulo}</p>
                       <p>${leitura.texto.replace(/\n/g, "<br>")}</p><br>`;
    }

    // Salmo
    if (data.leituras?.salmo?.length > 0) {
      let salmo = data.leituras.salmo[0];
      liturgiaHTML += `<h3><strong>Salmo - ${salmo.referencia}</strong></h3>
                       <p>${salmo.refrao}</p>
                       <p>${salmo.texto.replace(/\n/g, "<br>")}</p><br>`;
    }

    // Segunda Leitura (se houver)
    if (data.leituras?.segundaLeitura?.length > 0) {
      let segundaLeitura = data.leituras.segundaLeitura[0];
      liturgiaHTML += `<h3><strong>Segunda Leitura - ${segundaLeitura.referencia}</strong></h3>
                       <p>${segundaLeitura.titulo}</p>
                       <p>${segundaLeitura.texto.replace(/\n/g, "<br>")}</p><br>`;
    }

    // Evangelho
    if (data.leituras?.evangelho?.length > 0) {
      let evangelho = data.leituras.evangelho[0];
      liturgiaHTML += `<h3><strong>Evangelho - ${evangelho.referencia}</strong></h3>
                       <p>${evangelho.titulo}</p>
                       <p>${evangelho.texto.replace(/\n/g, "<br>")}</p><br>`;
    }

    document.getElementById("liturgia").innerHTML = liturgiaHTML;
  })
  .catch(error => {
    console.error("Erro ao carregar a liturgia:", error);
    document.getElementById("liturgia").innerHTML = `<p style="color:red;">Erro ao carregar os dados. Tente novamente mais tarde.</p>`;
  });
