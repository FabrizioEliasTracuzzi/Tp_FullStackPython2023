console.log(location.search);

const urlParams = new URLSearchParams(location.search);
const id = urlParams.get('id'); 

const { createApp } = Vue;

createApp({
  data() {
    return {
      id: 0,
      nombre: "",
      imagen: "",
      stock: 0,
      precio: 0,
      url: `http://localhost:5000/productos/${id}`,
      error: false,
    };
  },
  methods: {
    fetchData(url) {
      fetch(url)
        .then(response => response.json())
        .then(data => {
          console.log(data);
          this.id = data.id;
          this.nombre = data.nombre;
          this.imagen = data.imagen;
          this.stock = data.stock;
          this.precio = data.precio;
        })
        .catch(err => {
          console.error(err);
          this.error = true;
        });
    },
    modificar() {
      let producto = {
        nombre: this.nombre,
        precio: this.precio,
        stock: this.stock,
        imagen: this.imagen,
      };

      var options = {
        body: JSON.stringify(producto),
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        redirect: 'follow',
      };

      fetch(this.url, options)
        .then(response => {
          if (!response.ok) {
            throw new Error('Error al modificar el registro');
          }
          return response.json();
        })
        .then(data => {
          alert('Registro modificado');
          // Considera manejar la respuesta del servidor de manera más detallada si es necesario
          window.location.href = './productos.html';
        })
        .catch(err => {
          console.error(err);
          alert('Error al modificar el registro');
        });
    },
  },
  created() {
    this.fetchData(this.url);
  },
}).mount('#app');
