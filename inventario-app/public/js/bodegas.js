import { db, collection, addDoc, getDocs } from "../firebase.js";

const formulario = document.getElementById('formularioBodega');
const tablaBodegas = document.getElementById('tablaBodegas');

// Función para cargar bodegas existentes
const cargarBodegas = async () => {
  const snapshot = await getDocs(collection(db, "bodegas"));
  const bodegas = snapshot.docs.map(doc => doc.data());

  tablaBodegas.innerHTML = bodegas.map(bodega => `
    <tr>
      <td>${bodega.nombre}</td>
      <td>${bodega.localizacion}</td>
      <td>${bodega.codigo}</td>
      <td>${bodega.tipoMaterial}</td>
      <td>${bodega.manejaLote}</td>
    </tr>
  `).join('');
};

// Función para guardar nueva bodega
formulario.addEventListener('submit', async (e) => {
  e.preventDefault();

  const nombre = document.getElementById('nombreBodega').value;
  const localizacion = document.getElementById('localizacion').value;
  const codigo = document.getElementById('codigo').value;
  const tipoMaterial = document.getElementById('tipoMaterial').value;
  const manejaLote = document.getElementById('manejaLote').value;

  try {
    await addDoc(collection(db, "bodegas"), {
      nombre,
      localizacion,
      codigo,
      tipoMaterial,
      manejaLote
    });

    alert('✅ Bodega creada exitosamente');

    formulario.reset();
    cargarBodegas();
  } catch (error) {
    console.error('❌ Error al crear bodega:', error);
    alert('Hubo un error al crear la bodega');
  }
});

// Al cargar la página, mostramos las bodegas
cargarBodegas();
