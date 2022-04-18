import Client from ".";

export default class StoragePool {
    name: string;
    client: Client
    constructor(name: string, client: Client) {
        this.name = name;
        this.client = client;
    }
    get data(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.client.request.get(`/1.0/storage-pools/${this.name}`).then(({data}) => resolve(data)).catch((err) => reject(err.response.data));
        })
    }
}