import { Todo } from "./../entities/Todo";
import { IResponse } from "./Response";

export interface ITodoResponse extends IResponse {
    data?: Todo | Todo[];
}
