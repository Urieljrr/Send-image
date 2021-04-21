const formulario = document.getElementById('formulario');
const inputs = document.querySelectorAll('#formulario input');

const validarForm = (e) => {
  console.log(e.target.name);
}

inputs.forEach((input)=>{
  input.addEventListener('keyup', validarForm);
});
//formulario.addEventListener('submit', () => {})