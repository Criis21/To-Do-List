import React from "react";

const FormList = () => {
	const [todos, setTodos] = React.useState([]);
	const [todo, setTodo] = React.useState("");
	const [todoEditing, setTodoEditing] = React.useState(null);
	const [editingText, setEditingText] = React.useState("");

	React.useEffect(() => {
		//The getItem () method of the Storage interface returns the value of the key whose name is passed to it by parameter
		const json = localStorage.getItem("todos");
		const loadedTodos = JSON.parse(json);
		if (loadedTodos) {
			setTodos(loadedTodos);
		}
	}, []);

	React.useEffect(() => {
		//stringify () converts a JavaScript object or value to a JSON text string, optionally replaces values
		//if a replacement function is specified, or properties are specified using a replacement array
		const json = JSON.stringify(todos);
		localStorage.setItem("todos", json);
	}, [todos]);

	function handleSubmit(e) {
		e.preventDefault();

		const newTodo = {
			id: new Date().getTime(),
			text: todo,
			completed: false,
		};
		setTodos([...todos].concat(newTodo));
		setTodo("");
	}

	function deleteTodo(id) {
		let updatedTodos = [...todos].filter((todo) => todo.id !== id);
		setTodos(updatedTodos);
	}

	function toggleComplete(id) {
		let updatedTodos = [...todos].map((todo) => {
			if (todo.id === id) {
				todo.completed = !todo.completed;
			}
			return todo;
		});
		setTodos(updatedTodos);
	}

	function submitEdits(id) {
		const updatedTodos = [...todos].map((todo) => {
			if (todo.id === id) {
				todo.text = editingText;
			}
			return todo;
		});
		setTodos(updatedTodos);
		setTodoEditing(null);
	}

	return (
		<div id="TodoList">
			<h1>Todo List for 4Geeks Academy</h1>
			<form onSubmit={handleSubmit}>
				<input
					type="text"
					onChange={(e) => setTodo(e.target.value)}
					value={todo}
				/>
				<button type="submit">Add Todo</button>
			</form>
			{todos.map((todo) => (
				<div key={todo.id} className="Todo">
					<div className="TodoText">
						{todo.id === todoEditing ? (
							<input
								type="text"
								onChange={(e) => setEditingText(e.target.value)}
							/>
						) : (
							<div>{todo.text}</div>
						)}
					</div>
					<div className="TodoActions">
						<button onClick={() => deleteTodo(todo.id)}>
							Delete
						</button>
					</div>
				</div>
			))}
		</div>
	);
};

export default FormList;
