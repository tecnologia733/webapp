fetch("https://liturgia.up.railway.app/")
  .then(response => response.json())
  .then(data => {
    document.getElementById("liturgia").innerHTML = `
      <h2>${data.title}</h2>
      <p>${data.content}</p>
    `;
  })
  .catch(error => console.error("Erro ao carregar a liturgia:", error));
