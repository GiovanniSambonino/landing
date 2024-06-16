const formulario = document.getElementById('formulario');
formulario.addEventListener('submit', (event) => {
    event.preventDefault();

    if (email.value.length == 0) {
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

    let votesMap = new Map();
    for (const key in datos) {
        let vote = datos[key]
        let producto = vote['product']

        let conteo = votesMap.has(producto) ? votesMap.get(producto) + 1 : 1;
        votesMap.set(producto, conteo)
    }

    total = 0
    tablebody.innerHTML = ''

    console.log(votesMap)

    for (let key of votesMap.keys()) {
        template += `
        <tr>
            <td>${key}</td>
            <td>${votesMap.get(key)}</td>
        </tr>
        `
        tablebody.innerHTML += template

        total += votesMap.get(key)
    }
    tablebody.innerHTML +=`
    <tr>
        <td class="text-black font-weight-bold"><strong>Productos<strong></td>
        <td class="text-black font-weight-bold"><strong>${total}<strong></td>
    </tr>
    `
}
obtenerDatos();




