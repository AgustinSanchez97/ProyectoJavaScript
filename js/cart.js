//DECLARACIONES
//Precio Final
let priceFinal = 0
//Array completo de productos
let cart = []
//Array filtrado de productos del carro solo con los articulos con cantidad agregada
let productShown = loadFromStorage("productsToBuy") || []
//Array completo de productos en stock sin cantidades definidas
let productsInStock = []

//FUNCIONES

//GUARDAR EN LOCAL STORAGE
function saveInStorage(key,value)
{
    localStorage.setItem(key ,JSON.stringify(value))
}

//GUARDAR EN LOCAL STORAGE
function loadFromStorage(key)
{
    return JSON.parse(localStorage.getItem(key))
}

//FUNCION PARA AGREGAR, REMOVER Y LIMPIAR EL CARRO
function modifyCartProductQuantity(array,number,eventData) {
  eventData.preventDefault();
  //BUSCO DATA ID MAS CERCANA
  let productId
  productId = number > 0 && eventData.target.closest(".addProduct").getAttribute("data-id")
  productId = number < 0 && eventData.target.closest(".removeProduct").getAttribute("data-id") || productId
  productId = number == 0 && eventData.target.closest(".clearProduct").getAttribute("data-id") || productId
  
  cart[productId].quantity = number != 0? cart[productId].quantity += number : cart[productId].quantity = 0

  renderFinalResult(productShown)

  //EN CASO DE MANTENERSE LA CANTIDAD POR ENCIMA DE 0 REFRESCO LA INTERFAZ
  if (cart[productId].quantity <= 0) showProductsToBuy()
  
  //RENDERIZO SOLO EL NUMERO DE CANTIDAD EN CARRO
  renderCardSubTotal(productSubTotalContainer)
  renderCardQuantity(productQuantityContainer)
  saveInStorage("productsToBuy",cart)
  reloadNumber()
}

//FUNCION PARA LIMPIAR Y RENDERIZAR LOS PRODUCTOS CON CANTIDADES AGREGADAS
function showProductsToBuy()
{
  productShown = productShown.filter((product) => product.quantity > 0)
  shoppingCart.innerHTML=""
  displayCart(productShown)
}

//FUNCION PARA RENDERIZAR EL CARRO
function displayCart(products=[])
{
    products.forEach((product) =>
    {
      const displayProduct = document.createElement("div")
      displayProduct.classList.add("card", "rounded-1")
      displayProduct.innerHTML = `
      <div class="row container-lg p-0 m-auto">
            
            <div class="col-sm-1  my-0 d-flex justify-content-center p-0">
            <div class="py-5 m-auto">
                <button class=" btn btn-danger clearProduct" data-id="${product.id}"> 
                  <i class="bi bi-trash text-light"></i>
                </button>
            </div>
            <div class="vr justify-content-end"></div>
              

            </div>
            <div class="col-sm-2 p-0 ">
              <img src=${product.img} class="img-fluid horizontalCardImgStyle rounded-4  my-1" alt="">
            </div>
            
            <div class="col-sm-3 p-0 my-auto d-flex justify-content-center align-items-center">
              <h5 class="card-title py-5 text-break my-auto mx-auto"> 
                ${product.name}
              </h5>
              <div class="vr justify-content-end"></div>

            </div>
            <div class="col-sm-2 p-0 d-flex justify-content-center align-items-center">
              <h5 class="py-5 text-break my-auto mx-auto"> 
                $${product.price}
              </h5>
              <div class="vr justify-content-end"></div>
            </div>

            <div class="col-sm-2 p-0 d-flex justify-content-center align-items-center">
              <div class="py-5 m-auto d-flex justify-content-center align-items-center">
                <button class=" btn btn-danger removeProduct" data-id="${product.id}"> -</button>
                <div class="mx-3 my-0 productQuantity" data-id="${product.id}">${product.quantity}</div>
                <button class=" btn btn-primary addProduct" data-id="${product.id}"> +</button>
              </div>
              <div class="vr justify-content-end"></div>
            </div>
            <div class="col-sm-2 my-auto d-flex justify-content-center align-items-center">
              <div class= "productSubTotalContainer" data-id="${product.id}">
                <h5 class="text-break my-auto" >
                  SubTotal: $${product.price* product.quantity}
                </h5>
              </div>
            </div>
          </div>
      `
      shoppingCart.append(displayProduct)
    })

    //CANTIDADES DE PRODUCTO PARA RENDERIZACION
    productQuantityContainer = document.querySelectorAll(".productQuantity")
    //SUBTOTALES DE PRODUCTO PARA RENDERIZACION
    productSubTotalContainer = document.querySelectorAll(".productSubTotalContainer")
    

    //BOTONES PARA AGREGAR AL CARRO
    const buttonAddProduct = document.querySelectorAll(".addProduct")
    buttonAddProduct.forEach((product) => {        
        product.addEventListener("click", (eventdata) => {
          modifyCartProductQuantity(cart,1,eventdata)
        })        
    })
    
    //BOTONES PARA REMOVER PRODUCTOS DEL CARRO
    const buttonRemoveProduct = document.querySelectorAll(".removeProduct")
    buttonRemoveProduct.forEach((product) => {        
        product.addEventListener("click", (eventdata) => {
          modifyCartProductQuantity(cart,-1,eventdata)
        })        
    })

    //BOTONES PARA LIMPIAR PRODUCTOS DEL CARRO
    const buttonClearProduct = document.querySelectorAll(".clearProduct")
    buttonClearProduct.forEach((product) => {        
        product.addEventListener("click", (eventdata) => {
          modifyCartProductQuantity(cart,0,eventdata)
        })        
    })    
    //FIN DEL CARRO    
    renderFinalResult(products)
}

//FUNCION PARA RENDERIZAR CANTIDADES DE PRODUCTOS
function renderCardQuantity(cardsDiv = []) 
{
    cardsDiv.forEach((cardQuantityDiv) => {
        cardQuantityDiv.innerHTML=""
        const productCardUXDiv = document.createElement("p")
        productCardUXDiv.classList.add( "my-0")
        productCardUXDiv.innerHTML = `${cart[cardQuantityDiv.dataset.id].quantity}`
        cardQuantityDiv.append(productCardUXDiv)
    })
}

//FUNCION PARA RENDERIZAR SUBTOTALES DE PRODUCTOS
function renderCardSubTotal(cardsSubTotalDiv = []) 
{
    cardsSubTotalDiv.forEach((cardSubTotalDiv) => {
        cardSubTotalDiv.innerHTML=""
        const productCardUXDiv = document.createElement("h5")
        productCardUXDiv.classList.add( "text-break","my-auto")
        productCardUXDiv.innerHTML = `SubTotal: $${cart[cardSubTotalDiv.dataset.id].quantity * cart[cardSubTotalDiv.dataset.id].price}`
        cardSubTotalDiv.append(productCardUXDiv)
    })
}

//FUNCION PARA RENDERIZAR SUMA TOTAL DE CANTIDADES Y SUBTOTALES DE PRODUCTOS
function renderFinalResult(products = []) 
{
  finalResultCart.innerHTML=""
  const displayProduct = document.createElement("div")
  displayProduct.classList.add("card", "rounded-1")
  displayProduct.innerHTML = `
  <div class="row container-lg p-0 m-auto">
          
          <div class="col-sm-8  my-auto d-flex justify-content-center p-0">         
                             
          </div>            
          <div class="col-sm-2  my-auto d-flex justify-content-center p-0">
            <h5 class="text-break my-auto"> 
              Cantidad: ${quantityResult(products,priceFinal)}
            </h5>              
          </div>
          <div class="col-sm-2 my-auto d-flex justify-content-center align-items-center">
            <h5 class="text-break my-auto">                 
              Total: $${priceResult(products,priceFinal)}
            </h5>
          </div>
        </div>
  `
  finalResultCart.append(displayProduct)
}

//FUNCION PARA CALCULAR CANTIDADES
function quantityResult(array,number)
{
    for(let element of array)
    {
        number += element.quantity
    }
    return number
}

//FUNCION PARA CALCULAR SUBTOTALES
function priceResult(array,number)
{
    for(let element of array)
    {
        number += element.price*element.quantity
    }
    return number
}

//FUNCION PARA FINALIZAR COMPRA USANDO SWEETALERT2
function endBuy(){
    let timerInterval
    Swal.fire({
      title: 'Procesando',
      html: 'Cargando datos de compra',
      timer: 3000,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading()
        const b = Swal.getHtmlContainer().querySelector('b')
        timerInterval = setInterval(() => {
        }, 100)
      },
      willClose: () => {
        clearInterval(timerInterval)
      }
    }).then((result) => {      
      if (result.dismiss === Swal.DismissReason.timer) {        
        Swal.fire({
          icon: 'success',
          title: 'Compra Realizada',
          text: 'Excelente compra'
        })
        //RESETEO EL CARRO DE COMPRA
        clearCart()
      }
    })    
}

//FUNCION PARA CANCELAR CARRO Y LIMPIARLO EN CASO DE QUE TENGA ALGO QUE LIMPIAR
function cancelCart()
{  
  if(productShown.length == 0) return

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
      //RESETEO EL CARRO DE COMPRA
      clearCart()
    }
  })
}

//FUNCION PARA LIMPIAR EL CARRO
function clearCart()
{
  productShown=[]
  shoppingCart.innerHTML=""
  saveInStorage("productsToBuy",productsInStock)
  displayCart(productShown)
  reloadNumber()
}

//CARGA ASINCRONICA DE DATOS
async function getStockProducts()
{
    const respose = await fetch("../json/data.json")
    productsInStock = await respose.json()    
}

//SELECTORES
//HTML PARA INSERTAR LOS PRODUCTOS VISUALIZADOS
const shoppingCart = document?.querySelector("#bodyCart")
//HTML PARA INSERTAR LOS PRODUCTOS VISUALIZADOS
const finalResultCart = document?.querySelector("#finalResultCart")

//BOTON PARA FINALIZAR COMPRA
const finishButton = document?.querySelector("#EndBuy")

//BOTON PARA LIMPIAR CARRO
const clearButton = document?.querySelector("#clearCart")

//CONTENEDOR HTML DE CANTIDADES PARA COMPRAR
let productQuantityContainer = document.querySelector(".productQuantityContainer")
//CONTENEDOR HTML DE SUBTOTALES DE PRODUCTOS PARA COMPRAR
let productSubTotalContainer = document.querySelector(".productSubTotalContainer")


//EVENTLISTENERS
finishButton.addEventListener("click", endBuy)
clearButton.addEventListener("click", cancelCart)


//EJECUCIONES

//CARGA ASINCRONICA DE DATOS
getStockProducts()

cart = productShown
//FILTRO PARA LISTA CON CANTIDAD DE LOS PRODUCTOS
showProductsToBuy()