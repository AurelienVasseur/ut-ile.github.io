import * as firebase from 'firebase/app';
import 'firebase/firestore';

export class User extends Object {
    id: string;
    page_id: number;
    first_name: string;
    last_name: string;
    sur_name: string;
    avatar: string;
    email: string;
    created_on: firebase.firestore.Timestamp;
    last_connexion: firebase.firestore.Timestamp;
    is_validated: boolean;
    is_disabled: boolean;
    gender: string;
    roles: string[];
    formation: string;

    constructor(id: string, email: string) {
        super();
        this.id = id;
        this.page_id = null;
        this.email = email;
        this.created_on = firebase.firestore.Timestamp.now();
        this.last_connexion = firebase.firestore.Timestamp.now();
        
        this.first_name = "";
        this.last_name = "";
        this.sur_name = "";
        this.avatar = "";
        this.is_validated = false;
        this.is_disabled = false;
        this.gender = "";
        this.roles = [];
        this.formation = "";
    }

}