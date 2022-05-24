import { AxiosResponse } from 'axios';
import { HttpStatus, OrderDirection } from './constants';
import { Component } from 'vue';

export interface IBodyResponse<T> extends AxiosResponse {
    success: boolean;
    isRequestError?: boolean;
    code: HttpStatus;
    message: string;
    data: T;
    errors?: { key: string; message: string; errorCode: HttpStatus }[];
}

export interface ICommonGetListQuery {
    page?: number;
    limit?: number;
    keyword?: string;
    orderDirection?: OrderDirection;
}

export interface IGetListResponse<T> {
    items: T[];
    totalItems: number;
}

export interface IDropDownOption {
    value?: string | number;
    label?: string;
}

export interface IGetListResponse<T> {
    items: T[];
    totalItems: number;
}
export interface ISidebar {
    icon?: string;
    iconComponent?: Component;
    name?: string;
    to?: string;
    active?: boolean;
    children?: ISidebar[];
    pageName?: string;
}

export interface IBreadcrumb {
    index: number;
    text: string;
    link: string;
}
