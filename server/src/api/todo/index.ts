import express from "express";
const router = express.Router();

// Get a specific todo of current user
router.get("/:id", (req, res) => {
    res.json(req.params.id);
});

// Get all todos of current user
router.get("/all", (req, res) => {});

// Create a todo by current user
router.post("/", (req, res) => {});

// Update a todo of current user
router.put("/:id", (req, res) => {});

// Delete a todo of current user
router.delete("/:id", (req, res) => {});

// Get a specific todo of a user
router.get("/admin/:id", (req, res) => {
    res.json(req.params.id);
});

// Get all todos in database
router.get("/admin/all", (req, res) => {});

export default router;
