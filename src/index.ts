import { WebSocket } from "ws";
import RequestClient from "./lib/RequestClient";
import { ClientOptions } from "./types";
import Instance from "./instance";
import Operation from "./operation";
import StoragePool from "./storage-pool";
import Network from "./network";

export default class Client {
    request: RequestClient;
    constructor(url: string, options: ClientOptions) {
        const parsed_url = new URL(url)
        if (parsed_url.protocol == "http:" || parsed_url.protocol == "https:") {
            if (!options.certificate) throw new Error('Certificate not specified');
            if (!options.key) throw new Error('Key not specified');
            this.request = new RequestClient(url, {
                certificate: options.certificate,
                key: options.key
            })
        } else if (parsed_url.protocol == "unix:") {
            this.request = new RequestClient(url)
        } else {
            throw new Error('Invalid client type');
        }

    }
    events(type?: string): WebSocket {
        if (type) {
            return this.request.websocket('/1.0/events?type=' + type)
        } else {
            return this.request.websocket('/1.0/events')
        }
    }

    createInstance(name: string, type: "virtual-machine" | "container", config: Object): Promise<any> {
        return new Promise((resolve, reject) => {
            const data = {
                name: name,
                type: type,
                ...config
            }
            this.request.post('/1.0/instances', data, {
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(({ data }) => resolve(data)).catch(err => reject(err.response));
        })

    }
    storagePools(expanded?: boolean) {
        return new Promise((resolve, reject) => {
            this.request.get(`/1.0/storage-pools${expanded ? "?recursion=1" : ""}`).then(({ data }) => resolve(data)).catch(err => reject(err.response));
        })
    }
    networks(recur?: boolean) {
        return new Promise((resolve, reject) => {
            this.request.get(`/1.0/networks${recur ? "?recursion=1" : ""}`).then(({ data }) => resolve(data)).catch(err => reject(err.response));
        })
    }
    network(name: string) {
        return new Network(name, this);
    }
    storagePool(name: string) {
        return new StoragePool(name, this);
    }
    instance(name: string) {
        return new Instance(name, this);
    }
    operation(id: string) {
        return new Operation(id, this);
    }
}