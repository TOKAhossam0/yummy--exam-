let dataRow = document.getElementById("dataRow");
let containerSearch = document.getElementById("containerSearch");
let submitBtn;

$(document).ready(() => {
    searchByName("").then(() => {
        $(".loading").fadeOut(500)
        $("body").css("overflow", "visible")

    })
})





/*******************done*******************/
// 
// 
//  
/******************************* side navbar js start *****************************************/ 
function openNavbar() {
    $(".navbar-menu").animate({ left: 0  }, 700)

    $(".switch-icon").removeClass("fa-align-justify");
    $(".switch-icon").addClass("fa-x");

    for (let i = 0; i < 7; i++) {
        $(".links li").eq(i).animate({
            top: 0
        }, (i + 7) * 100)
    }
}

function closeNavbar() {
    let boxWidth = $(".navbar-menu .navbar-point").outerWidth()
    $(".navbar-menu").animate({
        left: -boxWidth
    }, 700)

    $(".switch-icon").addClass("fa-align-justify");
    $(".switch-icon").removeClass("fa-x");

    $(".links li").animate({
        top: 200
    }, 700)
}

closeNavbar()
$(".navbar-menu i.switch-icon").click(() => {
    if ($(".navbar-menu").css("left") == "0px") {
        closeNavbar()
    } else {
        openNavbar()
    }
})
/******************************* side navbar js end *****************************************/ 

/***********done************/ 
// 
// 
// 
/*******************************  search start *****************************************/ 
function showSearch() {
    containerSearch.innerHTML = `
    <div class="row py-4 ">
        <div class="col-md-6 p-4 ">
            <input onkeyup="searchByName(this.value)" class="form-lay bg-white text-black" type="text" placeholder="Search By Name">
            <h5 class="pt-3">search by name</h5>
        </div>
        <div class="col-md-6 p-4">
            <input onkeyup="searchByTheFirstLetter(this.value)" maxlength="1" class="form-lay bg-white text-black" type="text" placeholder="Search By First Letter">
            <h5 class="pt-3">search by first letter</h5>
        </div>
    </div>`

    dataRow.innerHTML = ""
}

async function searchByName(term) {
    closeNavbar()
    dataRow.innerHTML = ""
    $(".iner-loading").fadeIn(300)

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
    response = await response.json()

    response.meals ? disMeal(response.meals) : disMeal([])
    $(".iner-loading").fadeOut(300)

}

async function searchByTheFirstLetter(term) {
    closeNavbar()
    dataRow.innerHTML = ""
    $(".iner-loading").fadeIn(300)

    term == "" ? term = "a" : "";
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${term}`)
    response = await response.json()

    response.meals ? disMeal(response.meals) : disMeal([])
    $(".iner-loading").fadeOut(300)

}
/**********************************search end*****************************************/ 

/***********************meal details****************************/ 

function disMeal(arr) {
    let cartoona = "";

    for (let i = 0; i < arr.length; i++) {
        cartoona += `
        <div class="col-md-3">
                <div onclick="MealDetail('${arr[i].idMeal}')" class="meal">
                    <img class="w-100" src="${arr[i].strMealThumb}" alt="" srcset="">
                    <div class="layer-m">
                        <h3 >${arr[i].strMeal}</h3>
                    </div>
                </div>
        </div>
        `
    }

    dataRow.innerHTML = cartoona
}



// /***********done************/
 
// 
// 
//
/*************************************area start*******************************************/ 
async function getArea() {
    dataRow.innerHTML = ""
    $(".iner-loading").fadeIn(300)
    containerSearch.innerHTML = "";
    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
    respone = await respone.json()
    console.log(respone.meals);
    disArea(respone.meals)
    $(".iner-loading").fadeOut(300)}

function disArea(arr) {
    let cartoona = "";

    for (let i = 0; i < arr.length; i++) {
        cartoona += `
        <div class="col-md-3">
                <div onclick="areaMeal('${arr[i].strArea}')" class="rounded-2 text-center cursor-pointer">
                        <i class="icon-area fa-solid fa-house-laptop fa-4x "></i>
                        <h3 class="area-font">${arr[i].strArea}</h3>
                </div>
        </div>
        `}
    dataRow.innerHTML = cartoona}


async function areaMeal(area) {
    dataRow.innerHTML = ""
    $(".iner-loading").fadeIn(300)
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
    response = await response.json()
    disMeal(response.meals.slice(0, 20))
    $(".iner-loading").fadeOut(300)}


/*************************************area ---end*******************************************/ 





/*************************************category start*************************************/ 
async function getCategory() {
    dataRow.innerHTML = ""
    $(".iner-loading").fadeIn(300)
    containerSearch.innerHTML = "";
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
    response = await response.json()
    disCategory(response.categories)
    $(".iner-loading").fadeOut(300)

}

function disCategory(arr) {
    let cartoona = "";

    for (let i = 0; i < arr.length; i++) {
        cartoona += `
        <div class="col-md-3">
                <div onclick="categoryMeal('${arr[i].strCategory}')" class="meal">
                    <img class="w-100" src="${arr[i].strCategoryThumb}" alt="" srcset="">
                    <div class="layer-m   ">
                        <h3>${arr[i].strCategory}</h3>
                        <p>${arr[i].strCategoryDescription.split(" ").slice(0,20).join(" ")}</p>
                    </div>
                </div>
        </div>
        ` }
   

    dataRow.innerHTML = cartoona}

    async function categoryMeal(category) {
        dataRow.innerHTML = ""
        $(".iner-loading").fadeIn(300)
    
        let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
        response = await response.json()
    
        disMeal(response.meals.slice(0, 20))
        $(".iner-loading").fadeOut(300)}
    
    
    

/*************************************category end*************************************/



/*************************************ingredients start*************************************/

async function getIngredients() {
    dataRow.innerHTML = ""
    $(".iner-loading").fadeIn(300)

    containerSearch.innerHTML = "";

    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
    respone = await respone.json()
    console.log(respone.meals);

    disIngredient(respone.meals.slice(0, 20))
    $(".iner-loading").fadeOut(300)

}


function disIngredient(arr) {
    let cartoona = "";

    for (let i = 0; i < arr.length; i++) {
        cartoona += `
        <div class="col-md-3">
                <div onclick="getIngredientsMeals('${arr[i].strIngredient}')" class="rounded-2 text-center cursor-pointer">
                        <i class="fa-solid fa-pizza-slice fa-5x"></i>
                        <h3>${arr[i].strIngredient}</h3>
                        <p>${arr[i].strDescription.split(" ").slice(0,30).join(" ")}</p>
                </div>
        </div>
        `
    }

    dataRow.innerHTML = cartoona
}

/*************************************ingredients start*************************************/


async function MealDetail(mealID) {
    closeNavbar()
    dataRow.innerHTML = ""
    $(".iner-loading").fadeIn(400)

    containerSearch.innerHTML = "";
    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`);
    respone = await respone.json();

    displayMealDetail(respone.meals[0])
    $(".iner-loading").fadeOut(400)

}


function displayMealDetail(meal) {
    
    containerSearch.innerHTML = "";


    let ingredients = ``

    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
            ingredients += `<li class="alert alert-info m-2 p-1">${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}</li>`
        }
    }

    let tags = meal.strTags?.split(",")
    if (!tags) tags = []
    let tagsStr = ''
    for (let i = 0; i < tags.length; i++) {
        tagsStr += `
        <li class="alert alert-danger m-2 p-1">${tags[i]}</li>`
    }

    let cartoona = `
    <div class="col-md-4">
                <img class="w-100 border-3  rounded-3 " src="${meal.stMealThumb}"
                    alt="">
                    <h2>${meal.strMeal}</h2>
            </div>
            <div class="col-md-8">

                <h2>Instructions</h2>
                <p>${meal.strInstructions}</p>
                <h3><span class="fw-bolder">Area : </span>${meal.strArea}</h3>
                <h3><span class="fw-bolder">Category : </span>${meal.strCategory}</h3>
                <h3>Recipes :</h3>
                <ul class="list-unstyled  d-flex g-3 flex-wrap">
                    ${ingredients}
                </ul>

                <h3>Tags :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap bg-white">
                    ${tagsStr}
                </ul>

                <a target="blanc" href="${meal.strSource}" class="btn btn-success p-3 m-4 rounded-4">Source</a>
                <a target="blanc" href="${meal.strYoutube}" class="btn btn-danger p-3 m-4 rounded-4">Youtube</a>
            </div>`

            dataRow.innerHTML = cartoona
}









/************done***************/
// 
// 
// 
// 
// 
// 
// 
// 
/*************************************contacts js start**********************************************/ 
function showContacts() {
    dataRow.innerHTML = `<div class="contact  min-vh-100 align-items-center">
    <div class="container w-80 text-center">
    
        <div class="row g-4">
            <div class="col-md-6 ">
                <input id="nameInput" class="form-lay "  onkeyup="inputsValid()" type="text"  placeholder="Enter Your Name">
                <div id="nameAlert" class="alert alert-white w-100 mt-2 d-none">
                    Special numbers and symbols %@#$&_*() not allowed
                </div>
            </div>

            <div class="col-md-6 ">
                <input id="emailInput"  class="form-lay " onkeyup="inputsValid()" type="email" placeholder="Enter Your Email">
                <div id="emailAlert" class="alert alert-white w-100 mt-2 d-none border-3 rounded-3 text-white">
                    Email not valid *exemple@yyy.zzz
                </div>
            </div>

            <div class="col-md-6">
                <input id="phoneInput" class="form-lay "  onkeyup="inputsValid()"  type="text" placeholder="Enter Your Phone">
                <div id="phoneAlert" class="alert alert-white  d-none">
                    Enter  your valid Number
                </div>
            </div>

            <div class="col-md-6">
                <input id="ageInput" onkeyup="inputsValid()" class="form-lay "   type="number" class="form-lay " placeholder="Enter Your Age">
                <div id="ageAlert" class="alert alert-white  d-none">
                    Enter your valid age
                </div>
            </div>

            <div class="col-md-6">
                <input  id="passInput" class="form-lay "  onkeyup="inputsValid()" type="password" class="form-lay " placeholder="Enter Your Password">
                <div id="passwordAlert" class="alert alert-white  d-none">
                    Enter your valid password *Minimum 8 characters, at least one letter and one number:*
                </div>
            </div>

            <div class="col-md-6">
                <input  id="repassInput" class="form-lay " onkeyup="inputsValid()" type="password"  placeholder="Repassword">
                <div id="repasswordAlert" class="alert alert-white   d-none">
                    Enter valid repassword 
                </div>
            </div>
        </div>

        <button id="submitBtn" disabled class="btn btn-outline-white px-2 mt-3 text-white bg-danger">Submit</button>
    </div>
</div>
 `
    submitBtn = document.getElementById("submitBtn")


    document.getElementById("nameInput").addEventListener("focus", () => {
        namePick = true
    })

    document.getElementById("emailInput").addEventListener("focus", () => {
        emailPick = true
    })

    document.getElementById("phoneInput").addEventListener("focus", () => {
        phonepick = true
    })

    document.getElementById("ageInput").addEventListener("focus", () => {
        agepick = true
    })

    document.getElementById("passInput").addEventListener("focus", () => {
        passpick = true
    })

    document.getElementById("repassInput").addEventListener("focus", () => {
        repasspick = true
    })
}


let  namePick = false;

let emailPick = false;

let phonepick = false;

let agepick = false;

let passpick= false;

let repasspick = false;




function inputsValid() {
    if ( namePick) {
        if (nameValid()) {
            document.getElementById("nameAlert").classList.replace("d-block", "d-none")

        } else {
            document.getElementById("nameAlert").classList.replace("d-none", "d-block")

        }
    }
    if (emailPick) {

        if (emailValid()) {
            document.getElementById("emailAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("emailAlert").classList.replace("d-none", "d-block")

        }
    }
    if ( agepick) {
        if (ageValid()) {
            document.getElementById("ageAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("ageAlert").classList.replace("d-none", "d-block")

        }
    }

    if (phonepick) {
        if (phoneValid()) {
            document.getElementById("phoneAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("phoneAlert").classList.replace("d-none", "d-block")

        }
    }

    if (passpick) {
        if (passValid()) {
            document.getElementById("passwordAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("passwordAlert").classList.replace("d-none", "d-block")

        }
    }
    if (repasspick) {
        if (repassValid()) {
            document.getElementById("repasswordAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("repasswordAlert").classList.replace("d-none", "d-block")

        }
    }


    if (nameValid() &&
        emailValid() &&
        phoneValid() &&
        ageValid() &&
        passValid() &&
        repassValid()) {
        submitBtn.removeAttribute("disabled")
    } else {
        submitBtn.setAttribute("disabled", true)
    }
}

function nameValid() {
    return (/^[a-zA-Z ]+$/.test(document.getElementById("nameInput").value))
}
function ageValid() {
    return (/^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test(document.getElementById("ageInput").value))
}
function emailValid() {
    return (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(document.getElementById("emailInput").value))
}
function passValid() {
    return (/^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/.test(document.getElementById("passInput").value))
}

function repassValid() {
    return document.getElementById("repassInput").value == document.getElementById("passInput").value
}
function phoneValid() {
    return (/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(document.getElementById("phoneInput").value))
}
/*************************************contacts js end**********************************************/ 