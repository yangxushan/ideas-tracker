import { Client, Databases, Account } from "appwrite";

const client = new Client();
client
  .setEndpoint("https://sgp.cloud.appwrite.io/v1")
  .setProject("69ba64a800219a71364c"); // Replace with your project ID

export const account = new Account(client);
export const databases = new Databases(client);
