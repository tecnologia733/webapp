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
      liturgiaHTML += `<h3><strong>Antífona de Entrada</strong></h3>
                       <p>${data.antifonas.entrada}</p>`;
    }

    // Oração do Dia
    if (data.oracoes?.coleta) {
      liturgiaHTML += `<h3><strong>Oração do Dia</strong></h3>
                       <p>${data.oracoes.coleta}</p>`;
    }

    // Primeira Leitura
    if (data.primeiraLeitura) {
      liturgiaHTML += `<h3><strong>Primeira Leitura - ${data.primeiraLeitura.referencia}</strong></h3>
                       <p>${data.primeiraLeitura.titulo}</p>
                       <p>${data.primeiraLeitura.texto.replace(/\n/g, "<br>")}</p>`;
    }

    // Salmo
    if (data.salmo) {
      liturgiaHTML += `<h3><strong>Salmo - ${data.salmo.referencia}</strong></h3>
                       <p><em>${data.salmo.refrao}</em></p>
                       <p>${data.salmo.texto.replace(/\n/g, "<br>")}</p>`;
    }

    // Segunda Leitura (se houver)
    if (data.segundaLeitura && data.segundaLeitura !== "Não há segunda leitura hoje!") {
      liturgiaHTML += `<h3><strong>Segunda Leitura - ${data.segundaLeitura.referencia}</strong></h3>
                       <p>${data.segundaLeitura.titulo}</p>
                       <p>${data.segundaLeitura.texto.replace(/\n/g, "<br>")}</p>`;
    }

    // Evangelho
    if (data.evangelho) {
      liturgiaHTML += `<h3><strong>Evangelho - ${data.evangelho.referencia}</strong></h3>
                       <p>${data.evangelho.titulo}</p>
                       <p>${data.evangelho.texto.replace(/\n/g, "<br>")}</p>`;
    }

    document.getElementById("liturgia").innerHTML = liturgiaHTML;
  })
  .catch(error => {
    console.error("Erro ao carregar a liturgia:", error);
    document.getElementById("liturgia").innerHTML = `<p style="color:red;">Erro ao carregar os dados. Tente novamente mais tarde.</p>`;
  });
