import axios, { AxiosRequestConfig, AxiosResponse } from "axios"
import { Agent } from "https";
import { RequestClientOptions } from "../types/lib/RequestClient";
import { WebSocket } from "ws"

export default class RequestClient {
    axiosOptions: AxiosRequestConfig;
    private type: string;
    private wsURL: string;
    private wsOptions: {
        rejectUnauthorized?: boolean,
        cert?: Buffer,
        key?: Buffer
      };
    constructor(url: string, options?: RequestClientOptions) {
        const parsed_url = new URL(url)
        if (parsed_url.protocol == "http:" || parsed_url.protocol == "https:") {
            if (!options.certificate) throw new Error('Certificate not specified');
            if (!options.key) throw new Error('Key not specified');
            this.type = "http"
            this.wsURL = "wss://" + parsed_url.host
            this.wsOptions = {
                rejectUnauthorized: false,
                cert: options.certificate,
                key: options.key
            }
            this.axiosOptions = {
                httpsAgent: new Agent({
                    rejectUnauthorized: false,
                    key: options.key,
                    cert: options.certificate
                }),
                baseURL: url
            }
        } else if (parsed_url.protocol == "unix:") {
            this.type = "unix"
            this.wsURL = "ws+unix://" + parsed_url.pathname + ":"
            this.axiosOptions = {}
            this.axiosOptions.socketPath = parsed_url.pathname
        } else {
            throw new Error('Invalid client type');
        }
    }
    get(url: string, overrides?: AxiosRequestConfig): Promise<AxiosResponse<any, any>> {
        return new Promise((resolve, reject) => {
            axios.get(url, { ...this.axiosOptions, ...overrides }).then(data => {
                resolve(data)
            }).catch(error => {
                reject(error)
            })
        })

    }
    post(url: string, body: any, overrides?: AxiosRequestConfig): Promise<AxiosResponse<any, any>> {
        return new Promise((resolve, reject) => {
            axios.post(url, body, { ...this.axiosOptions, ...overrides }).then(data => {
                resolve(data)
            }).catch(error => {
                reject(error)
            })
        })

    }
    delete(url: string, overrides?: AxiosRequestConfig): Promise<AxiosResponse<any, any>> {
        return new Promise((resolve, reject) => {
            axios.delete(url, { ...this.axiosOptions, ...overrides }).then(data => {
                resolve(data)
            }).catch(error => {
                reject(error)
            })
        })

    }
    put(url: string, body: any, overrides?: AxiosRequestConfig): Promise<AxiosResponse<any, any>> {
        return new Promise((resolve, reject) => {
            axios.put(url, body, { ...this.axiosOptions, ...overrides }).then(data => {
                resolve(data)
            }).catch(error => {
                reject(error)
            })
        })

    }
    patch(url: string, body: any, overrides?: AxiosRequestConfig): Promise<AxiosResponse<any, any>> {
        return new Promise((resolve, reject) => {
            axios.patch(url, body, { ...this.axiosOptions, ...overrides }).then(data => {
                resolve(data)
            }).catch(error => {
                reject(error)
            })
        })

    }
    websocket(url: string) {
       if (this.type == "unix") {
        return new WebSocket(this.wsURL + url)
       } else if (this.type == "http") {
           return new WebSocket(this.wsURL + url, this.wsOptions)
       }
    }
}