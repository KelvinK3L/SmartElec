/*==================================================
 SMART ELEC AFRICA
 MODULE CALCULS ELECTRIQUES
==================================================*/


// ==============================
// HISTORIQUE
// ==============================


let historique =
JSON.parse(localStorage.getItem("smartElecHistory")) || [];



function ajouterHistorique(type, valeur){


    let date =
    new Date().toLocaleDateString();



    historique.unshift({

        type:type,

        valeur:valeur,

        date:date

    });



    localStorage.setItem(

        "smartElecHistory",

        JSON.stringify(historique)

    );


    afficherHistorique();


}






function afficherHistorique(){


    const table =
    document.getElementById("historyTable");



    if(!table) return;



    table.innerHTML="";



    if(historique.length===0){


        table.innerHTML=`

        <tr>

        <td colspan="3">

        Aucun calcul

        </td>

        </tr>

        `;


        return;

    }




    historique.slice(0,10)
    .forEach(item=>{


        table.innerHTML +=`

        <tr>

        <td>${item.type}</td>

        <td>${item.valeur}</td>

        <td>${item.date}</td>

        </tr>

        `;



    });


}





afficherHistorique();









// ==============================
// LOI D'OHM
// U = R × I
// ==============================


const btnOhm =
document.getElementById("calculateOhm");



if(btnOhm){


btnOhm.onclick=function(){



let R =
Number(
document.getElementById("resistance").value
);



let I =
Number(
document.getElementById("courant").value
);



let result =
document.getElementById("resultOhm");




if(R>0 && I>0){


let U = R * I;



result.innerHTML=

`
Tension :

<strong>
${U.toFixed(2)} V
</strong>
`;



ajouterHistorique(

"Loi d'Ohm",

U.toFixed(2)+" V"

);



}



else{


result.innerHTML=
"⚠️ Entrer des valeurs valides";


}



};


}









// ==============================
// PUISSANCE
// P = U × I
// ==============================


const btnPower =
document.getElementById("btnPower");



if(btnPower){


btnPower.onclick=function(){



let U =
Number(
document.getElementById("voltagePower").value
);



let I =
Number(
document.getElementById("currentPower").value
);




let result =
document.getElementById("powerResult");




if(U>0 && I>0){



let P = U * I;



result.innerHTML=

`
Puissance :

<strong>
${P.toFixed(2)} W
</strong>
`;



ajouterHistorique(

"Puissance",

P.toFixed(2)+" W"

);



}



else{


result.innerHTML=
"⚠️ Entrer des valeurs valides";


}



};


}









// ==============================
// COURANT
// I = P / U
// ==============================



const btnCurrent =
document.getElementById("btnCurrent");



if(btnCurrent){


btnCurrent.onclick=function(){


let P =
Number(
document.getElementById("powerInput").value
);



let U =
Number(
document.getElementById("voltageInput").value
);




let result =
document.getElementById("currentResult");



if(P>0 && U>0){



let I=P/U;



result.innerHTML=

`
Courant :

<strong>
${I.toFixed(2)} A
</strong>
`;



ajouterHistorique(

"Courant",

I.toFixed(2)+" A"

);



}



else{


result.innerHTML=
"⚠️ Entrer des valeurs valides";


}


};


}









// ==============================
// RESISTANCE
// R = U / I
// ==============================


const btnResistance =
document.getElementById("btnResistance");



if(btnResistance){


btnResistance.onclick=function(){



let U =
Number(
document.getElementById("voltageResistance").value
);



let I =
Number(
document.getElementById("currentResistance").value
);



let result =
document.getElementById("resistanceResult");




if(U>0 && I>0){



let R=U/I;



result.innerHTML=

`
Résistance :

<strong>
${R.toFixed(2)} Ω
</strong>
`;



ajouterHistorique(

"Résistance",

R.toFixed(2)+" Ω"

);



}



else{


result.innerHTML=
"⚠️ Entrer des valeurs valides";


}



};


}









// ==============================
// ENERGIE
// E = P × t
// ==============================


const btnEnergy =
document.getElementById("btnEnergy");



if(btnEnergy){


btnEnergy.onclick=function(){



let P =
Number(
document.getElementById("energyPower").value
);



let t =
Number(
document.getElementById("energyTime").value
);




let result =
document.getElementById("energyResult");



if(P>0 && t>0){



let Wh=P*t;


let kWh=Wh/1000;



result.innerHTML=

`
Énergie :

<strong>
${kWh.toFixed(2)} kWh
</strong>
`;



ajouterHistorique(

"Energie",

kWh.toFixed(2)+" kWh"

);



}



else{


result.innerHTML=
"⚠️ Entrer des valeurs valides";


}



};


}









// ==============================
// EFFACER HISTORIQUE
// ==============================


const clearHistory =
document.querySelector(".recent-table button");



if(clearHistory){


clearHistory.onclick=function(){



localStorage.removeItem(
"smartElecHistory"
);



historique=[];


afficherHistorique();


};


}