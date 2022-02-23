import React from "react";
import { Form, Header, Button, Input} from "./components/styles/Form.styled"

const ReactDOM = require('react-dom');

class CreatePost extends React.Component {

	constructor(props) {
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(e) {
		e.preventDefault();
		const newPost = {};
		this.props.attributes.forEach(attribute => {
			newPost[attribute] = ReactDOM.findDOMNode(this.refs[attribute]).value.trim();
		});
		this.props.onCreate(newPost);

		// clear out the dialog's inputs
		this.props.attributes.forEach(attribute => {
			ReactDOM.findDOMNode(this.refs[attribute]).value = '';
		});

		// Navigate away from the dialog to hide it.
		window.location = "#";
	}

	render() {
		const inputs = this.props.attributes.map(attribute =>
			<p key={attribute}>
				<Input type="text" placeholder={attribute} ref={attribute} className="field"/>
			</p>
		);

		return (
			<div>
				<a href="#createPost">Create</a>

				<div id="createPost" className="modalDialog">
					<div>
						<a href="#" title="Close" className="close">X</a>

						<Header>Create new post</Header>

						<Form>
							{inputs}
							<Button onClick={this.handleSubmit}>Create</Button>
						</Form>
					</div>
				</div>
			</div>
		)
	}

}

export {CreatePost}