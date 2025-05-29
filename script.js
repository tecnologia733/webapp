fetch("https://liturgia.up.railway.app/v2/")
  .then(response => response.json())
  .then(data => {
    document.getElementById("liturgia").innerHTML = `
      <h2>${data.liturgia} - ${data.data}</h2>
      <p><strong>Cor Litúrgica:</strong> ${data.cor}</p>
      <h3>Coleta</h3>
      <p>${data.oracoes.coleta}</p>
    `;
  })
  .catch(error => {
    console.error("Erro ao carregar a liturgia:", error);
    document.getElementById("liturgia").innerHTML = `<p style="color:red;">Erro ao carregar os dados.</p>`;
  });

