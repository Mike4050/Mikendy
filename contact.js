document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    const submitButton = document.querySelector('.btn');

    // Créer un élément pour afficher le message de succès
    const successMessage = document.createElement('div');
    successMessage.style.display = 'none';
    successMessage.style.color = 'green';
    form.appendChild(successMessage);

    submitButton.addEventListener('click', (e) => {
        e.preventDefault(); // Empêche l'envoi réel du formulaire

        // Vérifier si tous les champs sont remplis
        const fields = form.querySelectorAll('input, textarea');
        let allFilled = true;

        fields.forEach(field => {
            if (!field.value.trim()) {
                allFilled = false;
                field.style.border = '1px solid red';
            } else {
                field.style.border = '';
            }
        });

        if (allFilled) {
            // Afficher le message de succès
            successMessage.textContent = 'Message envoyé avec succès !';
            successMessage.style.display = 'block';

            // Vider les champs
            form.reset();

            // Masquer le message après 3 secondes
            setTimeout(() => {
                successMessage.style.display = 'none';
            }, 3000);
        }
    });
});
