import Client from ".";
import Forward from "./network/forward";

export default class Network {
    name: string;
    client: Client;
    constructor(name: string, client: Client) {
        this.name = name;
        this.client = client;
    }
    get data(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.client.request.get(`/1.0/networks/${this.name}`).then(({ data }) => resolve(data)).catch((err) => reject(err.response));
        })
    }
    get state(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.client.request.get(`/1.0/networks/${this.name}/state`).then(({ data }) => resolve(data)).catch((err) => reject(err.response));
        })
    }
    get forwards(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.client.request.get(`/1.0/networks/${this.name}/forwards?recursion=1`).then(({ data }) => resolve(data)).catch((err) => reject(err.response));
        })
    }
    get leases(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.client.request.get(`/1.0/networks/${this.name}/leases`).then(({ data }) => resolve(data)).catch((err) => reject(err.response));
        })
    }
    partialUpdate(data: Object): Promise<any> {
        return new Promise((resolve, reject) => {
            this.client.request.patch(`/1.0/networks/${this.name}`, data).then(({ data }) => resolve(data)).catch((err) => reject(err.response));
        })
    }
    createForward(description: String, listen_address: String, ports: Array<Object>, data?: Object): Promise<any> {
        return new Promise((resolve, reject) => {
            this.client.request.post(`/1.0/networks/${this.name}/forwards`, {
                description: description,
                listen_address: listen_address,
                ports: ports,
                ...data
            }).then(({ data }) => resolve(data)).catch((err) => reject(err.response));
        })
    }
    forward(listen_address: string) {
        return new Forward(listen_address, this, this.client);
    }
    delete() {
        return new Promise((resolve, reject) => {
            this.client.request.delete(`/1.0/networks/${this.name}`).then(({ data }) => resolve(data)).catch((err) => reject(err.response));
        })
    }
}