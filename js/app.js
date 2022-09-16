//DECLARACIONES
//DATOS ASINCRONICOS USADOS COMO BASE
let productsInStock = []

//ARRAY DE PRODUCTOS PASADOS POR FILTROS Y USADOS PARA RENDERIZAR
let currentProductsDisplay = []

//ARRAY DE CARRITO CON LA INFORMACION DE CANTIDADES DE PRODUCTOS PARA COMPRAR
let cart =[]

//MAXIMO DE PRODUCTOS POR PAGINA
let maxProductsPerPage = 6

//PAGINA DE COMIENZO
let currentPage = 1

//FUNCIONES
//FUNCION PARA ACOMODAR ARRAYS POR ALFABETICO O POR MENOR A MAYOR
function sortArray(array,orderByProperty) {
    return array.sort((a, b) => {
        if (a[orderByProperty] > b[orderByProperty]) return 1
        if (a[orderByProperty] < b[orderByProperty]) return -1
        return 0
    })
}


//FUNCION PARA AGREGAR Y REMOVER DEL CARRO
function modifyCartProduct(array,number,eventData) {
    //CANCELO LA EJECUCION DEFAULT DEL BOTON
    eventData.preventDefault()
    //BUSCO DATA ID MAS CERCANA
    const productId = number > 0 ? eventData.target.closest(".addProduct").getAttribute("data-id") : eventData.target.closest(".removeProduct").getAttribute("data-id")    
    //EN CASO DE QUERER HACER UN NUMERO NEGATIVO POR PARTE DEL USUARIO HAGO QUE VUELVA LA FUNCION
    if ((cart[productId].quantity + number) < 0) return

    //UTILIZO EL NUMERO PARA RESTAR O SUMAR A LA CANTIDAD DEL PRODUCTO DESEADO
    cart[productId].quantity += number
    //CUSTOMIZO TEXTO Y COLORES DE LA TOSTADA A MOSTRAR
    const textTostify = number > 0 ? `Agregastes ${cart[productId].name}` : `Removistes ${cart[productId].name}`
    const backgroundColor = number > 0 ? "linear-gradient(to right, #00b09b, #96c93d)" : "linear-gradient(to right, #9b0000, #ca6d02)"

    //Tostify
    Toastify({
        text: textTostify,
        duration: 1000,
        gravity: 'bottom',
        position: 'left',
        style: {
            background: backgroundColor,
          }
    }).showToast()

    
    //RENDERIZO SOLO EL NUMERO DE CANTIDAD EN CARRO
    renderCardUX(productQuantityContainer)
}




//FUNCION PARA LIMPIAR EL CARRO
function clearCart()
{
    cart=[]
    cart = loadFromStorage("productsInStock")
    //RENDERIZO SOLO EL NUMERO DE CANTIDAD EN CARRO
    renderCardUX(productQuantityContainer)
}

//FUNCION PARA RENDERIZAR CARDS DE PRODUCTOS
function renderProductCard(products = []) 
{
    //LIMPIO CARDS IMPRESAS
    productsContainer.innerHTML=""
    //CREO NUEVAS CARDS DE PRODUCTOS USANDO EL ARRAY PASADO POR PARAMETRO
    products.forEach((product) => {
        const productCardDiv = document.createElement("div")
        productCardDiv.classList.add("col-lg-4", "col-md-12", "p-3")
        productCardDiv.innerHTML = `
        
        <div class="card rounded-4 cardStyle" >
                    
            <img src=${product.img} class="cardImgStyle d-block mainCarousel img-fluid " alt=${product.name}>

            <div class="card-body" id=">
                <h5 class="card-title">${product.name}</h5>
                
                <h5>$${product.price}</h5>
                <p class="card-text">${product.description}</p>
                
                <div class="pb-3  m-auto d-flex justify-content-center align-items-center" >
                
                    <a href="" class="btn btn-danger btn-lg removeProduct" data-id="${product.id}">-</a>
                    <div class="productQuantity mx-5" data-id="${product.id}"></div>
                    <a href="" class="btn btn-primary btn-lg addProduct" data-id="${product.id}">+</a>
                    
                    
                </div>
            </div>
        </div>`
        productsContainer.append(productCardDiv)
    })
    //CANTIDADES DE PRODUCTO PARA RENDERIZACION PROPIA
    productQuantityContainer = document.querySelectorAll(".productQuantity")

    //BOTONES PARA AGREGAR PRODUCTOS AL CARRO
    const buttonAddProduct = document.querySelectorAll(".addProduct")
    buttonAddProduct.forEach((product) => {        
        product.addEventListener("click", (eventdata) => {
            modifyCartProduct(cart,1,eventdata)
        })        
    })

    //BOTONES PARA REMOVER PRODUCTOS DEL CARRO
    const buttonRemoveProduct = document.querySelectorAll(".removeProduct")
    buttonRemoveProduct.forEach((product) => {        
        product.addEventListener("click", (eventdata) => {
            modifyCartProduct(cart,-1,eventdata)
        })  
    })
}

//FUNCION PARA RENDERIZAR SOLO LA CANTIDAD DEL PRODUCTO EN CARRO
function renderCardUX(cardsDiv = []) 
{
    //RENDERIZO TODOS LOS NUMEROS DADOS PARA LAS CANTIDADES DE PRODUCTOS DESEADOS EN EL CARRO
    cardsDiv.forEach((cardQuantityDiv) => {
        cardQuantityDiv.innerHTML=""
        const productCardUXDiv = document.createElement("p")
        productCardUXDiv.classList.add("my-0")
        productCardUXDiv.innerHTML = `${cart[cardQuantityDiv.dataset.id].quantity}`
        cardQuantityDiv.append(productCardUXDiv)
    })
    //GUARDO CANTIDADES YA VALIDADAS PREVIAMENTE
    saveInStorage("productsToBuy",cart)
    //RECARGO EL NUMERO DE PRODUCTOS EN CARRO PARA LA INTERFAZ DEL HEADER
    reloadNumber()
}

//FUNCION PARA GUARDAR EN LocalStorage
function saveInStorage(key,value)
{
    localStorage.setItem(key ,JSON.stringify(value))
}

//FUNCION PARA CARGAR EN LocalStorage
function loadFromStorage(key)
{
    return JSON.parse(localStorage.getItem(key))
}

//FUNCION PARA FILTRAR LOS PRODUCTOS MOSTRADOS POR SELECT DE FILTROS
function filterPerType()
{
    //USO DATOS DEL SELECT DE FILTROS
    const query = filterType.value.toLowerCase()    
    //Cargo todos los datos de los productos
    currentProductsDisplay = loadFromStorage("productsInStock")
    //Si el filtro cambia a "todos" muestro todos los tipos de productos. Sino uso el filtro para limpiar la lista de productos a mostrar
    currentProductsDisplay = query == "todos"? currentProductsDisplay : currentProductsDisplay.filter((product) => product.clothType.includes(query))
    
    //RESETEO LA PAGINA EN LA QUE ESTOY PARADO
    currentPage = 1
    //DEFINO LA CANTIDAD DE PRODUCTOS MOSTRADO POR PAGINA    
    productsPerPage(currentProductsDisplay,maxProductsPerPage,currentPage)
}

//FUNCION PARA FILTRAR LOS PRODUCTOS MOSTRADOS POR BARRA DE BUSQUEDAD
function searchProduct()
{
    //USO DATOS DE LA BARRA DE BUSQUEDA
    const query = searchBar.value.toLowerCase()
    //Uso el filtro primero y despues uso el array filtrado
    filterPerType()
    //Filtro usando el input de la barra de busqueda
    currentProductsDisplay = currentProductsDisplay.filter((product) => product.name.toLowerCase().includes(query))
    //aplico la forma de ordenar seleccionada por el usuario
    sortProducts()
}

//FUNCION PARA FILTRAR LOS PRODUCTOS MOSTRADOS POR SELECT DE ORDEN
function sortProducts()
{
    //USO DATOS DEL SELECT DE ORDEN
    const query = filterInput.value.toLowerCase()
    //USO SWITCH PARA DETERMINAR LA FORMA DE ORDENAR LOS PRODUCTOS
    switch (query) {
        case "nombre de a a z":            
            currentProductsDisplay = sortArray(currentProductsDisplay,"name")
        break;
        case "nombre de z a a":
            currentProductsDisplay = sortArray(currentProductsDisplay,"name")
            currentProductsDisplay = currentProductsDisplay.reverse()
        break;
        case "precio: de menor a mayor":
            currentProductsDisplay = sortArray(currentProductsDisplay,"price")
        break;
        case "precio: de mayor a menor":
            currentProductsDisplay = sortArray(currentProductsDisplay,"price")
            currentProductsDisplay = currentProductsDisplay.reverse()
        break;
        default:
        break;
      }
      productsPerPage(currentProductsDisplay,maxProductsPerPage,currentPage)    
}

//FUNCION PARA DEFINIR PRODUCTOS POR PAGINA
function productsPerPage(items, rows_per_page, page)
{
    //DEFINO BOTONES DE PAGINAS
    SetupPagination(items, pagination_element, rows_per_page)
    //HAGO CALCULOS PARA DEFINIR LA CANTIDAD DE PRODUCTOS POR PAGINA
    page--
	let start = rows_per_page * page
	let end = start + rows_per_page
	items = items.slice(start, end)    

    //RENDERIZO CON LAS INSTRUCCIONES DADAS
    renderProductCard(items)
    renderCardUX(productQuantityContainer)
}

//FUNCION PARA DEFINIR PAGINACION
function SetupPagination (items, wrapper, rows_per_page) {
	wrapper.innerHTML = ""
	let page_count = Math.ceil(items.length / rows_per_page)
	for (let i = 1; i < page_count + 1; i++) {
		let btn = PaginationButton(i, items)
		wrapper.appendChild(btn)
	}
}

//FUNCION PARA DEFINIR BOTONES DE PAGINACION
function PaginationButton (page, items) {
	let button = document.createElement('button')
    button.classList.add("btn", "btn-info","btn-lg","m-1","hoverable", "rounded-4")
	button.innerText = page
	button.addEventListener('click', function () {
		currentPage = page
        productsPerPage(currentProductsDisplay,maxProductsPerPage,currentPage)        
	})

	return button
}

//FUNCION PARA CANCELAR CARRO Y LIMPIARLO EN CASO DE QUE TENGA ALGO QUE LIMPIAR
function cancelCart()
{      
  if(undefined == cart.find((product)=> product.quantity > 0 )) return
  //SWEETALERT2
  Swal.fire({
    title: 'Deseas borrar el carrito?',
    text: "Esto no podra ser revertido!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si'
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire(
        'Carro borrado!',
        'Los productos han sido eliminados.',
        'success'
      )
      clearCart()
    }
  })
}

//CARGA ASINCRONICA DE BASE DE DATOS
async function getStockProducts()
{
    const respose = await fetch("../json/data.json")
    productsInStock = await respose.json()    
    saveInStorage("productsInStock",productsInStock)
    
    cart = loadFromStorage("productsInStock")
    currentProductsDisplay = loadFromStorage("productsInStock")
    
    if(loadFromStorage("productsToBuy") != null)
    {        
        cart = loadFromStorage("productsToBuy")
        currentProductsDisplay = loadFromStorage("productsToBuy")
    }
    
    productsPerPage(cart,maxProductsPerPage,currentPage)
}

//SELECTORES

//HTML PARA INSERTAR LOS PRODUCTOS VISUALIZADOS
const productsContainer = document.querySelector("#productsContainer")
//UX DE LA CANTIDAD DE PRODUCTOS EN EL CARRO
let productQuantityContainer = document.querySelector(".productQuantityContainer")


//INPUT DEL BOTON PARA LIMPIAR CARRO
const clearButton = document.querySelector("#clearCart")
//INPUT DE LA BARRA DE BUSQUEDA
const searchBar = document.querySelector("#searchBar")
//INPUT DEL BOTON DE LA BARRA DE BUSQUEDA
const searchButton = document.querySelector("#searchButton")
//SELECTOR/DROPDOWN DEL ORDEN DE LOS PRODUCTO QUE SE DESEA VER
const filterInput = document.querySelector("#filterInput")
//SELECTOR/DROPDOWN DEL TIPO DE PRODUCTO QUE SE DESEA VER
const filterType = document.querySelector("#filterType")

//SELECTOR DE LA SECCION DONDE VAN A ESTAR LA PAGINACION DE LA TIENDA
const pagination_element = document.querySelector("#pagination")

//EVENTLISTENERS
//EVENTO DEL BOTON PARA LIMPIAR BARRA DE BUSQUEDA
clearButton.addEventListener("click", cancelCart)
//EVENTO DEL BOTON DE LA BARRA DE BUSQUEDA
searchButton.addEventListener("click", searchProduct)
//EVENTO DEL DROPDOWN DEL ORDEN DE LOS PRODUCTOS
filterInput.addEventListener("change",sortProducts)
//EVENTO DEL DROPDOWN DE LOS FILTROS POR TIPO DE PRODUCTO
filterType.addEventListener("change",filterPerType)

//EJECUCIONES
getStockProducts()