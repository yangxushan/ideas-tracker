import { createContext, useContext, useEffect, useState } from "react";
import { databases } from "../appwrite";
import { ID, Query } from "appwrite";

export const IDEAS_DATABASE_ID = "ideas-tracker"; // Replace with your database ID
export const IDEAS_COLLECTION_ID = "ideas_tracker"; // Replace with your table ID

const IdeasContext = createContext();

export function useIdeas() {
  return useContext(IdeasContext);
}

export function IdeasProvider(props) {
  const [ideas, setIdeas] = useState([]);

  async function add(idea) {
    try {
      const response = await databases.createDocument({
        databaseId: IDEAS_DATABASE_ID,
        collectionId: IDEAS_COLLECTION_ID,
        documentId: ID.unique(),
        data: idea
      });
      setIdeas((ideas) => [response, ...ideas].slice(0, 10));
    } catch (err) {
      console.log(err) // handle error or show user a message
    }
  }

  async function remove(id) {
    try {
      await databases.deleteDocument({
        databaseId: IDEAS_DATABASE_ID,
        collectionId: IDEAS_COLLECTION_ID,
        documentId: id
      });
      setIdeas((ideas) => ideas.filter((idea) => idea.$id !== id));
      await init();
    } catch (err) {
      console.log(err)
    }
  }

  async function init() {
    try {
      const response = await databases.listDocuments({
        databaseId: IDEAS_DATABASE_ID,
        collectionId: IDEAS_COLLECTION_ID,
        queries: [Query.orderDesc("$createdAt"), Query.limit(10)]
      });
      setIdeas(response.documents);
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    init();
  }, []);

  return (
    <IdeasContext.Provider value={{ current: ideas, add, remove }}>
      {props.children}
    </IdeasContext.Provider>
  );
}
