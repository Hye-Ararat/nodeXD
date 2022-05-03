import Client from "..";
import Network from "../network";

export default class Forward {
    network: Network;
    client: Client;
    listen_address: string;
    constructor(listen_address: string, network: Network, client: Client) {
        this.listen_address = listen_address;
        this.network = network;
        this.client = client;
    }
    get data(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.client.request.get(`/1.0/networks/${this.network.name}/forwards?recursion=1`).then(({data}) => resolve(data)).catch((err) => reject(err.response.data));
        })
    }
    delete(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.client.request.delete(`/1.0/networks/${this.network.name}/forwards/${this.listen_address}`).then(({data}) => resolve(data)).catch((err) => reject(err.response.data));
        })
    }
    partialUpdate(data: Object): Promise<any> {
        return new Promise((resolve, reject) => {
            this.client.request.patch(`/1.0/networks/${this.network.name}/forwards/${this.listen_address}`, data).then(({data}) => resolve(data)).catch((err) => reject(err.response.data));
        })
    }

}