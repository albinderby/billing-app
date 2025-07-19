const DB_NAME="billingApp";
const STORE_NAME="stockDetails";
const DB_VERSION=1;

let db;


function openDatabase(){
    return new Promise((resolve,reject)=>{
        //request to open the database
        const request=indexedDB.open(DB_NAME,DB_VERSION);

        request.onupgradeneeded =(event)=>{
            console.log('Database upgrade needed / creation started');
            let objectStore;
            db=event.target.result;
                    if(!db.objectStoreNames.contains(STORE_NAME)){
                 objectStore=db.createObjectStore(STORE_NAME,{keyPath:"itemNo",autoIncrement:true}); 
                    }else{
                        objectStore=event.currentTarget.transaction.objectStore(STORE_NAME);
                    }
                    if(!objectStore.indexNames.contains("itemNameIndex")){
                    objectStore.createIndex("itemNameIndex","itemName",{unique:false}); 
                    }

            console.log("Object store created");

        };
        request.onsuccess=(event) =>{
            db= event.target.result;//get database instance
            console.log("Database opened successfully");
            resolve(db);//Resolve the promise with the db instance
        }
        request.onerror=(event)=>{
            console.error("Databas error:",event.target.errorCode);
            reject(new Error("Failed to open Database"));
        }
    })
}

export  async function saveFormData(formData){
    if(!db){
        db= await openDatabase();
    }
    const transaction=db.transaction([STORE_NAME],'readwrite');
    const store=transaction.objectStore(STORE_NAME);
    console.log(formData.get("itemName"))
    const request=store.add({
        itemName:formData.get("itemName"),
        itemQty: Number(formData.get("ItemQty")), 
        buyPrice: Number(formData.get("buyPrice")), 
        sellPrice: Number(formData.get("sellPrice")) 
    })

    request.onsuccess=()=>{
        console.log("stock details saved in database succesfully");
    }
    request.onerror=(event)=>{
        console.error("error saving formdata", event.target.error);
    }
}


export async function retrieveFormData(){
    if(!db){
        db=await openDatabase();
    }
    const transaction=db.transaction([STORE_NAME],"readonly");
    const store=transaction.objectStore(STORE_NAME);
    const request=store.getAll();
    return new Promise((resolve,reject)=>{
        request.onsuccess=(event)=>{
            resolve(event.target.result)
        }
        request.onerror=(event)=>{
            console.error("Error retrieving all stock items:", event.target.error);
            reject(new Error("Failed to retrieve all stock items."));
        }
    })

}

export async function deleteItem(deleteIndex){
    console.log("##### A: Entering deleteItem function #####"); 
    if(!db){
        db= await openDatabase();
    }
    setTimeout(() => {
        console.log("DEBUG: deleteIndex value is:", deleteIndex); 
    }, 3000);
    console.log("DEBUG: deleteIndex value is:", deleteIndex); 
    const transaction=db.transaction([STORE_NAME],"readwrite");
    const store=transaction.objectStore(STORE_NAME);
    const index=store.index("itemNameIndex");
    const request=index.get(deleteIndex);

    request.onsuccess=(event)=>{
        console.log(event.target.result);
        if(event.target.result){
            const request=store.delete(event.target.result.itemNo);
            request.onsuccess=(event)=>{
                console.log(event.target);
            }
            request.onerror=(event)=>{
                console.error(event.target.error);
            }
        }else console.log("item not found to delete");
       
    }
    request.onerror=(event)=>{
        console.error(event.target.error);
    }

}



