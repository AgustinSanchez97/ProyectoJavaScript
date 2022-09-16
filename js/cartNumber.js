

//FUNCION PARA RECARGAR CANTIDAD DE PRODUCTOS EN CARRO
function reloadNumber()
{
    const cartQuantityNumber = document.querySelector("#cartQuantityNumber")
    const products = JSON.parse(localStorage.getItem("productsToBuy"))
    let finalNumber = 0
    
    if(products == null) return
    
    products.forEach((product)=>{        
        finalNumber += product.quantity
    })
    
    cartQuantityNumber.innerHTML = ""    
    const p = document.createElement("p")
    p.classList.add("d-block", "text-center")
    p.innerHTML = `${finalNumber}`    
    cartQuantityNumber.append(p)
}

reloadNumber()

