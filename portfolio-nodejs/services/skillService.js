const Skill = require("../models/Skill");

const getAllSkills = async ({ page = 1, limit = 10, search = "" }) => {
    const pageNumber = Math.max(1, parseInt(page, 10) || 1);
    const pageSize = Math.max(1, parseInt(limit, 10) || 10);

    const query = {};

    if (search.trim()) {
        query.name = { $regex: search.trim(), $options: "i" };
    }

    const skip = (pageNumber - 1) * pageSize;
    const total = await Skill.countDocuments(query);

    const skills = await Skill.find(query)
        .skip(skip)
        .limit(pageSize)
        .sort({ created_date: -1 });

    return {
        skills,
        page: pageNumber,
        limit: pageSize,
        totalPages: Math.ceil(total / pageSize),
        totalResults: total,
    };
};

const getSkillById = async (id) => {
    return await Skill.findById(id);
};

const createSkill = async (skillData) => {
    const skill = new Skill(skillData);
    return await skill.save();
};

const updateSkill = async (id, skillData) => {
    return await Skill.findByIdAndUpdate(id, skillData, { new: true });
};

const deleteSkill = async (id) => {
    return await Skill.findByIdAndDelete(id);
};

module.exports = {
    getAllSkills,
    getSkillById,
    createSkill,
    updateSkill,
    deleteSkill,
};
