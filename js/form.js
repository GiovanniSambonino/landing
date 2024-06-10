const formulario = document.getElementById('formulario');
formulario.addEventListener('submit', (event) => {
    event.preventDefault();

    if(email.value.length==0){
        alert("email requerido")
        email.focus()
        return;
    }
    const email = document.getElementById('email').value;
    const product = document.getElementById('product').value;
    const datos = {
        email: email,
        product: product
    };
    fetch('https://databasedawm-default-rtdb.firebaseio.com/collection.json', {
        method: 'POST',
        body: JSON.stringify(datos),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(respuesta => respuesta.json())
        .then(datos => {
            alert("Tu respuesta ha sido enviada")
            console.log(datos); // Imprimir la respuesta del servidor

        })
        .catch(error => console.error(error));
});

async function obtenerDatos() {
    const url = "https://databasedawm-default-rtdb.firebaseio.com/collection.json"; // Reemplaza con la URL real de la API o recurso
    const respuesta = await fetch(url);
    if (!respuesta.ok) {
    console.error("Error:", respuesta.status);
    return;
    }
    const datos = await respuesta.json();
    console.log(datos); // Procesar o mostrar los datos obtenidos
    const tablaBody = document.getElementById('tablebody');
    Object.keys(datos).forEach(key => {
        const { product, conteo } = datos[key];
        let fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${product}</td>
            <td>${conteo}</td>
        `;
        tablaBody.appendChild(fila);
    });
    }
    obtenerDatos();

    
