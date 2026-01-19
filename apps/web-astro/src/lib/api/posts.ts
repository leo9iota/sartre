import { api } from './client';

// Function for fetching all posts - works on both server and client
export const getPosts = async () => {
    const { data, error } = await api.api.posts.get();
    if (error) throw error;
    return data;
};

// Function for fetching a single post by slug
export const getPost = async (slug: string) => {
    const { data, error } = await api.api.posts({ slug }).get();
    if (error) throw error;
    if ('error' in data) throw new Error(data.error);
    return data;
};
