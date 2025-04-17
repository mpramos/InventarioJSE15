import {db,collection,getDocs} from "./firebase.js"

let productosGlobales = [];

const getProductsFirebase = async () => {
    const querySnapshot = await getDocs(collection(db, 'productos'));
    productosGlobales = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
    cargarCategorias();
    displayProducts(productosGlobales);
};

const cargarCategorias = () => {
    const categories = [...new Set(productosGlobales.map(producto => producto.category))];
    const categorySelect = document.getElementById('category-filter');
    categorySelect.innerHTML = `<option value="">Todas las categorías</option>` +
        categories.map(category => `<option value="${category}">${category}</option>`).join('');
};

const displayProducts = (productos) => {
    const container = document.getElementById('container-products');
    container.innerHTML = productos.map((producto, index) => `
        <div>
            <img height='120px' src="${producto.image}" alt="">
            <p>${producto.title}</p>
            <div>
                <button class="btn btn-danger " id="editar-${index}">Editar</button>
                <button class="btn btn-danger " id="eliminar-${index}">Eliminar</button>
            </div>
        </div>
    `).join('');
};

const filtrarProductos = () => {
    const searchQuery = document.getElementById('search').value.toLowerCase();
    const selectedCategory = document.getElementById('category-filter').value;
    const productosFiltrados = productosGlobales.filter(producto => {
    const cumpleBusqueda = producto.title.toLowerCase().includes(searchQuery) ||
            producto.category.toLowerCase().includes(searchQuery) ||
            producto.price.toString().includes(searchQuery);
        const cumpleCategoria = !selectedCategory || producto.category === selectedCategory;
        return cumpleBusqueda && cumpleCategoria;
    });
    displayProducts(productosFiltrados);
};

document.getElementById('search').addEventListener('input', filtrarProductos);
document.getElementById('category-filter').addEventListener('change', filtrarProductos);

export { getProductsFirebase, filtrarProductos };