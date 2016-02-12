//App component - represents the whole App
App = React.createClass({

	//This mixin makes the getMeteorData method work
	mixins: [ReactMeteorData],

	//Loads items from the Tasks collection and puts them on this.data.tasks
	getMeteorData() {
		return {
			tasks: Tasks.find({}, {sort: {createdAt: -1}}).fetch()
		}
	},

	renderTasks() {
		//Get tasks from this.data.tasks
		return this.data.tasks.map((task) => {
			return <Task key={task._id} task={task} />;
		});
	},

	handleSubmit(event) {
		event.preventDefault();

		//Find the text field via the React ref
		var text = React.findDOMNode(this.refs.textInput).value.trim();

		Tasks.insert({
			text: text,
			createdAt: new Date() //current time
		});
		
		//Clear form
		React.findDOMNode(this.refs.textInput).value = "";
	},

	render() {
		return (
		<div className="container">
			<header>
				<h1>Stuff to do</h1>

			{/*Checkbox to filter incomplete tasks*/}
				<label className="hide-completed">
					<input
						type="checkbox"
						readOnly={true}
						checked={this.state.hideCompleted}
						onClick={this.toggleHideCompleted} />
					Hide Completed Tasks
				</label>

				{/*Form for new tasks*/}
				<form className="new-task" onSubmit={this.handleSubmit} >
					<input
						type="text"
						ref="textInput"
						placeholder="Type to add new tasks" />
				</form>
			</header>

			<ul>
				{this.renderTasks()}
			</ul>
		</div>
		);
	}
});
