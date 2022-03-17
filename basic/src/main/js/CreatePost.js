import React from "react";
import { Form, Header, Button, Input} from "./components/styles/Form.styled"

const ReactDOM = require('react-dom');

class CreatePost extends React.Component {

	constructor(props) {
		super(props);
		this.state = {title: '', text: '', price: '', location: '', eventType: ''}
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChangeTitle = this.handleChangeTitle.bind(this);
		this.handleChangeText = this.handleChangeText.bind(this);
		this.handleChangePrice = this.handleChangePrice.bind(this);
		this.handleChangeLocation = this.handleChangeLocation.bind(this);
		this.handleChangeEventType = this.handleChangeEventType.bind(this);
	}

	handleChangeEventType(event) {
		let {value} = event.target;
		this.setState({eventType: value});
	}

	handleChangeLocation(event) {
		let {value} = event.target;
		this.setState({location: value});
	}

	handleChangePrice(event) {
		let {value} = event.target;
		this.setState({price: value});
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
		const newPost = {title: this.state.title, text: this.state.text, price: this.state.price, location: this.state.location, eventType: this.state.eventType, user: this.props.currentUser};
		this.props.onCreate(newPost);

		// clear out the dialog's inputs
		this.state.title = '';
		this.state.text = '';
		this.state.price = '';
		this.state.location = '';
		this.state.eventType = '';
	}

	render() {
		return (
			<div className='container'>

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
					<label>
						<Input type="number" value={this.state.price} placeholder="Price"
							onChange={event => this.handleChangePrice(event)}/>
					</label>
					<br></br>
					<label>
						<Input type="text" value={this.state.location} placeholder="Location"
							onChange={event => this.handleChangeLocation(event)}/>
					</label>
					<br></br>
					Select type <select value={this.state.eventType} onChange={event => this.handleChangeEventType(event)}>
						<option value="Kino">Kino</option>
						<option value="Konsert">Konsert</option>
						<option value="Festival">Festval</option>
						<option value="Annet">Annet</option>
					</select>
					<br></br>
					<Button onClick={this.handleSubmit}>Create</Button>
				</Form>
			</div>
		)
	}

}

export {CreatePost}