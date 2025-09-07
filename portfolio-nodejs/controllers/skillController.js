const skillService = require("../services/skillService");

const getSkills = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const search = req.query.search || "";
        const result = await skillService.getAllSkills({ page, limit, search });
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getSkill = async (req, res) => {
    try {
        const skill = await skillService.getSkillById(req.params.id);
        if (!skill) return res.status(404).json({ message: "Skill not found" });
        res.json(skill);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const createSkill = async (req, res) => {
    try {
        const newSkill = await skillService.createSkill(req.body);
        res.status(201).json(newSkill);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

const updateSkill = async (req, res) => {
    try {
        const updatedSkill = await skillService.updateSkill(req.params.id, req.body);
        if (!updatedSkill) return res.status(404).json({ message: "Skill not found" });
        res.json(updatedSkill);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

const deleteSkill = async (req, res) => {
    try {
        const deletedSkill = await skillService.deleteSkill(req.params.id);
        if (!deletedSkill) return res.status(404).json({ message: "Skill not found" });
        res.json({ message: "Skill deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    getSkills,
    getSkill,
    createSkill,
    updateSkill,
    deleteSkill,
};
