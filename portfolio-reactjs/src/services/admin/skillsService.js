import { axiosInstance } from '../../utils/api';

export const fetchSkills = async ({ page = 1, limit = 10, search = '' }) => {
    const response = await axiosInstance.get('/skills', {
        params: { page, limit, search },
    });
    return response.data;
};

export const createSkill = async (skillData) => {
    const response = await axiosInstance.post('/skills', skillData);
    return response.data;
};

export const getSkillById = async (id) => {
    const response = await axiosInstance.get(`/skills/${id}`);
    return response.data;
};

export const updateSkill = async (id, skillData) => {
    const response = await axiosInstance.put(`/skills/${id}`, skillData);
    return response.data;
};

export const deleteSkill = async (id) => {
    const response = await axiosInstance.delete(`/skills/${id}`);
    return response.data;
};
