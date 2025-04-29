import { db, collection, getDocs, updateDoc, doc } from "./firebase.js";

const actualizarProductos = async () => {
    try {
        const snapshot = await getDocs(collection(db, "productos"));
        if (snapshot.empty) {
            console.log(" No hay productos para actualizar.");
            return;
        }
        const updates= snapshot.docs.map(async (documento) => {
            const referencia= doc(db, "productos", documento.id);
            const data = documento.data();
            let presentacion = "Caja";
            let ubicacion = "Bodega Principal";
            let fechaVencimiento = "";
            let tipoMaterial = "Insumo";
            if (data.category) {
                const categoria = data.category.toLowerCase();
                if (categoria.includes("men's clothing")) {
                    presentacion = "Paquete";
                    ubicacion = "Bodega 1";
                    fechaVencimiento = "01/01/2025"; // Ejemplo de fecha de vencimiento
                    tipoMaterial = "Textil";
                } else if (categoria.includes("jewelery")) {
                    presentacion = "Caja";
                    ubicacion = "Bodega 2";
                    tipoMaterial = "Accesorio";
                    fechaVencimiento = "01/01/2026"; // Ejemplo de fecha de vencimiento
                } else if (categoria.includes("electronics")) {
                    presentacion = "Caja";
                    ubicacion = "Bodega 3";
                    fechaVencimiento = "01/01/2027"; // Ejemplo de fecha de vencimiento
                    tipoMaterial = "Electrónico";
                } else if (categoria.includes("women's clothing")) {
                    presentacion = "Paquete";
                    ubicacion = "Bodega 4";
                    fechaVencimiento = "01/01/2028"; // Ejemplo de fecha de vencimiento
                    tipoMaterial = "Textil";
                }
            }

            await updateDoc(referencia,{
                tipoMaterial:tipoMaterial,
                bodega:ubicacion,
                stock:Math.floor(Math.random() * 500) + 1,
                fechaCreacion:"15/03/2024",
                horaModificacion:"10:00:00 AM",
                devuelto:false,
                 // Nuevos campos para detalle conteo
                codigoBarras: Math.floor(1000 + Math.random() * 9000), 
                nombre: data.title || "Producto sin nombre",
                presentacion: presentacion,
                categoria: data.category || "Sin categoría",
                cantidad: Math.floor(Math.random() * 100) + 1,
                ubicacion: ubicacion,
                fechaVencimiento: fechaVencimiento || "Sin fecha de vencimiento",
                lote: Math.floor(10000000 + Math.random() * 90000000)

            })
            console.log(`Producto ${documento.id} actualizado.`);
        }); 
        await Promise.all(updates);
        console.log("Todos los productos han sido actualizados.");
    } catch (error) {
        console.error("Error al actualizar el producto: ", error);
    }
}
actualizarProductos();