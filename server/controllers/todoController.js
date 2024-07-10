import { todoModel } from "../models/todo.js";

export async function createTodo(req, res) {
  try {
    const { title, content, tags } = req.body;
    if (!title || !content) {
      return res.status(400).json({ message: "title or content required" });
    }
    const todos = await todoModel({
      title: title,
      content: content,
      tags: tags,
    
    });

    await todos.save();
    res.status(201).json({ message: "Todo created successfully", todos });
  } catch (error) {
    res.status(500).json({ message: "could not create note" });
  }
}

export async function getTodo(req, res) {
  try {
  
    const todos=await todoModel.find().sort({isPinned:-1});
    res.status(200).json({ todos})

   
  } catch (error) {
    console.error("Error fetching todos:", error);
    res.status(500).json({ message: "Failed to fetch todos" });
  }
}

export const editTodo = async (req, res) => {
  try {
    const todo = await todoModel.findById(req.params.id);

    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

   

    const updatedTodo = await todoModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json({ message: "Todo updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to update todo" });
  }
};
export async function updatePin(req, res) {
  try {
    const updatedTodo = await todoModel.findByIdAndUpdate(
      req.params.id,
      {
        isPinned: req.body.isPinned,
      },
      { new: true }
    );

    if (!updatedTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.status(200).json({ updatedTodo, message: "Todo pin updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to update todo" });
  }
}

export async function deleteTodo(req, res) {
  try {
    const todo = await todoModel.findById(req.params.id);

    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }
    await todoModel.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Todo deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete todo" });
  }
}

