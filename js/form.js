const formulario = document.getElementById('formulario');

formulario.addEventListener('submit', async (event) => {
    event.preventDefault();

    const emailInput = document.getElementById('email');
    const email = emailInput.value.trim(); 
    const product = document.getElementById('product').value;

    if (email.length === 0) {
        alert("Email requerido");
        emailInput.focus();
        return;
    }

    const datos = {
        email: email,
        product: product
    };

    try {
        const respuesta = await fetch('https://databasedawm-default-rtdb.firebaseio.com/collection.json', {
            method: 'POST',
            body: JSON.stringify(datos),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!respuesta.ok) {
            throw new Error('Error en la solicitud');
        }

        const datosRespuesta = await respuesta.json();
        alert("Tu respuesta ha sido enviada");
        console.log(datosRespuesta); 

        obtenerDatos();

        formulario.reset();


    } catch (error) {
        console.error('Error:', error);
        alert('Hubo un error al enviar los datos');
    }
});


async function obtenerDatos() {
    const url = "https://databasedawm-default-rtdb.firebaseio.com/collection.json";
    const respuesta = await fetch(url);

    if (!respuesta.ok) {
        console.error("Error:", respuesta.status);
        return;
    }

    const datos = await respuesta.json();
    let votesMap = new Map();

    for (const key in datos) {
        let vote = datos[key];
        let product = vote['product'];
        let conteo = votesMap.has(product) ? votesMap.get(product) + 1 : 1;
        votesMap.set(product, conteo);
    }

    let total = 0;
    let tablebody = document.getElementById('tablebody');
    tablebody.innerHTML = ''; 

    votesMap.forEach((count, product) => {
        let template = `
        <tr>
            <td>${product}</td>
            <td>${count}</td>
        </tr>
        `;
        tablebody.innerHTML += template;
        total += count;
    });


    tablebody.innerHTML += `
    <tr>
        <td class="text-black font-weight-bold"><strong>Total</strong></td>
        <td class="text-black font-weight-bold"><strong>${total}</strong></td>
    </tr>
    `;
}

obtenerDatos();





