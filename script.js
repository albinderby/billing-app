import { saveFormData,retrieveFormData } from "./stockDB.js";
import { displayLogic } from "./display.js";

const AddNewItemBtn=document.getElementById("AddNewItem");
const newItemForm=document.getElementById("addNewItemForm")

let myDisplayManager;
(async function setUpDisplay(){
    myDisplayManager=await displayLogic();
    myDisplayManager.initialDisplay();
})();

AddNewItemBtn.addEventListener("click",()=>{
    newItemForm.style.display="block";
})


newItemForm.addEventListener("submit",(event)=>{
    event.preventDefault();
    const formData=new FormData(newItemForm);
    saveFormData(formData);
    newItemForm.style.display="none";
    myDisplayManager.latestAddedItemDisplay();
})




