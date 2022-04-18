import Client from "..";
import Instance from "../instance";

export default class Snapshot {
    name: string;
    client: Client;
    instance: Instance;
    constructor(name: string, client: Client, instance: Instance) {
        this.name = name;
        this.client = client;
        this.instance = instance;
    }

    get data(): Promise<any> {
        return new Promise((resolve, reject) => {
             this.client.request.get(`/1.0/instances/${this.instance.name}/snapshots/${this.name}`).then(({data}) => resolve(data)).catch((err) => reject(err.response.data));
        }) 
     }
     delete(): Promise<any> {
         return new Promise((resolve, reject) => {
            this.client.request.delete(`/1.0/instances/${this.instance.name}/snapshots/${this.name}`).then(({data}) => resolve(data)).catch((err) => reject(err.response.data));
         })
     }
    }