/**
 * Interface representing a user.
 */
interface User {
    /**
     * The unique identifier of the user.
     * @type {number}
     */
    userId: number;

    /**
     * The name of the user.
     * @type {string}
     */
    userName: string;
}

/**
 * Interface representing the current user.
 */
interface CurrentUser {
    /**
     * The unique identifier of the current user.
     * @type {number}
     */
    id: number;

    /**
     * The username of the current user.
     * @type {string}
     */
    username: string;

    /**
     * The profile image URL of the current user.
     * @type {string}
     */
    profileImage: string;
}

export type { User, CurrentUser };