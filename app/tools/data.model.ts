export interface Comment {
    id: number;
    username: string;
    comment: string;

}

export interface Comments {
    comments: Comment[];
}

export interface Corn {
    id: number;
    type: string;
}

export interface Corns {
    corn: Corn[];
}