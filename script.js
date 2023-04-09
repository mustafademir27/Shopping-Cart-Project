// kullanılan değişkenler
const card = document.getElementsByClassName("card-header");
const btnAdd = document.getElementsByClassName("btn-info");
const btnCart = document.querySelector(".btn-cart");
const cartList = document.querySelector(".shopping-cart-list"); // bu classlardan birer tane olduğu için querySelector ile aldık 
//const goCart = document.querySelector(".inside-cart-list");

class Shopping{
    constructor(image,title,price){
        this.image = image;
        this.title = title;
        this.price = price;
    }
}

class UI{
    //Sepete ekleme işlemi
    addToCart(shopping){
        // liste itemi oluşturalım
        const listItem = document.createElement("div");
        listItem.classList = "list-item"; // listItem'ın class'ı "list-item" olsun dedim.
        listItem.innerHTML = `
    <div class="row align-items-center text-white-50">
        <div class="col-md-3">
            <img src="${shopping.image}" alt="product" class="img-fluid">
        </div>
        <div class="col-md-5">
            <div class="title">${shopping.title}</div>
        </div>
        <div class="col-md-2">
            <div class="price">${shopping.price}</div>
        </div>
        <div class="col-md-2">
            <button class="btn btn-delete">
                <i class="fas fa-trash-alt text-danger"></i>
            </button>
        </div>
    </div>
        `
        // ürünü sepete ekle
        cartList.appendChild(listItem);
        //goCart.append(listItem);
        //goCart.appendChild(listItem);

    }

    // Sepetten silme işlemi
    removeCart(){
        let btnRemove = document.getElementsByClassName("btn-delete");
        let self = this; // o an tıkladığımızı alıyoruz. for içinde this kullanamayacağımız için self'e atıyoruz.
        for (let i = 0; i < btnRemove.length; i++) {
            btnRemove[i].addEventListener("click", function(){
                this.parentElement.parentElement.parentElement.remove();
                self.cartCount(); // sepetten silme işleminde sağ üstteki sayı azalsın
                //btnAdd[i].classList.add("enabled");
                //btnAdd[i].textContent = "Sepete Ekle"; // alışveriş sepeti sayfası için
            })            
        }
        
    }

    //Sepete bişey ekleyip çıkartırken sağ üstündeki sayı artıp azalsın.
    cartCount(){
        let cartListItem = cartList.getElementsByClassName("list-item");
        let itemCount = document.getElementById("item-count");
        itemCount.innerHTML = cartListItem.length;
    }

    //(CART TOGGLE) sepet ikonunun üzerine tıkladığında sepeti göstersin bi kere daha tıkladığında sepeti geri kapatsın.
    cartToggle(){
        btnCart.addEventListener("click",function(){
            cartList.classList.toggle("d-none");
        })
    }

}



for (let  i = 0;  i < card.length;  i++) {
    btnAdd[i].addEventListener("click", function(e){
        let image = card[i].getElementsByClassName("card-img-top")[0].src;
        let title = card[i].getElementsByClassName("card-title")[0].textContent;
        //console.log(title);
        let price = card[i].getElementsByClassName("price")[0].textContent;
        
        // sepete ekle dediğimizde o buton üzerinde sepete eklendi yazsın ve başka ekleyemesin
        //btnAdd[i].classList.add("disabled");
        btnAdd[i].textContent = "Sepete Eklendi";


        let shopping = new Shopping(image,title,price); // değişkenleri yukarıda oluşturduğumuz sınıfın içine attık
        let ui = new UI();

        ui.addToCart(shopping);
        ui.cartCount();
        ui.removeCart();
 
        e.preventDefault();
    })
    
}



//CART TOGGLE
document.addEventListener("DOMContentLoaded", () => {
    let ui = new UI();
    ui.cartToggle();
})