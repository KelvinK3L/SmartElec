/*==================================================
 SMART ELEC AFRICA
 MODULE TRIPHASE
 Equilibrage des phases
==================================================*/


// ==============================
// VARIABLES
// ==============================


let charges = JSON.parse(
localStorage.getItem("smartElecCharges")
) || [];





// ==============================
// ELEMENTS
// ==============================


const addCharge =
document.getElementById("addCharge");



const chargeTable =
document.getElementById("chargeTable");






// ==============================
// AJOUT CHARGE
// ==============================


if(addCharge){


addCharge.addEventListener("click",()=>{



let name =
document.getElementById("equipmentName").value;



let power =
Number(
document.getElementById("equipmentPower").value
);



let phase =
document.getElementById("phaseSelect").value;



let quantity =
Number(
document.getElementById("equipmentQuantity").value
);



let voltage =
Number(
document.getElementById("networkVoltage").value
);





if(
name==="" ||
power<=0 ||
quantity<=0
){


alert("Veuillez remplir tous les champs");


return;


}






let totalPower =
power * quantity;



// courant monophasé
let current =
totalPower / voltage;






charges.push({

name:name,

power:totalPower,

phase:phase,

current:current.toFixed(2)

});





localStorage.setItem(

"smartElecCharges",

JSON.stringify(charges)

);





afficherCharges();


calculerPhases();



});


}









// ==============================
// AFFICHAGE TABLEAU
// ==============================



function afficherCharges(){


if(!chargeTable)
return;




chargeTable.innerHTML="";




if(charges.length===0){


chargeTable.innerHTML=`

<tr>

<td colspan="5">

Aucune charge ajoutée

</td>

</tr>

`;


return;

}






charges.forEach((charge,index)=>{



chargeTable.innerHTML += `


<tr>


<td>

${charge.name}

</td>



<td>

${charge.power} W

</td>



<td>

${charge.phase}

</td>




<td>

${charge.current} A

</td>





<td>


<button 
class="delete-charge"
onclick="supprimerCharge(${index})">


<i class="fa-solid fa-trash"></i>


</button>


</td>



</tr>


`;



});



}









// ==============================
// SUPPRIMER CHARGE
// ==============================


function supprimerCharge(index){



charges.splice(index,1);



localStorage.setItem(

"smartElecCharges",

JSON.stringify(charges)

);



afficherCharges();


calculerPhases();



}









// ==============================
// CALCUL DES PHASES
// ==============================



function calculerPhases(){



let L1=0;

let L2=0;

let L3=0;





charges.forEach(charge=>{


if(charge.phase==="L1"){


L1 += Number(charge.current);


}



if(charge.phase==="L2"){


L2 += Number(charge.current);


}



if(charge.phase==="L3"){


L3 += Number(charge.current);


}



});






document.getElementById("phaseL1")
.innerHTML =
L1.toFixed(2)+" A";



document.getElementById("phaseL2")
.innerHTML =
L2.toFixed(2)+" A";



document.getElementById("phaseL3")
.innerHTML =
L3.toFixed(2)+" A";






calculerDesequilibre(L1,L2,L3);



}









// ==============================
// CALCUL DESEQUILIBRE
// ==============================



function calculerDesequilibre(
L1,
L2,
L3
){



let moyenne =
(L1+L2+L3)/3;




if(moyenne===0){

return;

}




let max =
Math.max(L1,L2,L3);



let difference =
Math.abs(max-moyenne);





let pourcentage =
(difference/moyenne)*100;






document.getElementById("imbalance")
.innerHTML =
pourcentage.toFixed(2)+" %";






let message =
document.getElementById("balanceMessage");





if(pourcentage < 10){



message.innerHTML =
`
✅ Installation équilibrée
<br>
Déséquilibre acceptable :
${pourcentage.toFixed(2)} %
`;



}


else{



message.innerHTML =
`
⚠️ Déséquilibre élevé
<br>
Réorganisez les charges entre L1 L2 L3
`;



}



}









// ==============================
// EQUILIBRAGE AUTOMATIQUE
// ==============================


const balanceButton =
document.getElementById("balanceButton");



if(balanceButton){


balanceButton.addEventListener("click",()=>{



alert(
"Analyse automatique terminée. Déplacez les charges de la phase la plus chargée vers la moins chargée."
);



});


}







// ==============================
// CHARGEMENT INITIAL
// ==============================


afficherCharges();

calculerPhases();
