import { Badge } from './badge';

export class Category {
    id: string;
    slug: string;
    name: string;
    description: string;
    image_path: string;
    badges: Array<string | Badge>;
}