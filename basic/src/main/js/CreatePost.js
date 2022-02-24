import React from "react";
import { Form, Header, Button, Input} from "./components/styles/Form.styled"

const ReactDOM = require('react-dom');

class CreatePost extends React.Component {

	constructor(props) {
		super(props);
		this.state = {title: '', text: ''}
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChangeTitle = this.handleChangeTitle.bind(this);
		this.handleChangeText = this.handleChangeText.bind(this);
	}

	handleChangeTitle(event){
		let {value} = event.target;
		this.setState({title: value});
	}

	handleChangeText(event) {
		let {value} = event.target;
		this.setState({text: value});
	}

	handleSubmit(e) {
		e.preventDefault();
		const newPost = {title: this.state.title, text: this.state.text, user: this.props.currentUser};
		this.props.onCreate(newPost);

		// clear out the dialog's inputs
		this.state.title = '';
		this.state.text = '';
	}

	render() {
		return (
			<div>

				<Header>Create new post</Header>

				<Form onSubmit={this.handleSubmit}>
					<label>
						<Input type="text" value={this.state.title} placeholder="Title"
							onChange={event => this.handleChangeTitle(event)}/>
					</label>
					<br></br>
					<label>
						<Input type="text" value={this.state.text} placeholder="Text"
							onChange={event => this.handleChangeText(event)}/>
					</label>
					<br></br>
					<Button onClick={this.handleSubmit}>Create</Button>
				</Form>
			</div>
		)
	}

}

export {CreatePost}