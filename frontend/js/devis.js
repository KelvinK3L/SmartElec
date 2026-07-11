/*==================================================
 SMART ELEC AFRICA
 DEVIS PROFESSIONNEL
 JAVASCRIPT
==================================================*/



// ==============================
// VARIABLES GLOBALES
// ==============================


let products = JSON.parse(
localStorage.getItem("smartElecProducts")
) || [];



let quotes = JSON.parse(
localStorage.getItem("smartElecQuotes")
) || [];




// ==============================
// GENERATION NUMERO DEVIS
// ==============================


function generateQuoteNumber(){


let year = new Date().getFullYear();



let number = quotes.length + 1;



return "DEV-" + year + "-" + 
String(number).padStart(4,"0");


}







// ==============================
// CHARGER NUMERO
// ==============================


const quoteNumber =
document.getElementById("quoteNumber");



if(quoteNumber){


quoteNumber.value =
generateQuoteNumber();


}








// ==============================
// PROFIL ELECTRICIEN
// ==============================


const saveProfile =
document.getElementById("saveProfile");




if(saveProfile){



saveProfile.addEventListener("click",()=>{



let profile = {


company:
document.getElementById("companyName").value,


phone:
document.getElementById("companyPhone").value,


address:
document.getElementById("companyAddress").value,


currency:
document.getElementById("currency").value


};






localStorage.setItem(

"smartElecProfile",

JSON.stringify(profile)

);




alert("Profil enregistré avec succès ⚡");



});



}







// ==============================
// CHARGEMENT PROFIL
// ==============================


function loadProfile(){



let profile =
JSON.parse(
localStorage.getItem("smartElecProfile")
);



if(!profile) return;





if(document.getElementById("companyName")){


document.getElementById("companyName").value =
profile.company;


document.getElementById("companyPhone").value =
profile.phone;


document.getElementById("companyAddress").value =
profile.address;


document.getElementById("currency").value =
profile.currency;


}



}






loadProfile();
// ==============================
// AJOUT PRODUIT
// ==============================


const addProduct =
document.getElementById("addProduct");



if(addProduct){


addProduct.addEventListener("click",()=>{



let name =
document.getElementById("productName").value;



let category =
document.getElementById("productCategory").value;



let quantity =
Number(
document.getElementById("productQuantity").value
);



let price =
Number(
document.getElementById("productPrice").value
);





if(
name === "" ||
quantity <= 0 ||
price <= 0
){


alert("Veuillez remplir les informations du produit");


return;


}







let product = {


id:Date.now(),


name:name,


category:category,


quantity:quantity,


price:price,


total:
quantity * price


};






products.push(product);






localStorage.setItem(

"smartElecProducts",

JSON.stringify(products)

);






displayProducts();



clearProductForm();



});



}









// ==============================
// AFFICHAGE TABLEAU PRODUITS
// ==============================


function displayProducts(){



const table =
document.getElementById("productsTable");




if(!table)
return;






table.innerHTML="";







if(products.length===0){



table.innerHTML=`

<tr>

<td colspan="7">

Aucun article ajouté

</td>

</tr>

`;

return;


}








products.forEach((product,index)=>{



table.innerHTML += `


<tr>


<td>

${index+1}

</td>



<td>

${product.name}

</td>




<td>

${product.category}

</td>





<td>

${product.quantity}

</td>





<td>

${product.price}

</td>





<td>

${product.total}

</td>






<td>



<button

class="delete-btn"

onclick="deleteProduct(${index})">


<i class="fa-solid fa-trash"></i>


</button>



</td>



</tr>



`;



});






calculateQuote();



}









// ==============================
// SUPPRESSION PRODUIT
// ==============================


function deleteProduct(index){



products.splice(index,1);




localStorage.setItem(

"smartElecProducts",

JSON.stringify(products)

);




displayProducts();



}






// rendre accessible au HTML

window.deleteProduct = deleteProduct;









// ==============================
// NETTOYAGE FORMULAIRE
// ==============================


function clearProductForm(){



document.getElementById("productName").value="";


document.getElementById("productQuantity").value=1;


document.getElementById("productPrice").value="";



}








// ==============================
// CALCUL SOUS TOTAL
// ==============================


function calculateQuote(){



let subtotal = 0;




products.forEach(product=>{


subtotal += product.total;


});





let subtotalBox =
document.getElementById("subtotal");



if(subtotalBox){


subtotalBox.innerHTML =
subtotal;


}






updatePreview();



}








// CHARGEMENT INITIAL


displayProducts();
// ==============================
// CALCUL COMPLET DU DEVIS
// ==============================


function calculateQuote(){


let subtotal = 0;



products.forEach(product=>{


subtotal += product.total;


});





// sous-total

const subtotalBox =
document.getElementById("subtotal");



if(subtotalBox){


subtotalBox.innerHTML =
subtotal;


}








// récupération marge/taxe

let deposit =
Number(
document.getElementById("deposit")?.value
)
|| 0;





let advance =
(subtotal * deposit) / 100;







// affichage avance


const advanceBox =
document.getElementById("advanceAmount");



if(advanceBox){


advanceBox.innerHTML =
advance;


}









// total final


const finalTotal =
document.getElementById("finalTotal");



if(finalTotal){


finalTotal.innerHTML =
subtotal;


}






updatePreview();



}









// ==============================
// APERCU DEVIs DYNAMIQUE
// ==============================


function updatePreview(){



let profile =
JSON.parse(
localStorage.getItem("smartElecProfile")
)
|| {};







// entreprise


const previewCompany =
document.getElementById("previewCompany");



if(previewCompany){


previewCompany.innerHTML =
profile.company || "Votre entreprise";


}





const previewPhone =
document.getElementById("previewPhone");



if(previewPhone){


previewPhone.innerHTML =
profile.phone || "";


}










// numéro devis


const previewNumber =
document.getElementById("previewNumber");



if(previewNumber){


previewNumber.innerHTML =
document.getElementById("quoteNumber").value;


}










// client


const client =
document.getElementById("clientName");



const previewClient =
document.getElementById("previewClient");



if(previewClient){


previewClient.innerHTML =
client?.value || "-";


}








// travaux


const work =
document.getElementById("workType");



const previewWork =
document.getElementById("previewWork");



if(previewWork){


previewWork.innerHTML =
work?.value || "-";


}








// date


const date =
document.getElementById("quoteDate");



const previewDate =
document.getElementById("previewDate");



if(previewDate){


previewDate.innerHTML =
date?.value || "-";


}









// tableau aperçu


const previewTable =
document.getElementById("previewTable");



if(previewTable){



previewTable.innerHTML="";



products.forEach(product=>{



previewTable.innerHTML += `


<tr>


<td>

${product.name}

</td>



<td>

${product.quantity}

</td>



<td>

${product.total}

</td>



</tr>


`;



});



}









// total aperçu


const previewSubtotal =
document.getElementById("previewSubtotal");



if(previewSubtotal){


let total = 0;


products.forEach(product=>{


total += product.total;


});



previewSubtotal.innerHTML =
total;


}







const previewTotal =
document.getElementById("previewTotal");



if(previewTotal){


let total = 0;


products.forEach(product=>{


total += product.total;


});



previewTotal.innerHTML =
total;


}



}








// ==============================
// MISE A JOUR AUTOMATIQUE
// ==============================


document.querySelectorAll("input,select,textarea")
.forEach(element=>{


element.addEventListener(
"input",
updatePreview
);



});

// ==============================
// SAUVEGARDER UN DEVIs
// ==============================


const saveQuote =
document.getElementById("saveQuote");




if(saveQuote){



saveQuote.addEventListener("click",()=>{



let profile =
JSON.parse(
localStorage.getItem("smartElecProfile")
)
|| {};





let quote = {


id:Date.now(),


number:
document.getElementById("quoteNumber").value,



date:
document.getElementById("quoteDate").value,



company:
profile.company || "",



client:
document.getElementById("clientName").value,



phone:
document.getElementById("clientPhone").value,



address:
document.getElementById("clientAddress").value,



work:
document.getElementById("workType").value,



description:
document.getElementById("workDescription").value,



products:products,



total:
calculateTotalValue(),



currency:
profile.currency || "$"



};








quotes.push(quote);







localStorage.setItem(

"smartElecQuotes",

JSON.stringify(quotes)

);







alert(
"Devis sauvegardé avec succès ⚡"
);






displayHistory();





});



}









// ==============================
// CALCUL VALEUR TOTAL
// ==============================


function calculateTotalValue(){



let total = 0;



products.forEach(product=>{


total += product.total;


});



return total;


}









// ==============================
// AFFICHAGE HISTORIQUE
// ==============================


function displayHistory(){



const history =
document.getElementById("historyTable");




if(!history)
return;






history.innerHTML="";







if(quotes.length===0){



history.innerHTML=`

<tr>

<td colspan="5">

Aucun devis sauvegardé

</td>

</tr>

`;

return;


}








quotes.forEach((quote,index)=>{



history.innerHTML += `


<tr>


<td>

${quote.number}

</td>



<td>

${quote.client}

</td>



<td>

${quote.total} ${quote.currency}

</td>



<td>

${quote.date}

</td>




<td>



<button

class="view-btn"

onclick="loadQuote(${index})">


<i class="fa-solid fa-eye"></i>


</button>





<button

class="delete-btn"

onclick="deleteQuote(${index})">


<i class="fa-solid fa-trash"></i>


</button>



</td>



</tr>



`;



});




}









// ==============================
// CHARGER ANCIEN DEVIs
// ==============================


function loadQuote(index){



let quote =
quotes[index];





document.getElementById("quoteNumber").value =
quote.number;



document.getElementById("clientName").value =
quote.client;



document.getElementById("clientPhone").value =
quote.phone;



document.getElementById("clientAddress").value =
quote.address;



document.getElementById("workType").value =
quote.work;



document.getElementById("workDescription").value =
quote.description;





products =
quote.products;





displayProducts();





alert(
"Devis chargé"
);



}







window.loadQuote =
loadQuote;









// ==============================
// SUPPRIMER DEVIs
// ==============================


function deleteQuote(index){



if(
confirm("Supprimer ce devis ?")
){



quotes.splice(index,1);




localStorage.setItem(

"smartElecQuotes",

JSON.stringify(quotes)

);





displayHistory();



}



}





window.deleteQuote =
deleteQuote;









// CHARGEMENT HISTORIQUE


displayHistory();


// ==============================
// IMPRESSION DU DEVIS
// ==============================


const printQuote =
document.getElementById("printQuote");




if(printQuote){



printQuote.addEventListener("click",()=>{



let content =
document.getElementById("invoicePreview").innerHTML;





let windowPrint =
window.open(
"",
"",
"width=900,height=700"
);





windowPrint.document.write(`

<html>

<head>


<title>Devis SmartElec</title>


<style>


body{

font-family:Arial,sans-serif;

padding:30px;

}



h2,h3{

text-align:center;

}



table{

width:100%;

border-collapse:collapse;

margin-top:20px;

}



td,th{

border:1px solid #ccc;

padding:10px;

text-align:center;

}



.signature-box{

display:flex;

justify-content:space-around;

margin-top:50px;

}



</style>


</head>



<body>


${content}


</body>


</html>


`);





windowPrint.document.close();



windowPrint.print();



});



}









// ==============================
// EXPORT PDF AVEC JSPDF
// ==============================


const pdfButton =
document.getElementById("pdfQuote");





if(pdfButton){



pdfButton.addEventListener("click",()=>{





const { jsPDF } =
window.jspdf;





let pdf =
new jsPDF();







let profile =
JSON.parse(
localStorage.getItem("smartElecProfile")
)
|| {};





let total =
calculateTotalValue();






pdf.setFontSize(18);


pdf.text(
"SMART ELEC AFRICA",
20,
20
);






pdf.setFontSize(12);



pdf.text(

"Entreprise : "
+
(profile.company || ""),

20,

35

);






pdf.text(

"Client : "
+
(document.getElementById("clientName").value),

20,

45

);







pdf.text(

"Numero : "
+
(document.getElementById("quoteNumber").value),

20,

55

);








let y = 75;






pdf.text(

"DETAILS",

20,

y

);





y+=10;






products.forEach((product)=>{





pdf.text(

product.name+
" x"+
product.quantity+
" = "+
product.total,

20,

y

);





y+=10;



});








pdf.text(

"TOTAL : "
+
total+
" "
+
(profile.currency || "$"),

20,

y+10

);







pdf.save(

document.getElementById("quoteNumber").value
+
".pdf"

);



});



}









// ==============================
// NOUVEAU NUMERO DEVIs
// ==============================


function refreshQuoteNumber(){



let input =
document.getElementById("quoteNumber");



if(input){



input.value =
generateQuoteNumber();


}



}




// ==============================
// INITIALISATION FINALE
// ==============================


window.addEventListener(
"load",
()=>{


displayProducts();


displayHistory();


updatePreview();


refreshQuoteNumber();



}
);
