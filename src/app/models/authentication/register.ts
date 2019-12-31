import { User } from '../user/user';

export class Register extends User {
    password: string;
    
    constructor() {
        super("", "");
    }
}