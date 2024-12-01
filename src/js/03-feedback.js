import _ from 'lodash';
// Funcția throttle este deja disponibilă prin librăria lodash
const throttle = lodash.throttle; // Accesăm funcția throttle

// Funcția care salvează datele formularului în localStorage
const saveFeedback = (data) => {
    localStorage.setItem("feedback-form-state", JSON.stringify(data));
};

// Funcția pentru a completa câmpurile formularului cu datele salvate în localStorage
const populateForm = () => {
    const savedData = localStorage.getItem("feedback-form-state");
    if (savedData) {
        const { email, message } = JSON.parse(savedData);
        document.querySelector('[name="email"]').value = email || '';
        document.querySelector('[name="message"]').value = message || '';
    }
};

// Funcția care gestionează trimiterea formularului
const handleSubmit = (event) => {
    event.preventDefault(); // Previne trimiterea formularului în mod implicit

    const email = document.querySelector('[name="email"]').value;
    const message = document.querySelector('[name="message"]').value;

    // Afișăm obiectul în consolă
    console.log({ email, message });

    // Ștergem datele din localStorage după trimiterea formularului
    localStorage.removeItem("feedback-form-state");

    // Resetăm formularul
    event.target.reset();
};

// Folosim lodash pentru a limita frecvența salvării datelor
const handleInput = throttle(() => {
    const email = document.querySelector('[name="email"]').value;
    const message = document.querySelector('[name="message"]').value;
    const data = { email, message };
    saveFeedback(data); // Salvăm datele curente în localStorage
}, 500); // Limitează la 500ms

// La încărcarea paginii, completăm formularul dacă sunt date salvate
window.addEventListener('DOMContentLoaded', populateForm);

// Ascultăm evenimentul de input pe câmpurile formularului
document.querySelector('.feedback-form').addEventListener('input', handleInput);

// Ascultăm evenimentul de submit al formularului
document.querySelector('.feedback-form').addEventListener('submit', handleSubmit);