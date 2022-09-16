//CLASE PRODUCTO
class Product{
    constructor(name, img, description, price, quantity, clothType)
    {
        this.id = (productsStock.length);
        this.name = name;
        this.img = img;
        this.description = description;
        this.price   = parseInt(price);
        this.quantity = quantity
        this.clothType = clothType
    }
    
}



//Array de productos en Stock
let productsStock = []


//Stock de productos
productsStock.push(new Product("Zapatillas Negras Ajustables","Imagenes/Zapatilla_Negra_ejercicio_Raya_Blanca.jpg" ,"Zapatillas ergonómicas con almohadillas incorporadas para suavizar el impacto a la hora de hacer ejercicio", 5300,0,"zapatilla"))

productsStock.push(new Product("Zapatillas Negras con Cordones","Imagenes/Zapatilla_Negra_ejercicio.webp" ,"Zapatillas ergonómicas con cubierta antimanchas y semi-impermeables, ideal para un día de lluvia", 4300,0,"zapatillas"))

productsStock.push(new Product("Zapatillas Blancas con cordones","Imagenes/Zapatilla_Blanca.webp" ,"Zapatillas blancas con rayas negras y cordones", 3600,0,"zapatillas"))

productsStock.push(new Product("Zapatillas Negras y Blancas con Cordones","Imagenes/Zapatilla_Negra_Rayas_Blancas.webp","Zapatillas negras con rayas blancas y cordones" , 3300,0,"zapatillas"))

productsStock.push(new Product("Jeans Azules","Imagenes/Jean_Azul.jpg","Jeans Azules" , 6100,0,"jeans"))

productsStock.push(new Product("Jeans Azules Gastados","Imagenes/Jean_Azul_Roto.jpg","Jeans Azules Gastados" , 6500,0,"jeans"))

productsStock.push(new Product("Jeans Negros","Imagenes/Jean_Negro.jpg","Jean Negro" , 6300,0,"jeans"))




productsStock.push(new Product("Malla Beige","Imagenes/Malla_Beige.jpg","Jean Beige" , 3500,0,"malla"))

productsStock.push(new Product("Malla Azul","Imagenes/Malla_Azul.jpg","Jean Azul" , 3300,0,"malla"))

productsStock.push(new Product("Malla Blanco Y Negro","Imagenes/Malla_Blanco_Y_Negro.jpg","Malla Blanco Y Negro" , 3800,0,"malla"))


productsStock.push(new Product("Remera Blanca","Imagenes/Remera_Blanca.jpg","Remera Blanca" , 2300,0,"remeracorta"))

productsStock.push(new Product("Remera Negra","Imagenes/Remera_Negra.jpg","Remera Negra" , 2500,0,"remeracorta"))

productsStock.push(new Product("Remera Blanca Dibujo","Imagenes/Remera_Blanca_Dibujo.png","Remera Blanca Dibujo" , 2800,0,"remeracorta"))


productsStock.push(new Product("Remera Blanca Mangas Largas","Imagenes/Remera_Blanca_Mangas_Largas.jpg","Remera Blanca Mangas Largas" , 3800,0,"remeralarga"))

productsStock.push(new Product("Remera Negra Mangas Largas","Imagenes/Remera_Negra_Mangas_Largas.jpeg","Remera Negra Mangas Largas" , 4000,0,"remeralarga"))

productsStock.push(new Product("Remera Verde Mangas Largas","Imagenes/Remera_Verde_Mangas_Largas.jpg","Remera Verde Mangas Largas" , 4300,0,"remeralarga"))





