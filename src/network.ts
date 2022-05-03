import Client from ".";

export default class Network {
    name: string;
    client: Client;
    constructor(name: string, client: Client) {
        this.name = name;
        this.client = client;
    }
    get data(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.client.request.get(`/1.0/networks/${this.name}`).then(({data}) => resolve(data)).catch((err) => reject(err.response.data));
        })
    }
    get forwards(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.client.request.get(`/1.0/networks/${this.name}/forwards?recursion=1`).then(({data}) => resolve(data)).catch((err) => reject(err.response.data));
        })
    }
    createForward(description: String, listen_address: String, ports: Array<Object>, data?: Object): Promise<any> {
        return new Promise((resolve, reject) => {
            this.client.request.post(`/1.0/networks/${this.name}/forwards`, {
                description: description,
                listen_address: listen_address,
                ports: ports,
                ...data
            }).then(({data}) => resolve(data)).catch((err) => reject(err.response.data));
        })
    }
}