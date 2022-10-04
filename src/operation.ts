import client from "./index";

export default class Operation {
    id: string;
    client: client;
    constructor(id: string, client: client) {
        this.id = id;
        this.client = client;
    }

    get data(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.client.request.get(`/1.0/operations/${this.id}`).then(({ data }) => resolve(data)).catch((err) => reject(err.response));
        })
    }
    get websocket(): Promise<any> {
        return new Promise(async (resolve, reject) => {
            let operationData = await this.data;
            let ws = this.client.request.websocket(operationData.metadata.fds["0"]);
            resolve(ws);

        })
    }
}