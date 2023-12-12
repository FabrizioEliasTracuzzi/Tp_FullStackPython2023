// Botón "Realizar Compra"
const checkoutButton = document.getElementById("checkout-button");
checkoutButton.addEventListener("click", () => {
    // Muestra el formulario de confirmación
    document.getElementById("confirmation-form").style.display = "block";
});

