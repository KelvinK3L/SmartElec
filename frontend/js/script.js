/*==================================================
 SMART ELEC AFRICA
 Main JavaScript
==================================================*/


// ==============================
// ELEMENTS
// ==============================

const menuBtn = document.getElementById("menuBtn");

const sidebar = document.getElementById("sidebar");

const overlay = document.getElementById("overlay");

const themeBtn = document.getElementById("theme");




// ==============================
// SIDEBAR MOBILE
// ==============================


if(menuBtn){


    menuBtn.addEventListener("click",()=>{


        sidebar.classList.toggle("active");


        overlay.classList.toggle("show");


    });


}




// Fermer avec overlay

if(overlay){


    overlay.addEventListener("click",()=>{


        sidebar.classList.remove("active");


        overlay.classList.remove("show");


    });


}





// Fermer après clic menu sur téléphone

const menuLinks=document.querySelectorAll(".menu a");


menuLinks.forEach(link=>{


    link.addEventListener("click",()=>{


        if(window.innerWidth <= 768){


            sidebar.classList.remove("active");


            overlay.classList.remove("show");


        }


    });


});







// ==============================
// MODE SOMBRE
// ==============================



if(themeBtn){



    themeBtn.addEventListener("click",()=>{


        document.body.classList.toggle("dark");


        sauvegarderTheme();


        changerIconeTheme();


    });



}





// Sauvegarde thème

function sauvegarderTheme(){


    if(document.body.classList.contains("dark")){


        localStorage.setItem(
            "smartElecTheme",
            "dark"
        );


    }else{


        localStorage.setItem(
            "smartElecTheme",
            "light"
        );


    }


}





// Charger thème

function chargerTheme(){


    const theme =
    localStorage.getItem("smartElecTheme");



    if(theme==="dark"){


        document.body.classList.add("dark");


    }



}





// Changer icône lune/soleil

function changerIconeTheme(){



    const icon =
    themeBtn.querySelector("i");



    if(document.body.classList.contains("dark")){


        icon.classList.remove("fa-moon");


        icon.classList.add("fa-sun");


    }

    else{


        icon.classList.remove("fa-sun");


        icon.classList.add("fa-moon");


    }


}




chargerTheme();





// ==============================
// MENU ACTIF AUTOMATIQUE
// ==============================



const currentPage =
window.location.pathname.split("/").pop();



const links =
document.querySelectorAll(".menu li");



links.forEach(item=>{


    const link =
    item.querySelector("a");



    if(link){


        const href =
        link.getAttribute("href");



        if(href===currentPage){


            item.classList.add("active");


        }


        else{


            item.classList.remove("active");


        }


    }



});







// ==============================
// COMPTEURS DASHBOARD
// ==============================


function animationCompteur(id,valeur){



    const element =
    document.getElementById(id);



    if(!element) return;



    let nombre=0;



    const interval =
    setInterval(()=>{



        nombre += Math.ceil(valeur/50);



        if(nombre>=valeur){


            nombre=valeur;


            clearInterval(interval);


        }



        element.textContent=nombre;



    },30);



}



animationCompteur(
    "calculCount",
    125
);



animationCompteur(
    "devisCount",
    32
);



animationCompteur(
    "clientCount",
    18
);








// ==============================
// DATE SYSTEME
// ==============================



const date =
new Date();



console.log(
    "⚡ SmartElec Africa lancé :",
    date.toLocaleString()
);








// ==============================
// PROTECTION LIENS NON CREES
// ==============================



document.querySelectorAll("a").forEach(link=>{


    link.addEventListener("click",(e)=>{


        const href =
        link.getAttribute("href");



        if(href==="#" || href===""){


            e.preventDefault();


        }



    });


});
