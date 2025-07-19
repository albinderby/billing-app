import {retrieveFormData } from "./stockDB.js";


export async function displayLogic(){
    const displayTable= document.getElementById("stockDisplay");

    let allItem;
    let i
    async function initialDisplay(){
        i=0;
        allItem=await retrieveFormData();
        printer();
    }
    async function latestAddedItemDisplay(){
        allItem=await retrieveFormData();
        i=allItem.length-1;
        printer()
    }
   function printer(){
    for(;i<allItem.length;i++){
        const newRow=document.createElement("tr");
        const itemNo=document.createElement("td");
        const itemName=document.createElement("td");
        const qty=document.createElement("td");
        const buyPrice=document.createElement("td");
        const sellPrice=document.createElement("td");

        itemNo.textContent=i+1;
        itemName.textContent=""+allItem[i].itemName
        qty.textContent=allItem[i].itemQty;
        buyPrice.textContent=allItem[i].buyPrice;
        sellPrice.textContent=allItem[i].sellPrice;
       newRow.append(itemNo,itemName,qty,buyPrice,sellPrice);
       displayTable.appendChild(newRow);
    }
   }
    return {initialDisplay,latestAddedItemDisplay}
}


