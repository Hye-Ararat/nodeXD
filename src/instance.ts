import client from "./index";
import Snapshot from "./instance/snapshot";
import File from "./instance/file";

export default class Instance {
    name: string;
    client: client;
    constructor(name: string, client: client) {
        this.name = name;
        this.client = client;
    }
    get data(): Promise<any> {
       return new Promise((resolve, reject) => {
            this.client.request.get(`/1.0/instances/${this.name}`).then(({data}) => resolve(data)).catch((err) => reject(err.response.data));
       }) 
    }
    get snapshots(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.client.request.get(`/1.0/instances/${this.name}/snapshots?recursion=1`).then(({data}) => resolve(data)).catch((err) => reject(err.response.data));
        })
    }
    get state(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.client.request.get(`/1.0/instances/${this.name}/state`).then(({data}) => resolve(data)).catch((err) => reject(err.response.data));
        }
        )
    }

    partialUpdate(data: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this.client.request.patch(`/1.0/instances/${this.name}`, data).then(({data}) => resolve(data)).catch((err) => reject(err.response.data));
        }
        )
    }
    snapshot(name: string) {
        return new Snapshot(name, this.client, this);
    }
    file(path: string) {
        return new File(path, this.client, this);
    }



    updateState(state: string, force?: boolean, stateful?: boolean, timeout?: number): Promise<any> {
        return new Promise((resolve, reject) => {
            this.client.request.put(`/1.0/instances/${this.name}/state`, {
                action: state,
                force: force,
                stateful: stateful,
                timeout: timeout ? timeout : 30
            }).then(({data}) => resolve(data)).catch((err) => reject(err.response.data));
        })
    }

    console(type?: String): Promise<any> {
        return new Promise(async (resolve, reject) => {
            try {
                let res = await this.client.request.post(`/1.0/instances/${this.name}/console`, {
                    type
                })
                let ws1 = this.client.request.websocket(res.data.operation + `/websocket?secret=${res.data.metadata.metadata.fds["0"]}`);
                let ws2 = this.client.request.websocket(res.data.operation + `/websocket?secret=${res.data.metadata.metadata.fds["control"]}`);
                resolve({
                    stdout: ws1,
                    stdin: ws2
                })
            } catch (error) {
                reject(error);
            }
        })
    }
    consoleLog(): Promise<any> {
        return new Promise((resolve, reject) => {
                this.client.request.get(`/1.0/instances/${this.name}/console`).then(({data}) => resolve(data)).catch((err) => reject(err.response.data));

        })
    }

    createSnapshot(name: string, expires_at?: boolean, stateful?: boolean) {
        return new Promise((resolve, reject) => {
            this.client.request.post(`/1.0/instances/${this.name}/snapshots`, {
                expires_at,
                name,
                stateful
            }).then(({data}) => resolve(data)).catch((err) => reject(err.response.data));})
    }
}