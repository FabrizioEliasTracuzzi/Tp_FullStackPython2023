const { createApp } = Vue;

createApp({
  data() {
    return {
      contacto: [], // Esta es la lista donde almacenarás las consultas
    };
  },
  methods: {
    fetchData() {
      // Aquí realizarías la lógica para obtener tus datos de consultas desde el servidor
      // Puedes usar fetch o axios, por ejemplo
      fetch('http://localhost:5000/consultas')
        .then(response => response.json())
        .then(data => {
          this.contacto = data;
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    },
  },
  created() {
    // Llamar a fetchData cuando se crea la instancia de Vue para cargar las consultas
    this.fetchData();
  },
}).mount('#app');