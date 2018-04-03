import { StatusCode } from "../enums";

export interface ResponseData {
    data: any;
    successMessage?: string;
    errorMessage?: string[];
    statusCode: StatusCode;
}