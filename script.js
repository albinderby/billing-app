import { saveFormData,retrieveFormData,deleteItem, editRecord} from "./stockDB.js";
import { displayLogic } from "./display.js";
const deleteItemFromDB=deleteItem // this is the imported function from stockDB file for delete the item from database
const AddNewItemBtn=document.getElementById("AddNewItem");
const newItemForm=document.getElementById("addNewItemForm")
const deleteBtn=document.getElementById("deleteButton");
const deletingForm=document.getElementById("deletingForm");

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

deleteBtn.addEventListener("click",()=>{
    event.preventDefault();
    deletingForm.style.display="block";
    deletingForm.addEventListener("submit",()=>{
     const formData=new FormData(deletingForm);
     deleteItemFromDB(formData.get("deletingItem"));
 })
 })


