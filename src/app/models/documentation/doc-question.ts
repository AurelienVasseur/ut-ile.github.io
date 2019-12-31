import { Badge } from '../badge';

export class DocQuestion {
    id: string;
    slug: string;
    name: string;
    answer: string;
    badges: Array<string | Badge>;
    contributors: string[];

    constructor() { }
}