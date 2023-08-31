import type { AxiosResponse } from 'axios'

export interface AxiosCustomResponse extends AxiosResponse {
    data: AxiosCustomResponseData
}

export interface AxiosCustomResponseData {
    status: number
}