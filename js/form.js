const formulario = document.getElementById('formulario');
formulario.addEventListener('submit', (event) => {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const datos = {
        email: email
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
