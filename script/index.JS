fetch('/.netlify/functions/enviarFormulario', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        nome: 'Hellan Lins',
        email: 'hellan.lins@gmail.coml.com',
    }),
})
.then(response => response.json())
.then(data => {
    console.log('Success:', data);
})
.catch((error) => {
    console.error('Error:', error);
});