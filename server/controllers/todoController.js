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
      User: req.user._id,
    });

    await todos.save();
    res.status(201).json({ message: "Todo created successfully", todos });
  } catch (error) {
    res.status(500).json({ message: "could not create note" });
  }
}

export async function getTodo(req, res) {
  try {
   // const query = req.query.title;
   // const isPinnedQueryParam = req.query.isPinned; // Store the raw query parameter
    const userId = req.user._id; // Optional: to filter/search within a specific user's todos
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 3;
    const totalTodos = await todoModel.countDocuments({User:userId});
    const totalPages = Math.ceil(totalTodos / limit);
    const todos=await todoModel.find({User:userId}).sort({isPinned:-1}).skip((page - 1) * limit).limit(limit);
    res.status(200).json({ todos,totalPages,currentPage:Number(page)})

    // Filter by user
    // const filters = { User: userId };

    // // Search by title
    // if (query) {
    //   filters.$or = [{ title: { $regex: query, $options: "i" } }];
    // }

    // // Only add the isPinned filter if the query parameter is provided
    // if (isPinnedQueryParam !== undefined) {
    //   const isPinned = isPinnedQueryParam === "true"; // Convert to boolean
    //   filters.isPinned = isPinned;
    // }

    // const totalTodos = await todoModel.countDocuments(filters);
    // const totalPages = Math.ceil(totalTodos / limit);
    // const todos = await todoModel
    //   .find(filters)
    //   .skip((page - 1) * limit)
    //   .limit(limit);

    // res.status(200).json({ todos, totalTodos, totalPages });
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

    if (todo.User.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "You are not authorized to update this todo" });
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

    res.status(200).json({ updatedTodo, message: "Todo updated successfully" });
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

    if (todo.User.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "You do not have permission to delete this todo" });
    }

    await todoModel.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Todo deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete todo" });
  }
}

export async function searchTodo(req, res) {
  const { query } = req.query;
  const userId = req.user._id; 
  if(!query){
    return res.status(400).json({message:"Search is required"})
  }
try {
  const todos = await todoModel.find({
    User:userId,
    $or:[
      {title:{ $regex: new RegExp(query,"i")}},
      { content: { $regex: new RegExp(query,"i")}},
    ]

  }).limit(5);

  res.status(200).json({todos });
  

  // const filters = { User: userId };

  // // Filter by title if provided and is a non-empty string
  // if (typeof title === "string" && title.trim() !== "") {
  //   filters.$or = [{ title: { $regex: title, $options: "i" } }];
  // }

  // // Filter by content if provided and is a non-empty string
  // if (typeof content === "string" && content.trim() !== "") {
  //   filters.$or = filters.$or || [];
  //   filters.$or.push({ content: { $regex: content, $options: "i" } });
  // }

  // // Fetch todos
  // const todos = await todoModel.find(filters);

  // res.status(200).json({ todos });
} catch (error) {
  console.error("Error fetching todos:", error);
  res.status(500).json({ message: "Failed to fetch todos" });
}
  

}
