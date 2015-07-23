import React from 'react';

class ClickMe extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			clickCount: 0
		};
	}

	onButtonClicked() {
		let clickCount = 1 + this.state.clickCount;
		this.setState({
			clickCount: clickCount
		});
	}

	render() {
		return (
			<div className="text-danger text-center">
				<div><h1 className="text-danger">{this.state.clickCount}</h1></div>
				<button className="btn btn-primary" onClick={()=>this.onButtonClicked()}>Click me!</button>
			</div>
		);
	}
}

export default ClickMe;
