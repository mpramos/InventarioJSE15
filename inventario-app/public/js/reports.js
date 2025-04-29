import { db, collection, getDocs } from "./firebase.js";


export default async function getReportsFirebase() {
  const mercanciaTotal = document.getElementById('mercanciaTotal');
  const ingresosMercancia = document.getElementById('ingresosMercancia');
  const devolucionesProveedor = document.getElementById('devolucionesProveedor');
  const tablaProductos = document.getElementById('tablaProductos');
  
  const snapshot = await getDocs(collection(db, "productos"));
  const productos = snapshot.docs.map(doc => doc.data());

  // Calcular mercancia total
  const totalStock = productos.reduce((acc, prod) => acc + (prod.stock || 0), 0);
  mercanciaTotal.innerText = totalStock.toLocaleString();

  // Simular ingresos de mercancía hoy
  const ingresosHoy = productos.reduce((acc, prod) => acc + (prod.cantidad || 0), 0);
  ingresosMercancia.innerText = ingresosHoy.toLocaleString();

  // Simular devoluciones
  const devoluciones = Math.floor(totalStock * 0.15);
  devolucionesProveedor.innerText = devoluciones.toLocaleString();

  // Cargar tabla de productos
  tablaProductos.innerHTML = productos.map(prod => `
    <tr>
      <td>${prod.nombre || prod.title}</td>
      <td>${prod.tipoMaterial || '—'}</td>
      <td>${prod.stock || prod.cantidad || 0}</td>
      <td>${prod.fechaCreacion || '-'}</td>
      <td>${prod.horaModificacion || '-'}</td>
    </tr>
  `).join('');

  // Crear gráfica de ingresos
  const ctx = document.getElementById('graficoIngresos').getContext('2d');
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
      datasets: [{
        label: 'Ingresos',
        data: [200000, 400000, 600000, 300000, 250000, 450000, 500000, 400000, 550000],
        fill: true,
        tension: 0.4,
        borderColor: 'blue',
        backgroundColor: 'rgba(0,0,255,0.1)'
      }]
    },
    options: {
      responsive: true
    }
  });
};
