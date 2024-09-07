interface User {
    userId: number;
    userName: string;
}

interface CurrentUser {
    id: number;
    username: string;
    profileImage: string;
}

export type { User, CurrentUser };
