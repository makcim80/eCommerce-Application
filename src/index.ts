import './style.css';

const greeting = document.querySelector('body');
if (greeting) {
  greeting.classList.add('bg-red-500');
  greeting.textContent = 'Hello world!!!';
}
