import Client from "..";
import StoragePool from "../storage-pool";

export default class Volume {
    client: Client;
    storagePool: StoragePool;
    name: string;
    constructor(name: string, storagePool: StoragePool, client: Client) {
        this.name = name;
        this.storagePool = storagePool;
        this.client = client;
    }
    partialUpdate(data: Object): Promise<any> {
        return new Promise((resolve, reject) => {
            this.client.request.patch(`/1.0/storage-pools/${this.storagePool.name}/volumes/${this.name}`, data).then(({data}) => resolve(data)).catch((err) => reject(err.response));
        })
    }

}