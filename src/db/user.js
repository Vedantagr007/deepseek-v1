import { encryptData , decryptData } from "../encrypt/crypto";

const db_name = "meta";
const store_name = "ssn";
const version = 1; // No need to change this
const id = 123;


const DB = ()=>{

    return new Promise((resolve, reject) => {
        const request = indexedDB.open(db_name, version);

        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            if (!db.objectStoreNames.contains(store_name)) {
                db.createObjectStore(store_name, { keyPath: "id" });
            }
        };

        request.onsuccess = (event) => {
            const db = event.target.result;
            resolve(db);
        };
        request.onerror = () => reject(null);
    });
}

export const addUser = async (user) => {

    try {
        const db = await DB();
        const transaction = db.transaction(store_name, "readwrite");
        const store = transaction.objectStore(store_name);

        const encryptedUser = {
            id: id,
            data: encryptData(user),
        };

        const request = store.put(encryptedUser);

        return new Promise((resolve, reject) => {
            request.onsuccess = () => resolve("User added successfully");
            request.onerror = () => reject("Failed to add user");
        });
    } catch (error) {
        return null;
    }
};

export const getUser = async () => {

    try {
        const db = await DB();
        const transaction = db.transaction(store_name, "readonly");
        const store = transaction.objectStore(store_name);
        const request = store.get(id);

        return new Promise((resolve, reject) => {
            request.onsuccess = () => {
                if (request.result) {
                    resolve(decryptData(request.result.data));
                } else {
                    resolve(null);
                }
            };
            request.onerror = () => reject("Failed to retrieve user");
        });
    } catch (error) {
        return null;
    }
};


   
export const removeUser = async () => {
    
    try {
        const db = await DB();
        const transaction = db.transaction(store_name, "readwrite");
        const store = transaction.objectStore(store_name);
        const request = store.delete(id);

        return new Promise((resolve, reject) => {
            request.onsuccess = () => resolve("User removed successfully");
            request.onerror = () => reject("Failed to remove user");
        });
    } catch (error) {
        return null;
    }
};