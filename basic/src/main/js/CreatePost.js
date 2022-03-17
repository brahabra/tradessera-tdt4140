import React from "react";
import { Form, Header, Button, Input} from "./components/styles/Form.styled"

const ReactDOM = require('react-dom');

class CreatePost extends React.Component {

	constructor(props) {
		super(props);
		this.state = {title: '', price: '', location: '', eventType: '', dateOfEvent: '', timeOfEvent: '', comment: ''}
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChangeTitle = this.handleChangeTitle.bind(this);
		this.handleChangePrice = this.handleChangePrice.bind(this);
		this.handleChangeLocation = this.handleChangeLocation.bind(this);
		this.handleChangeEventType = this.handleChangeEventType.bind(this);
		this.handleChangeDateOfEvent = this.handleChangeDateOfEvent.bind(this);
		this.handleChangeTimeOfEvent = this.handleChangeTimeOfEvent.bind(this);
		this.handleChangeComment = this.handleChangeComment.bind(this);
	}

	handleChangeTimeOfEvent(event) {
		let {value} = event.target;
		this.setState({timeOfEvent: value});
	}

	handleChangeDateOfEvent(event) {
		let {value} = event.target;
		this.setState({dateOfEvent: value});
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

	handleChangeComment(event) {
		let {value} = event.target;
		this.setState({comment: value});
	}

	handleSubmit(e) {
		e.preventDefault();
		const newPost = {title: this.state.title, price: this.state.price, 
		   location: this.state.location, eventType: this.state.eventType,
		   dateOfEvent: this.state.dateOfEvent, timeOfEvent: this.state.timeOfEvent,
		   comment: this.state.comment, user: this.props.currentUser};
		this.props.onCreate(newPost);

		// clear out the dialog's inputs
		this.state.title = '';
		this.state.price = '';
		this.state.location = '';
		this.state.eventType = '';
		this.state.dateOfEvent = '';
		this.state.timeOfEvent = '';
		this.state.comment = '';
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
						<Input type="text" value={this.state.price} placeholder="Price"
							onChange={event => this.handleChangePrice(event)}/>
					</label>
					<br></br>
					<label>
						<Input type="text" value={this.state.location} placeholder="Location"
							onChange={event => this.handleChangeLocation(event)}/>
					</label>
					<br></br>
					<label>
						<Input type="text" value={this.state.eventType} placeholder="Type of Event"
							onChange={event => this.handleChangeEventType(event)}/>
					</label>
					<br></br>
					<label>
						<Input type="date" value={this.state.dateOfEvent} placeholder="Date of Event"
							onChange={event => this.handleChangeDateOfEvent(event)}/>
					</label>
					<br></br>
					<label>
						<Input type="time" value={this.state.timeOfEvent} placeholder="Time of Event"
							onChange={event => this.handleChangeTimeOfEvent(event)}/>
					</label>
					<br></br>
					<label>
						<Input type="text" value={this.state.comment} placeholder="Comment"
							onChange={event => this.handleChangeComment(event)}/>
					</label>
					<br></br>
					<Button onClick={this.handleSubmit}>Create</Button>
				</Form>
			</div>
		)
	}

}

export {CreatePost}