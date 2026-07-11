/*==================================================
 SMART ELEC AFRICA
 MODULE DIMENSIONNEMENT ELECTRIQUE
==================================================*/


// ==============================
// BOUTON CALCUL
// ==============================


const calculateDimension =
document.getElementById("calculateDimension");





if(calculateDimension){



calculateDimension.addEventListener("click",()=>{





// récupération données


let network =
document.getElementById("network").value;



let power =
Number(
document.getElementById("totalPower").value
);



let voltage =
Number(
document.getElementById("voltage").value
);



let cosPhi =
Number(
document.getElementById("cosPhi").value
);



let length =
Number(
document.getElementById("cableLength").value
);






// vérification


if(
power<=0 ||
voltage<=0 ||
cosPhi<=0
){


alert("Veuillez remplir correctement les paramètres");


return;


}








// ==============================
// CALCUL COURANT
// ==============================


let current;





if(network==="tri"){



current =
power /
(
Math.sqrt(3)
*
voltage
*
cosPhi
);



}

else{



current =
power /
(
voltage
*
cosPhi
);



}









// ==============================
// CHOIX SECTION CABLE
// ==============================


let section;



if(current <= 10){


section="1.5 mm²";


}

else if(current <= 20){


section="2.5 mm²";


}

else if(current <= 32){


section="4 mm²";


}

else if(current <= 40){


section="6 mm²";


}

else if(current <= 63){


section="10 mm²";


}

else{


section="16 mm² ou plus";


}









// ==============================
// CHOIX DISJONCTEUR
// ==============================



let breaker;



if(current<=10){


breaker="10 A";


}

else if(current<=16){


breaker="16 A";


}

else if(current<=25){


breaker="25 A";


}

else if(current<=32){


breaker="32 A";


}

else if(current<=40){


breaker="40 A";


}

else if(current<=63){


breaker="63 A";


}

else{


breaker="Protection industrielle";


}









// ==============================
// CHUTE TENSION ESTIMATION
// ==============================



let drop =
(length * current * 0.0175)
/
( voltage * Number(section.split(" ")[0]) );





let dropPercent =
drop * 100;









// ==============================
// AFFICHAGE
// ==============================



document.getElementById("currentResult")
.innerHTML =
current.toFixed(2)+" A";




document.getElementById("sectionResult")
.innerHTML =
section;





document.getElementById("breakerResult")
.innerHTML =
breaker;





document.getElementById("dropResult")
.innerHTML =
dropPercent.toFixed(2)+" %";








let report =
document.getElementById("dimensionReport");





if(dropPercent < 3){



report.innerHTML=`

✅ Installation correcte

<br><br>

Courant :
<strong>${current.toFixed(2)} A</strong>

<br>

Câble conseillé :
<strong>${section}</strong>

<br>

Disjoncteur :
<strong>${breaker}</strong>

<br>

Chute tension :
<strong>${dropPercent.toFixed(2)} %</strong>

`;



}

else{



report.innerHTML=`

⚠️ Attention chute de tension élevée

<br><br>

Augmenter la section du câble.

<br>

Courant :
<strong>${current.toFixed(2)} A</strong>

<br>

Section actuelle :
<strong>${section}</strong>

<br>

Chute :
<strong>${dropPercent.toFixed(2)} %</strong>

`;



}





sauvegarderDimension();



});



}









// ==============================
// SAUVEGARDE HISTORIQUE
// ==============================



function sauvegarderDimension(){



let data =
JSON.parse(
localStorage.getItem("dimensionHistory")
)
|| [];





data.push({


date:
new Date().toLocaleString(),


power:
document.getElementById("totalPower").value
+" W",


section:
document.getElementById("sectionResult").innerHTML,


breaker:
document.getElementById("breakerResult").innerHTML



});





localStorage.setItem(

"dimensionHistory",

JSON.stringify(data)

);



}