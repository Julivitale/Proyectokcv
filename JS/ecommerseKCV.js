

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
divBody.setAttribute('class', 'divBody')

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


async function go() {
  let products = await fetch('https://neon-efficient-bosworth.glitch.me/products')
  products = await products.json()
  if (pagina == 'home') allProducts(products)
  if (pagina == 'carrito') cartProducts()
  if (pagina == 'filtrado') allProducts(filtros)
}

go()