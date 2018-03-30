import { StatusCode } from "../../common/enums";

/**
 * HttpResponseMessage class holds response data to send response
 */
export class HttpResponseMessage<T> {
    public statusCode: StatusCode;
    body: T;
    successMessage: string;
    errorMessages: string[];
    headers: Map<string, string> = new Map<string, string>();
}