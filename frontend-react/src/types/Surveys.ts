interface Survey{
    id: number;
    title: string;
    participants: string[];
    creator: string;
    recipeVote: {[key: string]: number};
    options: string[];
    creationDate: Date;
}

export type {Survey};

