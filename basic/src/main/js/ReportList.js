import React from 'react';

import { Link } from 'react-router-dom'
import {Button, TableHeadStyles} from "./components/styles/Form.styled"

class ReportList extends React.Component{
	render() {
		console.log(this.props.reports);
		const reports = this.props.reports.map(report =>
			<Report key={report._links.self.href} report={report} onDeleteReport={this.props.onDeleteReport}/>
		);
		return (
			<table>
				
				<TableHeadStyles>
					<tr>
						<th>Reporter</th>
						<th>Reported</th>
						<th></th>
					</tr>
				<tbody>
					{reports}
				</tbody>
				</TableHeadStyles>
			</table>
		)
	}
}

class Report extends React.Component{

	constructor(props) {
		super(props);
		this.handleDelete = this.handleDelete.bind(this);
	}

	handleDelete() {
		this.props.onDeleteReport(this.props.report);
	}

	render() {
		return (
			<tr>
				<td>{this.props.report.reporter}</td>
				<td>{this.props.report.reported}</td>
				<Button onClick={this.handleDelete}>Remove report</Button>
			</tr>
		)
	}
}


export {ReportList}