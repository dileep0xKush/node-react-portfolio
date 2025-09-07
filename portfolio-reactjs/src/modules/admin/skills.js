import {
    fetchSkills as fetchSkillsService,
    createSkill,
    getSkillById,
    updateSkill,
    deleteSkill
} from '../../services/admin/skillsService';

export const fetchSkills = async ({ page = 1, limit = 10, search = '' } = {}) => {
    try {
        const data = await fetchSkillsService({ page, limit, search });
        return data;
    } catch (error) {
        console.error('Error fetching skills:', error);
        throw error;
    }
};

export const createSkillHandler = async (skillData) => {
    try {
        const data = await createSkill(skillData);
        return data;
    } catch (error) {
        console.error('Error creating skill:', error);
        throw error;
    }
};

export const getSkillHandler = async (id) => {
    try {
        const data = await getSkillById(id);
        return data;
    } catch (error) {
        console.error('Error fetching skill:', error);
        throw error;
    }
};

export const updateSkillHandler = async (id, skillData) => {
    try {
        const data = await updateSkill(id, skillData);
        return data;
    } catch (error) {
        console.error('Error updating skill:', error);
        throw error;
    }
};

export const deleteSkillHandler = async (id) => {
    try {
        const data = await deleteSkill(id);
        return data;
    } catch (error) {
        console.error('Error deleting skill:', error);
        throw error;
    }
};
