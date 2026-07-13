import api from '../../../services/api';

export async function uploadAvatar(file, apiClient = api) {
    if (!file) return null;

    const formData = new FormData();
    // Only append 'image' since backend uses upload.single('image')
    formData.append('image', file);

    try {
        const response = await apiClient.post('/users/me/avatar', formData, {
            headers: {
                // This forces Axios to let the browser generate the correct header + boundary
                'Content-Type': 'multipart/form-data',
            },
        });

        // Your response payload wraps the user object inside "data"
        return response?.data?.data?.avatar || response?.data?.avatar || null;
    } catch (error) {
        const message = error?.response?.data?.message || error?.message || 'Upload failed';
        throw new Error(message);
    }
}