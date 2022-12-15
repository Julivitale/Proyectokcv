//Array de productos
/* const products = [
  {
    id: 1,
    collection: "cursodeingenieria",
    licence: "Ingeniería",
    name: "Curso de Ingenieria",
    description: "Curso corto e intensivo sobre las ramas de la ingeniería para orientación",
    img: {
      front: "./img/curso-ingenieria.jpg",
    },
    sku: "KCV01",
    price: 7000,
    dues: 3,
    stock: 15,
    sells: 0
  },
  {
    id: 2,
    collection: "cursodegestiónymanagement",
    licence: "Gestión",
    name: "Cursos de Gestión y Management",
    description: "En este curso se busca potenciar la productividad y competitividad de una empresa planeando, organizando, dirigiendo y controlando eficientemente sus recursos.",
    img: {
      front: "./img/Curso-managment.jpg"
    },
    sku: "KCV02",
    price: 25000,
    dues: 6,
    stock: 10,
    sells: 5
  },
  {
    id: 3,
    collection: "cursodegestiónempresarial",
    licence: "Gestión",
    name: "Curso de Gestión empresarial",
    description: "En dicho curso, se incorporarán nociones de comercialización, cálculo de costos, estimación de la demanda, identificación de la competencia, análisis de la oferta de bienes y equipos necesarios para la prestación del servicio o la producción de bienes, plan de inversión y plan de negocios.",
    img: {
      front: "./img/Curso-gestiondeempresa.jpg"
    },
    sku: "KCV03",
    price: 20000,
    dues: 6,
    stock: 15,
    sells: 5
  },
  {
    id: 4,
    collection: "cursodeexcel",
    licence: "Excel",
    name: "Curso de Excel",
    description: "Al finalizar el curso, los participan-tes podrán comprender los principales conceptos que se utilizan en Excel, así como su uso práctico orientado al análisis de bases datos, operaciones matemáticas y funciones avanzadas.",
    img: {
      front: "./img/Curso-excell.jpg"
    },
    sku: "KCV04",
    price: 7000,
    dues: 6,
    stock: 20,
    sells: 17
  },
  {
    id: 4,
    collection: "cursodeexcelavanzao",
    licence: "Excel",
    name: "Curso de Excel Avanzado",
    description: "Analiza y filtra datos incluyendo técnicas avanzadas de cálculos. Realiza tablas robustas con funciones combinadas y domina un requisito elemental del mundo laboral.",
    img: {
      front: "./img/curso-excelavanzado.jpg"
    },
    sku: "KCV04",
    price: 10000,
    dues: 6,
    stock: 20,
    sells: 17
  }
] */

//Div Botones
const divButton = document.createElement('div')
document.body.append(divButton)
divButton.setAttribute('class', 'divHeader')

//Boton Productos
const allP = document.createElement("button")
allP.innerText = 'Productos'
allP.setAttribute('class', 'btn')
allP.setAttribute('onclick', 'btnproductos()')
divButton.append(allP)

//Boton Carrito
const cartP = document.createElement("button")
cartP.innerText = 'Carrito'
cartP.setAttribute('class', 'btn')
cartP.setAttribute('onclick', 'cartProducts()')
divButton.append(cartP)

//Boton Ingenieria
const Ingeniería = document.createElement("button")
Ingeniería.innerText = 'Ingeniería'
Ingeniería.setAttribute('class', 'btn')
Ingeniería.setAttribute('onclick', 'selectLicence("ingeniería")')
divButton.append(Ingeniería)


//Boton Gestión
const Gestión = document.createElement("button")
Gestión.innerText = 'Gestión'
Gestión.setAttribute('class', 'btn')
Gestión.setAttribute('onclick', 'selectLicence("gestión")')
divButton.append(Gestión)


//Boton Excel
const Excel = document.createElement("button")
Excel.innerText = 'Excel'
Excel.setAttribute('class', 'btn')
Excel.setAttribute('onclick', 'selectLicence("excel")')
divButton.append(Excel)

//Input
const label = document.createElement('label')
label.setAttribute('class', 'bLabel')
divButton.append(label)
const entrada = document.createElement('input')
entrada.setAttribute('class', 'search')
entrada.setAttribute('id', 'search')
entrada.setAttribute('name', 'search')
entrada.setAttribute('placeholder', 'Buscar...')
label.append(entrada)
entrada.addEventListener("input", buscador)

async function buscador() {
  let products = await fetch('https://neon-efficient-bosworth.glitch.me/products')
  products = await products.json()
  const search = products.filter(product => product.name.toLowerCase().includes(entrada.value))
  allProducts(search)
}


//Carrito
let cart = JSON.parse(localStorage.getItem('carrito'))?.length > 0 ? JSON.parse(localStorage.getItem('carrito')) : []

JSON.parse(localStorage.getItem('carrito'))?.length > 0 ? JSON.parse(localStorage.getItem('carrito')) : localStorage.setItem('carrito', JSON.stringify(cart))

let filtros = JSON.parse(localStorage.getItem('filtros'))?.length > 0 ? JSON.parse(localStorage.getItem('filtros')) : []
JSON.parse(localStorage.getItem('filtros'))?.length > 0 ? JSON.parse(localStorage.getItem('filtros')) : localStorage.setItem('filtros', JSON.stringify(cart))

let pagina = localStorage.getItem('page')?.length > 0 ? localStorage.getItem('page') : 'home'
localStorage.getItem('page')?.length > 0 ? localStorage.getItem('page') : localStorage.setItem('page', (pagina))


//Div del bodys
let divBody = document.createElement('div')
document.body.append(divBody)
divBody.setAttribute('class', 'divBody') // 2 parametros 1- el atributo 2-nombre o valor

//Crear lista
let ul = document.createElement('ul')
divBody.append(ul)
ul.setAttribute('class', 'ullkcv')

//Agregar elementos a la lista
function allProducts(productos) {
  ul.remove();
  ul = document.createElement('ul')
  divBody.append(ul)
  ul.setAttribute('class', 'ullkcv')
  for (const product of productos) {
    let li = document.createElement('li')
    li.innerHTML =
      `<h3>${product.name}<h3/>
         <img src="${product.img.front}" alt="${product.name}" />
         <p>${product.description}</P>
                  <p class="precio">Precio $${product.price}</p>
                  <button id=${product.id} class="buttonag" onclick=agregar(${product.id}) >Agregar</button>`
    ul.append(li)
    li.setAttribute('id', `${product.id}`)
    li.setAttribute('class', 'class=card')
  }
}

//Funcion de agregar
async function agregar(id) {
  let product = await fetch(`https://neon-efficient-bosworth.glitch.me/products/${id}`)
  product = await product.json()
  const existe = cart.some(product => product.id === id)
  if (existe) {
    Swal.fire({
      title: 'El producto ya fue agregado al carrito',
      icon: 'advertencia',
      confirmButtonText: 'ok'
    })('El producto ya fue agregado al carrito')
  } else {
    cart.push(product)
    localStorage.setItem("carrito", JSON.stringify(cart))
  }
}

//Funcion de mostrar el carrito
function cartProducts() {
  ul.remove();
  ul = document.createElement('ul')
  divBody.append(ul)
  for (const product of cart) {
    let li = document.createElement('li')
    li.innerHTML =
      `<h3>${product.name}<h3/>
         <img src="${product.img.front}" alt="${product.name}" />
         <p>${product.description}</P>
                 <p class="precio">Precio $${product.price}</p>
                 <button id=${product.id} class="button" onclick=quitar(${product.id}) >Quitar</button>`
    ul.append(li)
    li.setAttribute('id', `${product.id}`)
    li.setAttribute('class', 'class=card')
  }
  localStorage.setItem("page", "carrito")
}

//Funcion quitar productos
function quitar(id) {
  cart = cart.filter(product => product.id !== id)
  localStorage.setItem("carrito", JSON.stringify(cart))
  cartProducts()
}

//Funcion de Filtrado
async function selectLicence(licence) {
  filtros = await fetch(`https://neon-efficient-bosworth.glitch.me/category/${licence}`)
  filtros = await filtros.json()
  localStorage.setItem("filtros", JSON.stringify(filtros))
  allProducts(filtros)
  localStorage.setItem("page", "filtrado")
}


async function btnproductos() {
  let products = await fetch('https://neon-efficient-bosworth.glitch.me/products')
  products = await products.json()
  allProducts(products)
  localStorage.setItem("page", "home")
}

productAsync()


async function go() {
  let products = await fetch('https://neon-efficient-bosworth.glitch.me/products')
  products = await products.json()
  if (pagina == 'home') allProducts(products)
  if (pagina == 'carrito') cartProducts()
  if (pagina == 'filtrado') allProducts(filtros)
}

go()