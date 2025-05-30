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
      liturgiaHTML += `<p><strong>Antífona de Entrada</strong> - ${data.antifonas.entrada}</p><br>`;
    }

    // Oração do Dia
    if (data.oracoes?.coleta) {
      liturgiaHTML += `<p><strong>Oração do Dia</strong> - ${data.oracoes.coleta}</p><br>`;
    }

    // Primeira Leitura
    if (data.primeiraLeitura) {
      liturgiaHTML += `<p><strong>Primeira Leitura - ${data.primeiraLeitura.referencia}</strong></p>
                       <p>${data.primeiraLeitura.titulo}</p>
                       <p>${data.primeiraLeitura.texto.replace(/\n/g, "<br>")}</p><br>`;
    }

    // Salmo
    if (data.salmo) {
      liturgiaHTML += `<p><strong>Salmo - ${data.salmo.referencia}</strong></p>
                       <p>${data.salmo.refrao}</p>
                       <p>${data.salmo.texto.replace(/\n/g, "<br>")}</p><br>`;
    }

    // Segunda Leitura (se houver)
    if (data.segundaLeitura && data.segundaLeitura !== "Não há segunda leitura hoje!") {
      liturgiaHTML += `<p><strong>Segunda Leitura - ${data.segundaLeitura.referencia}</strong></p>
                       <p>${data.segundaLeitura.titulo}</p>
                       <p>${data.segundaLeitura.texto.replace(/\n/g, "<br>")}</p><br>`;
    }

    // Evangelho
    if (data.evangelho) {
      liturgiaHTML += `<p><strong>Evangelho - ${data.evangelho.referencia}</strong></p>
                       <p>${data.evangelho.titulo}</p>
                       <p>${data.evangelho.texto.replace(/\n/g, "<br>")}</p><br>`;
    }

    document.getElementById("liturgia").innerHTML = liturgiaHTML;
  })
  .catch(error => {
    console.error("Erro ao carregar a liturgia:", error);
    document.getElementById("liturgia").innerHTML = `<p style="color:red;">Erro ao carregar os dados. Tente novamente mais tarde.</p>`;
  });
