/*================================================
 SMART ELEC AFRICA
 PARAMETRES JAVASCRIPT
================================================*/


//================================
// POPUP CONNEXION
//================================


const loginPopup = 
document.getElementById("loginPopup");


const openLogin =
document.getElementById("openLogin");


const closeLogin =
document.getElementById("closeLogin");





if(openLogin){


openLogin.addEventListener("click",()=>{


loginPopup.classList.add("active");


});


}






if(closeLogin){


closeLogin.addEventListener("click",()=>{


loginPopup.classList.remove("active");


});


}







//================================
// POPUP INSCRIPTION
//================================


const registerPopup =
document.getElementById("registerPopup");



const openRegister =
document.getElementById("openRegister");



const closeRegister =
document.getElementById("closeRegister");





if(openRegister){


openRegister.addEventListener("click",()=>{


registerPopup.classList.add("active");


});


}






if(closeRegister){


closeRegister.addEventListener("click",()=>{


registerPopup.classList.remove("active");


});


}









// fermer popup en cliquant dehors


document.querySelectorAll(".popup-overlay")
.forEach(popup=>{


popup.addEventListener("click",(e)=>{


if(e.target === popup){


popup.classList.remove("active");


}


});


});









//================================
// INSCRIPTION UTILISATEUR
//================================



const registerBtn =
document.getElementById("registerBtn");





if(registerBtn){


registerBtn.addEventListener("click",()=>{



let user = {



name:
document.getElementById("registerName").value,



company:
document.getElementById("registerCompany").value,



phone:
document.getElementById("registerPhone").value,



email:
document.getElementById("registerEmail").value,



city:
document.getElementById("registerCity").value,



job:
document.getElementById("registerJob").value,



password:
document.getElementById("registerPassword").value



};







let confirmPassword =
document.getElementById("registerConfirm").value;







if(
user.name === "" ||
user.email === "" ||
user.password === ""
){


alert("Veuillez remplir les champs obligatoires");


return;


}







if(user.password !== confirmPassword){


alert("Les mots de passe ne correspondent pas");


return;


}








localStorage.setItem(

"smartElecUser",

JSON.stringify(user)

);






alert(

"Compte créé avec succès ⚡"

);





registerPopup.classList.remove("active");



});



}









//================================
// CONNEXION
//================================



const loginBtn =
document.getElementById("loginBtn");





if(loginBtn){



loginBtn.addEventListener("click",()=>{



let user =
JSON.parse(

localStorage.getItem("smartElecUser")

);







if(!user){


alert(

"Aucun compte trouvé"

);


return;


}







let username =
document.getElementById("loginUser").value;



let password =
document.getElementById("loginPassword").value;








if(
(username === user.email ||
username === user.phone)
&&
password === user.password
){



localStorage.setItem(

"smartElecSession",

"connected"

);





alert(

"Connexion réussie ⚡"

);




loginPopup.classList.remove("active");



}

else{


alert(

"Identifiants incorrects"

);


}



});


}
//================================================
// SAUVEGARDE PROFIL ELECTRICIEN
//================================================


const saveProfessional =
document.getElementById("saveProfessional");



if(saveProfessional){


saveProfessional.addEventListener("click",()=>{


let profil = {


company:
document.getElementById("settingCompany").value,


name:
document.getElementById("settingName").value,


phone:
document.getElementById("settingPhone").value,


city:
document.getElementById("settingCity").value,


speciality:
document.getElementById("settingSpeciality").value



};





localStorage.setItem(

"smartElecProfile",

JSON.stringify(profil)

);





alert(

"Profil professionnel sauvegardé ⚡"

);



});



}









//================================================
// PARAMETRES DEVIS
//================================================


const saveInvoiceSettings =
document.getElementById("saveInvoiceSettings");





if(saveInvoiceSettings){


saveInvoiceSettings.addEventListener("click",()=>{



let devis = {



currency:
document.getElementById("defaultCurrency").value,



validity:
document.getElementById("defaultValidity").value,



tax:
document.getElementById("enableTax").value,



taxPercent:
document.getElementById("taxPercent").value



};







localStorage.setItem(

"smartElecInvoice",

JSON.stringify(devis)

);






alert(

"Paramètres devis sauvegardés 📄"

);





});



}









//================================================
// PARAMETRES ELECTRIQUES
//================================================



const saveElectricalSettings =
document.getElementById("saveElectricalSettings");






if(saveElectricalSettings){


saveElectricalSettings.addEventListener("click",()=>{





let electrical = {



singleVoltage:

document.getElementById("singleVoltage").value,



threeVoltage:

document.getElementById("threeVoltage").value,



frequency:

document.getElementById("frequency").value,



security:

document.getElementById("securityFactor").value



};








localStorage.setItem(

"smartElecElectrical",

JSON.stringify(electrical)

);








alert(

"Paramètres électriques sauvegardés ⚡"

);




});



}


//================================================
// CHARGEMENT AUTOMATIQUE DES DONNEES
//================================================


document.addEventListener("DOMContentLoaded",()=>{





//==============================
// PROFIL ELECTRICIEN
//==============================


let profil = 
JSON.parse(

localStorage.getItem("smartElecProfile")

);





if(profil){



if(document.getElementById("settingCompany"))

document.getElementById("settingCompany").value =
profil.company || "";



if(document.getElementById("settingName"))

document.getElementById("settingName").value =
profil.name || "";



if(document.getElementById("settingPhone"))

document.getElementById("settingPhone").value =
profil.phone || "";



if(document.getElementById("settingCity"))

document.getElementById("settingCity").value =
profil.city || "";



if(document.getElementById("settingSpeciality"))

document.getElementById("settingSpeciality").value =
profil.speciality || "";



}








//==============================
// PARAMETRES DEVIS
//==============================



let devis =

JSON.parse(

localStorage.getItem("smartElecInvoice")

);






if(devis){



if(document.getElementById("defaultCurrency"))

document.getElementById("defaultCurrency").value =
devis.currency || "$";



if(document.getElementById("defaultValidity"))

document.getElementById("defaultValidity").value =
devis.validity || "30";



if(document.getElementById("enableTax"))

document.getElementById("enableTax").value =
devis.tax || "no";



if(document.getElementById("taxPercent"))

document.getElementById("taxPercent").value =
devis.taxPercent || "16";



}









//==============================
// PARAMETRES ELECTRIQUES
//==============================



let electrical =

JSON.parse(

localStorage.getItem("smartElecElectrical")

);







if(electrical){



if(document.getElementById("singleVoltage"))

document.getElementById("singleVoltage").value =
electrical.singleVoltage || "220";



if(document.getElementById("threeVoltage"))

document.getElementById("threeVoltage").value =
electrical.threeVoltage || "380";



if(document.getElementById("frequency"))

document.getElementById("frequency").value =
electrical.frequency || "50";



if(document.getElementById("securityFactor"))

document.getElementById("securityFactor").value =
electrical.security || "1.25";



}



});









//================================================
// GESTION LOGO ENTREPRISE
//================================================



const companyLogo =
document.getElementById("companyLogo");






if(companyLogo){



companyLogo.addEventListener("change",function(){



let file = this.files[0];



if(!file)
return;





let reader = new FileReader();





reader.onload=function(e){





localStorage.setItem(

"smartElecLogo",

e.target.result

);





alert(

"Logo enregistré ⚡"

);



};





reader.readAsDataURL(file);




});



}


//================================================
// APPARENCE SMART ELEC
//================================================



const saveAppearance =
document.getElementById("saveAppearance");





if(saveAppearance){



saveAppearance.addEventListener("click",()=>{



let appearance = {


theme:
document.getElementById("appTheme").value,


color:
document.getElementById("primaryColor").value,


animation:
document.getElementById("animationMode").value,


font:
document.getElementById("fontSize").value



};






localStorage.setItem(

"smartElecAppearance",

JSON.stringify(appearance)

);






applyAppearance();






alert(

"Apparence appliquée 🎨"

);




});



}









//================================================
// APPLICATION DU THEME
//================================================



function applyAppearance(){



let appearance =

JSON.parse(

localStorage.getItem("smartElecAppearance")

);





if(!appearance)

return;








// MODE SOMBRE


if(appearance.theme === "dark"){


document.body.classList.add("dark-mode");


}

else{


document.body.classList.remove("dark-mode");


}









// TAILLE TEXTE


if(appearance.font==="large"){



document.body.style.fontSize="18px";


}



else if(appearance.font==="small"){



document.body.style.fontSize="14px";


}



else{


document.body.style.fontSize="16px";


}








// ANIMATION


if(appearance.animation==="off"){



document.body.classList.add("no-animation");


}

else{


document.body.classList.remove("no-animation");


}








// COULEUR PRINCIPALE


if(appearance.color==="yellow"){



document.documentElement.style
.setProperty(

"--primary",

"#FFC107"

);



}



else if(appearance.color==="green"){



document.documentElement.style
.setProperty(

"--primary",

"#16a34a"

);



}



else{



document.documentElement.style
.setProperty(

"--primary",

"#1565C0"

);



}




}







// appliquer au chargement


document.addEventListener(

"DOMContentLoaded",

()=>{


applyAppearance();


});











//================================================
// LANGUE
//================================================



const saveLanguage =

document.getElementById("saveLanguage");






if(saveLanguage){



saveLanguage.addEventListener("click",()=>{



let language =

document.getElementById("language").value;






localStorage.setItem(

"smartElecLanguage",

language

);






alert(

"Langue enregistrée 🌍"

);



});



}
//================================================
// EXPORT DES DONNEES SMART ELEC
//================================================


const exportData =
document.getElementById("exportData");



if(exportData){


exportData.addEventListener("click",()=>{



let data = {



user:
JSON.parse(
localStorage.getItem("smartElecUser")
),



profile:
JSON.parse(
localStorage.getItem("smartElecProfile")
),



invoice:
JSON.parse(
localStorage.getItem("smartElecInvoice")
),



electrical:
JSON.parse(
localStorage.getItem("smartElecElectrical")
),



appearance:
JSON.parse(
localStorage.getItem("smartElecAppearance")
),



language:
localStorage.getItem("smartElecLanguage"),



logo:
localStorage.getItem("smartElecLogo")



};







let file = new Blob(

[
JSON.stringify(data,null,2)
],

{
type:"application/json"
}

);







let link = document.createElement("a");


link.href =
URL.createObjectURL(file);



link.download =
"SmartElec_Backup.json";



link.click();






alert(

"Sauvegarde exportée 💾"

);



});



}










//================================================
// IMPORT DES DONNEES
//================================================


const importBtn =
document.getElementById("importDataBtn");



const importFile =
document.getElementById("importData");





if(importBtn){


importBtn.addEventListener("click",()=>{


importFile.click();



});



}







if(importFile){


importFile.addEventListener("change",function(){



let file =
this.files[0];




if(!file)
return;







let reader =
new FileReader();






reader.onload=function(e){



try{



let data =
JSON.parse(e.target.result);







localStorage.setItem(

"smartElecUser",

JSON.stringify(data.user)

);






localStorage.setItem(

"smartElecProfile",

JSON.stringify(data.profile)

);






localStorage.setItem(

"smartElecInvoice",

JSON.stringify(data.invoice)

);






localStorage.setItem(

"smartElecElectrical",

JSON.stringify(data.electrical)

);






localStorage.setItem(

"smartElecAppearance",

JSON.stringify(data.appearance)

);






localStorage.setItem(

"smartElecLanguage",

data.language

);







localStorage.setItem(

"smartElecLogo",

data.logo

);







alert(

"Restauration réussie ⚡"

);




location.reload();




}

catch(error){



alert(

"Fichier invalide"

);



}



};







reader.readAsText(file);




});



}











//================================================
// RESET APPLICATION
//================================================



const resetData =
document.getElementById("resetData");





if(resetData){



resetData.addEventListener("click",()=>{





let confirmation =
confirm(

"Voulez-vous supprimer toutes les données SmartElec ?"

);







if(confirmation){



localStorage.clear();





alert(

"Application réinitialisée"

);





location.reload();



}



});



}









//================================================
// DECONNEXION
//================================================



function logoutSmartElec(){



localStorage.removeItem(

"smartElecSession"

);




alert(

"Déconnexion réussie"

);




}









//================================================
// VERIFICATION SESSION
//================================================



function checkSmartElecSession(){



let session =

localStorage.getItem(

"smartElecSession"

);





if(session){



console.log(

"Utilisateur connecté ⚡"

);



}

else{


console.log(

"Mode invité"

);


}



}






document.addEventListener(

"DOMContentLoaded",

()=>{


checkSmartElecSession();


});