import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = createClient({
    projectId: 'mi6o3w4q',
    dataset: 'production',
    useCdn: false, // Set to false to always get the freshest data immediately
    apiVersion: '2024-03-03', // use current date
});

// Configure the builder for images
const builder = imageUrlBuilder(client);

export const urlFor = (source) => {
    return builder.image(source);
};
