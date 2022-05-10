import Instance from "../instance";
import Client from "..";

export default class File {
    path: string;
    client: Client;
    instance: Instance;
    constructor(path: string, client: Client, instance: Instance) {
        this.path = path;
        this.client = client;
        this.instance = instance;
    }

    get data(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.client.request.get(`/1.0/instances/${this.instance.name}/files?path=${this.path}`).then(({data}) => resolve(data)).catch((err) => reject(err.response));
        })
    }
    delete(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.client.request.delete(`/1.0/instances/${this.instance.name}/files?path=${this.path}`).then(({data}) => resolve(data)).catch((err) => reject(err.response));
        })
    }
    create(data: string): Promise<any> {
        return new Promise((resolve, reject) => {
            this.client.request.post(`/1.0/instances/${this.instance.name}/files?path=${this.path}`, data, {
                headers: {
                    "Content-Type": "application/octet-stream"
                }
            }).then(({data}) => resolve(data)).catch((err) => reject(err.response));
        })
    }
    edit(data: string): Promise<any> {
        return new Promise((resolve, reject) => {
            this.client.request.post(`/1.0/instances/${this.instance.name}/files?path=${this.path}`, data, {
                headers: {
                    "Content-Type": "application/octet-stream"
                }
            }).then(({data}) => resolve(data)).catch((err) => reject(err.response));
        })
    }
}