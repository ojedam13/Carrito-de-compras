// Variables

const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciaCarritoBtn = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito = [];

cargarEventListeners();
function cargarEventListeners() {
    //Cuando agregar un curso presionando "agregar al carrito"
    listaCursos.addEventListener('click', agregarCurso);

}


// Funciones

function agregarCurso(e) {
    e.preventDefault();
    if (e.target.classList.contains('agregar-carrito')) {
        const cursoSeleccionado = e.target.parentElement.parentElement;

        leerDatosCurso(cursoSeleccionado);
    }
   
}

// lee el contenido del html al q le dimos click y extrae la info del curso

function leerDatosCurso(curso) {
    // console.log(curso);

    //crear objeto con el contenido del curso actual
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1

    }
    //reivsa si un elemento existe en el carrito

    const existe = articulosCarrito.some(curso => curso.id === infoCurso.id);
    if (existe) {
        //actualizamos la cantidad
        const cursos = articulosCarrito.map(curso => {
            if (curso.id === infoCurso.id) {
                curso.cantidad++;
                return curso; //retorna el ojbeto actualizado
            } else {
                return curso; //retorna los objetos q no son los duplicados
            }
            articulosCarrito = [...cursos];
        })
    } else {
          //Agrega elemento al arreglo del carrito
    articulosCarrito = [...articulosCarrito, infoCurso];
    }

  

    console.log(articulosCarrito);

    carritoHtml();
}


//Muestra el carrito de compras en el HTML
function carritoHtml() {

    //limpiar el html
    limpiarHtml();

    //recorre el carrito y genera el html
    articulosCarrito.forEach(curso => {
        const {imagen, titulo, precio, cantidad, id } = curso;
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
               <img src = "${imagen}" width="100">
            </td>
            <td>
                ${titulo}
            </td>
            <td>
                ${precio}
            </td>
            <td>
                ${cantidad}
            </td>
            <td>
                <a href="#" class="borrar-curso" data-id="${id}"> X </a>
            </td>
        `;

        //agrega el html del carrito en el tbody
        contenedorCarrito.appendChild(row);
    })
}

//elimina los cursos del tbody
function limpiarHtml() {
    //forma lenta
//    contenedorCarrito.innerHTML = '';
    while (contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }
}