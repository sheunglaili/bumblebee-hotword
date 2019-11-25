import React, {Component} from 'react';

import BumbleBee from 'bumblebee-hotword';

const bumblebee = new BumbleBee({
	hotword: 'bumblebee', // allow only bumblebee
	sensitivity: 0.1
});

class BumbleBeeBasicApp extends Component {
	constructor() {
		super();
		
		this.state = {
			words: [],
			started: false
		};
		
		const sound = new Audio('sounds/bumblebee.mp3');
		
		bumblebee.on('hotword', (hotword) => {
			
			sound.play();
			
			const {words} = this.state;
			words.push(hotword);
			this.setState({words});
		});
	}
	
	start() {
		this.setState({
			started: true
		});
		bumblebee.start();
	}
	
	render() {
		return (
			<div className="App">
				
				<button onClick={e => { this.start() }}>Start</button>
				
				{ this.renderStarted() }
			
			</div>
		);
	}
	
	renderStarted() {
		if (this.state.started) return (<div>
			<h3>Say "bumblebee":</h3>
			
			<ul>
				{this.state.words.map((word, i) => {
					return (<li key={i}>{word}</li>);
				})}
			</ul>
		</div>);
	}
}

export default BumbleBeeBasicApp;