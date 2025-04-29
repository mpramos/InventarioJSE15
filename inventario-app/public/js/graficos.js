import { db, collection, getDocs } from "../js/firebase.js";

const obtenerDatos = async () => {
    const snapshot = await getDocs(collection(db, "productos"));
    const productos = snapshot.docs.map(doc => doc.data());
  
    const conteoPorCategoria = {};
    productos.forEach(prod => {
      if (prod.category) {
        conteoPorCategoria[prod.category] = (conteoPorCategoria[prod.category] || 0) + 1;
      }
    });
  
    mostrarGrafico(Object.keys(conteoPorCategoria), Object.values(conteoPorCategoria));
  };
  const mostrarGrafico = (labels, data) => {
    const ctx = document.getElementById("graficoCategorias");
    if (!ctx) return;
  
    new Chart(ctx, {
      type: "bar",
      data: {
        labels: labels,
        datasets: [{
          label: "Cantidad de productos",
          data: data,
          backgroundColor: "rgba(75, 192, 192, 0.6)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  };
  
  obtenerDatos();