import Client from ".";
import Volume from "./storage-pool/volume";

export default class StoragePool {
    name: string;
    client: Client
    constructor(name: string, client: Client) {
        this.name = name;
        this.client = client;
    }
    get data(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.client.request.get(`/1.0/storage-pools/${this.name}`).then(({ data }) => resolve(data)).catch((err) => reject(err.response));
        })
    }
    get expandedData(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.client.request.get(`/1.0/storage-pools/${this.name}?recursion=1`).then(({ data }) => resolve(data)).catch((err) => reject(err.response));
        })
    }
    get volumes(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.client.request.get(`/1.0/storage-pools/${this.name}/volumes?recursion=1`).then(({ data }) => resolve(data)).catch((err) => reject(err.response));
        })
    }
    createVolume(name: string, data?: Object): Promise<any> {
        return new Promise((resolve, reject) => {
            this.client.request.post(`/1.0/storage-pools/${this.name}/volumes`, {
                name: name,
                ...data
            }).then(({ data }) => resolve(data)).catch((err) => reject(err.response));
        })
    }
    volume(name: string) {
        return new Volume(name, this, this.client);
    }
}