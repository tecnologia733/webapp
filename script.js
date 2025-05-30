fetch("https://liturgia.up.railway.app/v2/")
  .then(response => {
    if (!response.ok) {
      throw new Error(`Erro na API: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    let liturgiaHTML = `<h2>${data.liturgia} - ${data.data}</h2>`;

    // Antífona de Entrada
    if (data.antifonas?.entrada) {
      liturgiaHTML += `<p><strong>Antífona de Entrada</strong> - ${data.antifonas.entrada}</p>`;
    }

    // Oração do Dia
    if (data.oracoes?.coleta) {
      liturgiaHTML += `<p><strong>Oração do Dia</strong> - ${data.oracoes.coleta}</p>`;
    }

    // Primeira Leitura
    if (data.leituras?.primeiraLeitura) {
      liturgiaHTML += `<p><strong>Primeira Leitura - ${data.leituras.primeiraLeitura.referencia}</strong> - ${data.leituras.primeiraLeitura.titulo} - ${data.leituras.primeiraLeitura.texto.replace(/\n/g, "<br>")}</p>`;
    }

    // Salmo
    if (data.leituras?.salmo) {
      liturgiaHTML += `<p><strong>Salmo - ${data.leituras.salmo.referencia}</strong> - ${data.leituras.salmo.refrao} - ${data.leituras.salmo.texto.replace(/\n/g, "<br>")}</p>`;
    }

    // Segunda Leitura (se houver)
    if (data.leituras?.segundaLeitura && data.leituras.segundaLeitura !== "Não há segunda leitura hoje!") {
      liturgiaHTML += `<p><strong>Segunda Leitura - ${data.leituras.segundaLeitura.referencia}</strong> - ${data.leituras.segundaLeitura.titulo} - ${data.leituras.segundaLeitura.texto.replace(/\n/g, "<br>")}</p>`;
    }

    // Evangelho
    if (data.leituras?.evangelho) {
      liturgiaHTML += `<p><strong>Evangelho - ${data.leituras.evangelho.referencia}</strong> - ${data.leituras.evangelho.titulo} - ${data.leituras.evangelho.texto.replace(/\n/g, "<br>")}</p>`;
    }

    document.getElementById("liturgia").innerHTML = liturgiaHTML;
  })
  .catch(error => {
    console.error("Erro ao carregar a liturgia:", error);
    document.getElementById("liturgia").innerHTML = `<p style="color:red;">Erro ao carregar os dados. Tente novamente mais tarde.</p>`;
  });
